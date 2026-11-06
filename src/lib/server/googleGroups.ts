import { createSign } from "node:crypto";

/**
 * Adds a tester to the Play closed-test Google Group (testers@getsubdrip.com)
 * through the Admin SDK Directory API (members.insert).
 *
 * Auth: a service account with domain-wide delegation for the
 * admin.directory.group.member scope, impersonating a Cloud Identity admin.
 *   GOOGLE_SERVICE_ACCOUNT_JSON  the key file (raw JSON or base64 of it)
 *   GOOGLE_ADMIN_SUBJECT         admin user to impersonate (e.g. admin@getsubdrip.com)
 *   TESTER_GROUP_EMAIL           defaults to testers@getsubdrip.com
 *
 * Never throws: any failure is "pending" so the signup still succeeds and the
 * retry cron adds the member later.
 */

export type GroupResult = "added" | "already" | "pending";

const SCOPE = "https://www.googleapis.com/auth/admin.directory.group.member";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

declare global {
  var __gToken: { value: string; exp: number } | undefined;
}

type ServiceAccount = { client_email: string; private_key: string };

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;
  try {
    const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(json) as ServiceAccount;
    if (!sa.client_email || !sa.private_key) return null;
    return sa;
  } catch {
    return null;
  }
}

export function groupConfigured(): boolean {
  return Boolean(readServiceAccount() && process.env.GOOGLE_ADMIN_SUBJECT);
}

const b64url = (v: string | Buffer) => Buffer.from(v).toString("base64url");

async function accessToken(): Promise<string> {
  const cached = globalThis.__gToken;
  if (cached && cached.exp - 60 > Date.now() / 1000) return cached.value;

  const sa = readServiceAccount();
  const subject = process.env.GOOGLE_ADMIN_SUBJECT;
  if (!sa || !subject) throw new Error("google group sync not configured");

  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({ iss: sa.client_email, sub: subject, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  )}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(sa.private_key.replace(/\\n/g, "\n"));
  const assertion = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  globalThis.__gToken = { value: data.access_token, exp: now + data.expires_in };
  return data.access_token;
}

export async function addToTesterGroup(email: string): Promise<{ result: GroupResult; error?: string }> {
  const group = process.env.TESTER_GROUP_EMAIL || "testers@getsubdrip.com";
  try {
    const token = await accessToken();
    const res = await fetch(
      `https://admin.googleapis.com/admin/directory/v1/groups/${encodeURIComponent(group)}/members`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "MEMBER", delivery_settings: "NONE" }),
        signal: AbortSignal.timeout(6000),
      },
    );
    if (res.ok) return { result: "added" };
    const body = (await res.text()).slice(0, 300);
    // "Member already exists." — a repeat signup, or added by hand in the console.
    if (res.status === 409) return { result: "already" };
    return { result: "pending", error: `members.insert ${res.status}: ${body}` };
  } catch (err) {
    return { result: "pending", error: err instanceof Error ? err.message : String(err) };
  }
}
