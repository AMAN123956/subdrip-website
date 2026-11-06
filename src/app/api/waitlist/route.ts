import { NextResponse } from "next/server";
import { ensureOnce, getSql, type Sql } from "@/lib/server/db";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Legacy waitlist endpoint (NEXT_PUBLIC_WAITLIST_ENDPOINT override target).
 * The site's own forms now post to /api/testers.
 */
function ensureTable(sql: Sql) {
  return ensureOnce(
    "waitlist_emails",
    () => sql`
      CREATE TABLE IF NOT EXISTS waitlist_emails (
        id serial PRIMARY KEY,
        email text NOT NULL UNIQUE,
        source text NOT NULL DEFAULT 'website',
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `,
  );
}

export async function POST(request: Request) {
  let email: unknown;
  let source: unknown;
  try {
    ({ email, source } = await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof email !== "string" || email.trim().length > 320 || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 422 },
    );
  }
  const normalized = email.trim().toLowerCase();
  const src = typeof source === "string" && source.length <= 64 ? source : "website";

  const sql = getSql();
  if (!sql) {
    return NextResponse.json(
      { ok: false, error: "Waitlist storage is not configured." },
      { status: 503 },
    );
  }

  try {
    await ensureTable(sql);
    await sql`
      INSERT INTO waitlist_emails (email, source)
      VALUES (${normalized}, ${src})
      ON CONFLICT (email) DO NOTHING
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your email right now." },
      { status: 500 },
    );
  }
}
