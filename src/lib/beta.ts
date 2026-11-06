/**
 * Beta / waitlist constants shared by the signup popup, the /api/testers
 * route and the download page. Android joins the Play closed test (via the
 * testers@ Google Group); iPhone joins the waitlist.
 */

export type Platform = "android" | "ios";

export const ANDROID_PACKAGE = "com.subdrip.app";

/** Play's tester opt-in page — works once the email is in the tester group. */
export const PLAY_OPT_IN_URL = `https://play.google.com/apps/testing/${ANDROID_PACKAGE}`;

/** Store listing — installable for opted-in testers. */
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

/** Server → client result of a signup; drives the popup's success states. */
export type SignupStatus = "added" | "already" | "pending" | "waitlist";

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** iPhone/iPad visitors get the iPhone tab preselected; everyone else Android. */
export function detectPlatform(userAgent: string): Platform {
  return /iPhone|iPad|iPod/i.test(userAgent) ? "ios" : "android";
}
