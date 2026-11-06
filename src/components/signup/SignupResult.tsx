"use client";

import Link from "next/link";
import type { Done } from "@/components/signup/SignupProvider";
import { APK, PLAY_OPT_IN_URL, PLAY_STORE_URL } from "@/lib/beta";

/**
 * What a visitor sees after signing up — in the popup and in every inline form.
 * Android: the two Play steps (plus the APK fallback). iPhone: waitlist confirmation.
 * Styles: .su-* in globals.css (shared with the popup).
 */
export default function SignupResult({
  done,
  onReset,
  onNavigate,
  headingId = "su-title",
}: {
  done: Done;
  onReset: () => void;
  onNavigate?: () => void;
  headingId?: string;
}) {
  if (done.status === "waitlist") {
    return (
      <div className="su-result">
        <h2 id={headingId} className="su-title">You&rsquo;re on the iPhone waitlist.</h2>
        <p className="su-body">
          We&rsquo;ll email <b>{done.email}</b> once, the day the iPhone app ships.
        </p>
        <Link href="/demo" className="su-cta ghost" onClick={onNavigate}>
          Meanwhile, try the live demo
        </Link>
        <button type="button" className="su-link" onClick={onReset}>Use a different email</button>
      </div>
    );
  }

  const pending = done.status === "pending";
  return (
    <div className="su-result">
      <h2 id={headingId} className="su-title">
        {done.status === "already"
          ? "You're already on the beta."
          : pending
            ? "Your spot is saved."
            : "You're in. Two steps to install."}
      </h2>
      <p className="su-body">
        {done.status === "already"
          ? "Same two steps, in case you didn't finish installing."
          : pending
            ? "We couldn't reach Google's tester list just now. We'll add you shortly, and the links in your welcome email will work after that."
            : <>We&rsquo;ve also emailed these links to <b>{done.email}</b>.</>}
      </p>
      <a className="su-step" href={PLAY_OPT_IN_URL} target="_blank" rel="noopener noreferrer">
        <span className="su-num">1</span>
        <span className="su-grow">
          <b>{pending ? "Try the invite link anyway" : "Accept the tester invite"}</b>
          {pending ? "It often works within minutes" : "Opens Google Play's beta page"}
        </span>
        <span className="su-pill">Become a tester</span>
      </a>
      {!pending && (
        <a className="su-step" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
          <span className="su-num">2</span>
          <span className="su-grow">
            <b>Install SubDrip</b>
            From the Play Store, same Gmail
          </span>
          <span className="su-pill ghost">Google Play</span>
        </a>
      )}
      <p className="su-fine">
        Play says &ldquo;not available&rdquo;? Google can take a little while to add new testers.
        {APK.available && (
          <>
            {" "}Or skip the Play Store: <a href={APK.arm64.url}>download the APK</a> ({APK.arm64.size}).
          </>
        )}
      </p>
      <button type="button" className="su-link" onClick={onReset}>Use a different email</button>
    </div>
  );
}
