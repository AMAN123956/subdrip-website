import { NextResponse } from "next/server";
import type { Platform } from "@/lib/beta";
import { sendBetaEmail } from "@/lib/server/betaEmail";
import { ensureBetaTable } from "@/lib/server/betaSignups";
import { getSql } from "@/lib/server/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const BATCH = 25;

/**
 * Vercel Cron: resends welcome / waitlist emails that didn't go out at signup time.
 * Rows are read in one query and marked sent in one bulk UPDATE.
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
  const rows = await sql<{ id: number; email: string; platform: Platform }[]>`
    SELECT id, email, platform FROM beta_signups
    WHERE email_sent_at IS NULL AND updated_at < now() - interval '5 minutes'
    ORDER BY created_at
    LIMIT ${BATCH}
  `;

  const sentIds: number[] = [];
  for (const r of rows) {
    // Sequential on purpose: small batch, and each call is an HTTP send, not a DB write.
    if (await sendBetaEmail(r.email, r.platform, r.id)) sentIds.push(r.id);
  }
  if (sentIds.length) {
    await sql`UPDATE beta_signups SET email_sent_at = now(), updated_at = now() WHERE id IN ${sql(sentIds)}`;
  }
  return NextResponse.json({ ok: true, processed: rows.length, sent: sentIds.length });
}
