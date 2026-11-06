"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useState } from "react";
import SignupResult from "@/components/signup/SignupResult";
import { useSignup, type SignupError } from "@/components/signup/SignupProvider";
import { APK } from "@/lib/beta";

/**
 * The email-in-place signup (hero, final band, footer). Shares platform and
 * the finished state with the popup through SignupProvider, so after one
 * signup every form and button on the site shows "You're in".
 * Styles: .is-* in globals.css.
 */
export default function InlineSignup({
  placement,
  id,
  tone = "light",
  variant = "card",
  showApk = false,
}: {
  placement: string;
  id?: string;
  tone?: "light" | "dark";
  variant?: "card" | "footer";
  showApk?: boolean;
}) {
  const s = useSignup();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<SignupError>(null);
  const inputId = `${id ?? placement}-email`;
  const ios = s.platform === "ios";

  const submit = async () => {
    if (sending) return;
    setSending(true);
    setError(await s.submitEmail(email, placement, honeypot));
    setSending(false);
  };

  const footer = variant === "footer";

  if (s.done) {
    if (footer) {
      return (
        <div className="is-footer-done">
          <span className="is-tick" aria-hidden>✓</span>
          <span>
            You&rsquo;re on the {s.done.status === "waitlist" ? "iPhone waitlist" : "beta"}.{" "}
            {s.done.status !== "waitlist" && (
              <button type="button" className="is-linkbtn" onClick={() => s.openSignup("footer")}>
                See install steps
              </button>
            )}
          </span>
        </div>
      );
    }
    return (
      <div id={id} className={`is-card is-${tone} is-done`}>
        <SignupResult done={s.done} onReset={s.reset} headingId={`${inputId}-title`} />
      </div>
    );
  }

  const hint =
    error === "invalid"
      ? "That email doesn't look right. Check it and try again."
      : error === "rate"
        ? "Too many tries from this network. Try again in a few minutes."
        : error === "failed"
          ? "That didn't go through. Please try again."
          : ios
            ? "One email the day the iPhone app ships. Nothing else."
            : "Use the Gmail you sign in to the Play Store with. We add you as a tester and email the install link.";

  return (
    <form
      id={id}
      noValidate
      className={`is-card is-${tone}${footer ? " is-footer" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="is-top">
        <div className="is-seg" role="tablist" aria-label="Your phone">
          {(["android", "ios"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={s.platform === p}
              className={s.platform === p ? "on" : undefined}
              onClick={() => {
                s.setPlatform(p);
                setError(null);
              }}
            >
              {p === "android" ? "Android" : "iPhone"}
            </button>
          ))}
        </div>
        {!footer && <span className="is-free">Free during beta</span>}
      </div>
      <div className="is-row">
        <label htmlFor={inputId} className="sr-only">Email address</label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={ios ? "you@email.com" : "you@gmail.com"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          aria-invalid={error === "invalid" || undefined}
          aria-describedby={`${inputId}-hint`}
          className={error ? "err" : undefined}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="su-hp"
        />
        <button type="submit" className="is-go" disabled={sending}>
          {sending ? "Adding…" : ios ? "Notify me" : "Get my invite"}
        </button>
      </div>
      <div id={`${inputId}-hint`} className={`is-hint${error ? " err" : ""}`} role={error ? "alert" : undefined}>
        {hint}
      </div>
      {showApk && !ios && (
        <div className="is-apk">
          Prefer the APK?{" "}
          <a href={APK.arm64.url} onClick={() => track("apk_download", { placement, build: "arm64" })}>
            Download it directly
          </a>{" "}
          ({APK.arm64.size}) · <Link href="/download#apk">How to install</Link>
        </div>
      )}
    </form>
  );
}
