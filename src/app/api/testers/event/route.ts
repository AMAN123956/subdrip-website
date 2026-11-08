import { NextResponse } from "next/server";
import { EMAIL_RE } from "@/lib/beta";
import { getSql } from "@/lib/server/db";

export const runtime = "nodejs";

const STEPS = new Set(["join", "opt_in", "install", "demo"]);

/**
 * Funnel taps from the signup success screen (sent with navigator.sendBeacon), so the CMS can
 * show where people stop. Best-effort: always 204, never blocks the link the person tapped.
 * beta_events is owned by the backend (src/db/ensureBetaTables.js); an unknown email is ignored.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { email?: unknown; step?: unknown } | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const step = typeof body?.step === "string" ? body.step : "";
    const sql = getSql();
    if (sql && STEPS.has(step) && email.length <= 320 && EMAIL_RE.test(email)) {
      const platform = step === "demo" ? "ios" : "android";
      await sql`
        INSERT INTO beta_events (signup_id, event, source)
        SELECT id, ${step}, 'web' FROM beta_signups WHERE email = ${email} AND platform = ${platform}
      `;
    }
  } catch (err) {
    console.warn("beta event not recorded:", err instanceof Error ? err.message : err);
  }
  return new NextResponse(null, { status: 204 });
}
