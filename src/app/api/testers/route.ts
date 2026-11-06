import { createHash } from "node:crypto";
import { after, NextResponse } from "next/server";
import { EMAIL_RE, type Platform, type SignupStatus } from "@/lib/beta";
import { sendBetaEmail } from "@/lib/server/betaEmail";
import { ensureBetaTable } from "@/lib/server/betaSignups";
import { getSql } from "@/lib/server/db";
import { addToTesterGroup } from "@/lib/server/googleGroups";

export const runtime = "nodejs";
export const maxDuration = 30;

/** New signups allowed per network per window (repeat signups don't count). */
const RATE_LIMIT = 5;
const RATE_WINDOW_MINUTES = 10;

const clean = (v: unknown, max: number, fallback: string) =>
  typeof v === "string" && v.length > 0
    ? v.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, max) || fallback
    : fallback;

/**
 * Beta signup: save first (never lose a signup), then for Android add the
 * email to the Play tester Google Group, then (after the response) ask the
 * backend to send the welcome / waitlist email. Google or email failures
 * degrade to status "pending" + the retry cron, never an error.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const platform: Platform = body.platform === "ios" ? "ios" : "android";

  // Honeypot filled → a bot. Pretend it worked, do nothing.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true, status: platform === "ios" ? "waitlist" : "added" });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address does not look right." }, { status: 422 });
  }
  const channel = clean(body.channel, 40, "direct");
  const placement = clean(body.placement, 32, "unknown");

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ ok: false, error: "Signup storage is not configured." }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "").trim();
  const ipHash = ip
    ? createHash("sha256").update(`${ip}|${process.env.BETA_EMAIL_SECRET ?? "subdrip"}`).digest("hex").slice(0, 32)
    : null;

  try {
    await ensureBetaTable(sql);

    // One round trip: rate check + upsert. A repeat signup isn't a new row,
    // so it neither counts toward nor is blocked by the limit.
    const [row] = await sql<
      { inserted: boolean; group_status: string; email_sent_at: Date | null; limited: boolean }[]
    >`
      WITH recent AS (
        SELECT count(*)::int AS n FROM beta_signups
        WHERE ip_hash = ${ipHash} AND created_at > now() - make_interval(mins => ${RATE_WINDOW_MINUTES})
      ),
      existing AS (
        SELECT group_status, email_sent_at FROM beta_signups WHERE email = ${email} AND platform = ${platform}
      ),
      ins AS (
        INSERT INTO beta_signups (email, platform, channel, placement, ip_hash, group_status)
        SELECT ${email}, ${platform}, ${channel}, ${placement}, ${ipHash}, ${platform === "ios" ? "n/a" : "pending"}
        WHERE NOT EXISTS (SELECT 1 FROM existing) AND (SELECT n FROM recent) < ${RATE_LIMIT}
        ON CONFLICT (email, platform) DO NOTHING
        RETURNING group_status, email_sent_at
      )
      SELECT
        EXISTS (SELECT 1 FROM ins) AS inserted,
        COALESCE((SELECT group_status FROM ins), (SELECT group_status FROM existing), 'pending') AS group_status,
        COALESCE((SELECT email_sent_at FROM ins), (SELECT email_sent_at FROM existing)) AS email_sent_at,
        (NOT EXISTS (SELECT 1 FROM existing) AND NOT EXISTS (SELECT 1 FROM ins)) AS limited
    `;

    if (row.limited) {
      return NextResponse.json({ ok: false, error: "Too many signups from this network." }, { status: 429 });
    }

    let status: SignupStatus;
    if (platform === "ios") {
      status = "waitlist";
    } else if (row.group_status === "added" || row.group_status === "already") {
      status = "already";
    } else {
      const { result, error } = await addToTesterGroup(email);
      if (error) console.error(`tester group add pending (${channel}):`, error);
      await sql`
        UPDATE beta_signups SET group_status = ${result}, group_error = ${error ?? null}, updated_at = now()
        WHERE email = ${email} AND platform = ${platform}
      `;
      status = result;
    }

    if (!row.email_sent_at) {
      after(() => sendOnce(email, platform));
    }

    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("beta signup failed:", err);
    return NextResponse.json({ ok: false, error: "Could not save your signup right now." }, { status: 500 });
  }
}

/**
 * Claim-then-send so a double submit can't send two emails: the UPDATE only
 * wins once, and a failed send releases the claim for the retry cron.
 */
async function sendOnce(email: string, platform: Platform) {
  const sql = getSql();
  if (!sql) return;
  const claimed = await sql`
    UPDATE beta_signups SET email_sent_at = now(), updated_at = now()
    WHERE email = ${email} AND platform = ${platform} AND email_sent_at IS NULL
    RETURNING id
  `;
  if (!claimed.length) return;
  if (!(await sendBetaEmail(email, platform))) {
    await sql`UPDATE beta_signups SET email_sent_at = NULL WHERE id = ${claimed[0].id}`;
  }
}
