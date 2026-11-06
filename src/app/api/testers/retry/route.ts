import { NextResponse } from "next/server";
import type { Platform } from "@/lib/beta";
import { sendBetaEmail } from "@/lib/server/betaEmail";
import { ensureBetaTable } from "@/lib/server/betaSignups";
import { getSql } from "@/lib/server/db";
import { addToTesterGroup } from "@/lib/server/googleGroups";

export const runtime = "nodejs";
export const maxDuration = 60;

const BATCH = 25;

/**
 * Vercel Cron: finishes signups whose Google Group add or email didn't go
 * through. Rows are read in one query and written back in one bulk UPDATE.
 * Vercel sends `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const sql = getSql();
  if (!sql) return NextResponse.json({ ok: false, error: "no database" }, { status: 503 });
  await ensureBetaTable(sql);

  // Skip the last 5 minutes so the live request's own after() send isn't raced.
  const rows = await sql<{ id: number; email: string; platform: Platform; group_status: string; email_sent_at: Date | null }[]>`
    SELECT id, email, platform, group_status, email_sent_at FROM beta_signups
    WHERE (group_status = 'pending' OR email_sent_at IS NULL)
      AND updated_at < now() - interval '5 minutes'
    ORDER BY created_at
    LIMIT ${BATCH}
  `;

  const updates: { id: number; group_status: string; group_error: string | null; sent: boolean }[] = [];
  for (const r of rows) {
    // Sequential on purpose: these are Google/backend calls, not DB writes,
    // and the batch is small; Google rate-limits bursts on the Directory API.
    let group = r.group_status;
    let groupError: string | null = null;
    if (r.platform === "android" && group === "pending") {
      const res = await addToTesterGroup(r.email);
      group = res.result;
      groupError = res.error ?? null;
    }
    const sent = r.email_sent_at ? true : await sendBetaEmail(r.email, r.platform);
    updates.push({ id: r.id, group_status: group, group_error: groupError, sent });
  }

  if (updates.length) {
    await sql`
      UPDATE beta_signups AS b SET
        group_status = v.group_status,
        group_error = NULLIF(v.group_error, ''),
        email_sent_at = CASE WHEN v.sent THEN COALESCE(b.email_sent_at, now()) ELSE NULL END,
        updated_at = now()
      FROM unnest(
        ${sql.array(updates.map((u) => u.id))}::int[],
        ${sql.array(updates.map((u) => u.group_status))}::text[],
        ${sql.array(updates.map((u) => u.group_error ?? ""))}::text[],
        ${sql.array(updates.map((u) => u.sent))}::bool[]
      ) AS v(id, group_status, group_error, sent)
      WHERE b.id = v.id
    `;
  }

  return NextResponse.json({
    ok: true,
    processed: updates.length,
    groupPending: updates.filter((u) => u.group_status === "pending").length,
    emailPending: updates.filter((u) => !u.sent).length,
  });
}
