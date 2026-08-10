import { NextResponse } from "next/server";
import postgres from "postgres";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Waitlist signups go into the project's existing cloud Postgres
 * (same DATABASE_URL the backend uses). Single small pool per server
 * instance; the table is created on first use so this needs no
 * backend migration.
 */
declare global {
  var __waitlistSql: ReturnType<typeof postgres> | undefined;
  var __waitlistReady: Promise<void> | undefined;
}

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalThis.__waitlistSql) {
    globalThis.__waitlistSql = postgres(url, {
      max: 3,
      idle_timeout: 20,
      connect_timeout: 10,
      // Supabase's transaction pooler (port 6543) does not support prepared
      // statements; disabling them keeps both pooler and direct URLs working.
      prepare: false,
    });
  }
  return globalThis.__waitlistSql;
}

function ensureTable(sql: ReturnType<typeof postgres>) {
  if (!globalThis.__waitlistReady) {
    globalThis.__waitlistReady = sql`
      CREATE TABLE IF NOT EXISTS waitlist_emails (
        id serial PRIMARY KEY,
        email text NOT NULL UNIQUE,
        source text NOT NULL DEFAULT 'website',
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `.then(() => undefined)
      // If creation failed (e.g. transient network error), allow a retry
      // on the next request instead of caching the rejection forever.
      .catch((err) => {
        globalThis.__waitlistReady = undefined;
        throw err;
      });
  }
  return globalThis.__waitlistReady;
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
