import type { Platform } from "@/lib/beta";

/**
 * The welcome (Android) and waitlist (iPhone) emails are rendered and sent by
 * the backend through its shared branded shell + Brevo — this just asks it to.
 *   BACKEND_API_URL    e.g. https://api.getsubdrip.com
 *   BETA_EMAIL_SECRET  shared secret, same value as the backend's env
 * Returns false on any failure; the retry cron resends unsent emails.
 */
export async function sendBetaEmail(email: string, platform: Platform): Promise<boolean> {
  const base = process.env.BACKEND_API_URL;
  const secret = process.env.BETA_EMAIL_SECRET;
  if (!base || !secret) {
    console.warn("beta email skipped: BACKEND_API_URL / BETA_EMAIL_SECRET not set");
    return false;
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/internal/beta-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-key": secret },
      body: JSON.stringify({ email, platform }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`beta email failed: backend ${res.status} ${(await res.text()).slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("beta email failed:", err);
    return false;
  }
}
