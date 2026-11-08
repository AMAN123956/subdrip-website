import type { Platform } from "@/lib/beta";

/**
 * The welcome (Android) and waitlist (iPhone) emails are rendered and sent by
 * the backend through its shared branded shell + Brevo — this just asks it to.
 *   BACKEND_API_URL    e.g. https://api.getsubdrip.com
 *   BETA_EMAIL_SECRET  shared secret, same value as the backend's env
 * signupId lets the backend make every link a tracked redirect (CMS funnel) + add unsubscribe.
 * Returns true only when the backend reports a real send ({ data: { sent: true } });
 * anything else is false and the retry cron resends it.
 */
export async function sendBetaEmail(email: string, platform: Platform, signupId?: number): Promise<boolean> {
  const base = process.env.BACKEND_API_URL;
  const secret = process.env.BETA_EMAIL_SECRET;
  if (!base || !secret) {
    console.warn("beta email skipped: BACKEND_API_URL / BETA_EMAIL_SECRET not set");
    return false;
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/v1/internal/beta-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-key": secret },
      body: JSON.stringify({ email, platform, ...(signupId ? { signupId } : {}) }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`beta email failed: backend ${res.status} ${(await res.text()).slice(0, 200)}`);
      return false;
    }
    const body = (await res.json().catch(() => null)) as { data?: { sent?: boolean } } | null;
    if (body?.data?.sent !== true) {
      console.warn("beta email not sent: backend mail transport is in log mode");
      return false;
    }
    return true;
  } catch (err) {
    console.error("beta email failed:", err);
    return false;
  }
}
