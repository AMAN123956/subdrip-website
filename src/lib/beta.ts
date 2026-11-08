/**
 * Beta / waitlist constants shared by the signup popup, the /api/testers
 * route and the download page. Android joins the Play closed test (via the
 * testers@ Google Group); iPhone joins the waitlist.
 */

export type Platform = "android" | "ios";

export const ANDROID_PACKAGE = "com.subdrip.app";

/**
 * Play closed testing reads this PERSONAL Google Group (Play can't validate a Workspace-domain
 * group from a personal developer account). Google has no API to add members to a personal
 * group, so testers join it themselves — "Anyone on the web can join" — as step 1.
 */
export const TESTER_GROUP_URL = "https://groups.google.com/g/subdrip-testers";

/** Play's tester opt-in page — works once the email is in the tester group. */
export const PLAY_OPT_IN_URL = `https://play.google.com/apps/testing/${ANDROID_PACKAGE}`;

/** Store listing — installable for opted-in testers. */
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

/** Server → client result of a signup; drives the popup's success states. */
/**
 * Direct APK download (GitHub Releases on the public website repo). Bump the
 * tag + version when a new build is published; the page reads only these.
 * `available` hides every APK link, the /download#apk section and the APK FAQ
 * until the release assets actually exist — flip it to true after uploading.
 */
export const APK = {
  available: false,
  version: "1.0.0 (7)",
  minAndroid: "Android 9+",
  arm64: {
    url: "https://github.com/AMAN123956/subdrip-website/releases/download/apk-1.0.0-7/SubDrip-1.0.0-arm64.apk",
    size: "23 MB",
  },
  universal: {
    url: "https://github.com/AMAN123956/subdrip-website/releases/download/apk-1.0.0-7/SubDrip-1.0.0-universal.apk",
    size: "63 MB",
  },
} as const;

/** "pending" only survives in old localStorage entries from before self-join; it renders as "added". */
export type SignupStatus = "added" | "already" | "pending" | "waitlist";

/** Funnel taps recorded from the success screen (mirrors the backend's beta_events.event). */
export type BetaStep = "join" | "opt_in" | "install" | "demo";

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** iPhone/iPad visitors get the iPhone tab preselected; everyone else Android. */
export function detectPlatform(userAgent: string): Platform {
  return /iPhone|iPad|iPod/i.test(userAgent) ? "ios" : "android";
}
