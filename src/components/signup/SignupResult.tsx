"use client";

import Link from "next/link";
import type { Done } from "@/components/signup/SignupProvider";
import { APK, PLAY_OPT_IN_URL, PLAY_STORE_URL, TESTER_GROUP_URL, type BetaStep } from "@/lib/beta";

/** Funnel tap → /api/testers/event. sendBeacon survives the page navigating away. */
function trackStep(email: string, step: BetaStep) {
  try {
    const payload = new Blob([JSON.stringify({ email, step })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/testers/event", payload)) {
      void fetch("/api/testers/event", { method: "POST", body: payload, keepalive: true });
    }
  } catch {
    /* tracking is best-effort — never block the link */
  }
}

const STEPS: { step: BetaStep; title: string; hint: string; cta: string; href: string; ghost?: boolean }[] = [
  {
    step: "join",
    title: "Join the tester group",
    hint: "One tap on “Join group”, signed in with this Gmail",
    cta: "Join group",
    href: TESTER_GROUP_URL,
  },
  {
    step: "opt_in",
    title: "Become a tester",
    hint: "Opens Google Play’s beta page",
    cta: "Become a tester",
    href: PLAY_OPT_IN_URL,
  },
  {
    step: "install",
    title: "Install SubDrip",
    hint: "From the Play Store, same Gmail",
    cta: "Google Play",
    href: PLAY_STORE_URL,
    ghost: true,
  },
];

/**
 * What a visitor sees after signing up — in the popup and in every inline form.
 * Android: the three self-serve steps (+ the APK fallback when published). iPhone: waitlist.
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
        <Link
          href="/demo"
          className="su-cta ghost"
          onClick={() => {
            trackStep(done.email, "demo");
            onNavigate?.();
          }}
        >
          Meanwhile, try the live demo
        </Link>
        <button type="button" className="su-link" onClick={onReset}>Use a different email</button>
      </div>
    );
  }

  return (
    <div className="su-result">
      <h2 id={headingId} className="su-title">
        {done.status === "already" ? "You're already on the list." : "You're in. Three taps to install."}
      </h2>
      <p className="su-body">
        {done.status === "already" ? (
          "Here are the steps again, in case you didn't finish."
        ) : (
          <>
            Do these in order with <b>{done.email}</b>. We&rsquo;ve emailed you the same steps.
          </>
        )}
      </p>
      {STEPS.map((s, i) => (
        <a
          key={s.step}
          className="su-step"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackStep(done.email, s.step)}
        >
          <span className="su-num">{i + 1}</span>
          <span className="su-grow">
            <b>{s.title}</b>
            {s.hint}
          </span>
          <span className={`su-pill${s.ghost ? " ghost" : ""}`}>{s.cta}</span>
        </a>
      ))}
      <p className="su-fine">
        Play says &ldquo;not available&rdquo;? Check you joined the group in step 1 with the same Gmail, then try
        step 2 again. Google can take a few minutes to catch up.
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
