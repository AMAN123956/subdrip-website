import { ensureOnce, type Sql } from "@/lib/server/db";

/**
 * beta_signups — one row per (email, platform). Created on first use like
 * waitlist_emails, so it needs no backend migration. group_status tracks the
 * Google Group sync ('added' | 'already' | 'pending' | 'n/a' for iPhone);
 * email_sent_at stays null until the backend confirms the send.
 */
export function ensureBetaTable(sql: Sql) {
  return ensureOnce("beta_signups", async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS beta_signups (
        id serial PRIMARY KEY,
        email text NOT NULL,
        platform text NOT NULL,
        channel text NOT NULL DEFAULT 'direct',
        placement text,
        ip_hash text,
        group_status text NOT NULL DEFAULT 'pending',
        group_error text,
        email_sent_at timestamptz,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (email, platform)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS beta_signups_ip_recent ON beta_signups (ip_hash, created_at)`;
  });
}
