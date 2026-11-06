import postgres from "postgres";

/**
 * One small Postgres pool per server instance, shared by the waitlist and
 * beta-signup routes (same cloud DATABASE_URL the backend uses).
 */
declare global {
  var __siteSql: ReturnType<typeof postgres> | undefined;
}

export type Sql = ReturnType<typeof postgres>;

export function getSql(): Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalThis.__siteSql) {
    globalThis.__siteSql = postgres(url, {
      max: 3,
      idle_timeout: 20,
      connect_timeout: 10,
      // Supabase's transaction pooler (port 6543) does not support prepared
      // statements; disabling them keeps both pooler and direct URLs working.
      prepare: false,
    });
  }
  return globalThis.__siteSql;
}

/**
 * Run a CREATE TABLE IF NOT EXISTS once per instance. A failed attempt is
 * not cached, so a transient network error retries on the next request.
 */
const ready = new Map<string, Promise<void>>();
export function ensureOnce(key: string, run: () => Promise<unknown>): Promise<void> {
  let p = ready.get(key);
  if (!p) {
    p = run()
      .then(() => undefined)
      .catch((err) => {
        ready.delete(key);
        throw err;
      });
    ready.set(key, p);
  }
  return p;
}
