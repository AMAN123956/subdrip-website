"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSignup } from "@/components/signup/SignupProvider";
import { PLAY_OPT_IN_URL, PLAY_STORE_URL, type Platform } from "@/lib/beta";

/**
 * The signup popup — a centred dialog on desktop, a bottom sheet on phones
 * (see .su-* in globals.css). Android | iPhone toggle on top, one email
 * field focused on open, and the result replaces the form in place.
 */

const COPY: Record<Platform, { title: string; body: string; placeholder: string; hint: string; cta: string }> = {
  android: {
    title: "Join the Android beta",
    body: "Free during beta. We'll add you as a tester on Google Play and email you the install link.",
    placeholder: "you@gmail.com",
    hint: "Use the Gmail you sign in to the Play Store with.",
    cta: "Get my invite",
  },
  ios: {
    title: "Join the iPhone waitlist",
    body: "The iPhone app is next. We'll email you once, the day it's ready.",
    placeholder: "you@email.com",
    hint: "One email when it ships. Nothing else.",
    cta: "Notify me",
  },
};

export default function SignupModal() {
  const s = useSignup();
  const inputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Focus the field on open (keyboard up on phones), lock page scroll, Esc closes.
  useEffect(() => {
    if (!s.isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
      else sheetRef.current?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") s.close();
      if (e.key === "Tab" && sheetRef.current) {
        // Keep Tab inside the dialog.
        const f = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [s.isOpen, s]);

  if (!s.isOpen) return null;

  const c = COPY[s.platform];

  return (
    <div className="su-scrim" onMouseDown={(e) => e.target === e.currentTarget && s.close()}>
      <div
        ref={sheetRef}
        className="su-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="su-title"
        tabIndex={-1}
      >
        <div className="su-grab" aria-hidden />
        <div className="su-top">
          {s.done ? (
            <span />
          ) : (
            <div className="su-seg" role="tablist" aria-label="Your phone">
              {(["android", "ios"] as const).map((p) => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={s.platform === p}
                  className={s.platform === p ? "on" : undefined}
                  onClick={() => s.setPlatform(p)}
                >
                  {p === "android" ? "Android" : "iPhone"}
                </button>
              ))}
            </div>
          )}
          <button className="su-x" aria-label="Close" onClick={s.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>
        </div>

        {s.done ? (
          <Result />
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              s.submit();
            }}
          >
            <h2 id="su-title" className="su-title">{c.title}</h2>
            <p className="su-body">{c.body}</p>
            <label htmlFor="su-email" className="sr-only">Email address</label>
            <input
              ref={inputRef}
              id="su-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder={c.placeholder}
              value={s.email}
              onChange={(e) => s.setEmail(e.target.value)}
              aria-invalid={s.error === "invalid" || undefined}
              aria-describedby="su-hint"
              className={`su-input${s.error ? " err" : ""}`}
            />
            {/* Honeypot — invisible to people, filled by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={s.honeypot}
              onChange={(e) => s.setHoneypot(e.target.value)}
              className="su-hp"
            />
            <div id="su-hint" className={`su-hint${s.error ? " err" : ""}`} role={s.error ? "alert" : undefined}>
              {s.error === "invalid"
                ? "That email doesn't look right. Check it and try again."
                : s.error === "rate"
                  ? "Too many tries from this network. Try again in a few minutes."
                  : s.error === "failed"
                    ? "That didn't go through. Please try again."
                    : c.hint}
            </div>
            <button type="submit" className="su-cta" disabled={s.sending}>
              {s.sending ? "Adding…" : c.cta}
            </button>
            <div className="su-trust">
              <span>Read-only</span>
              <span>No bank login</span>
              <span>No spam</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Result() {
  const s = useSignup();
  const done = s.done!;

  if (done.status === "waitlist") {
    return (
      <div>
        <h2 id="su-title" className="su-title">You&rsquo;re on the iPhone waitlist.</h2>
        <p className="su-body">
          We&rsquo;ll email <b>{done.email}</b> once, the day the iPhone app ships.
        </p>
        <Link href="/demo" className="su-cta ghost" onClick={s.close}>
          Meanwhile, try the live demo
        </Link>
        <button className="su-link" onClick={s.reset}>Use a different email</button>
      </div>
    );
  }

  const pending = done.status === "pending";
  return (
    <div>
      <h2 id="su-title" className="su-title">
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
        If Play says &ldquo;not available&rdquo;, wait about 10 minutes, since Google takes a little while to add new testers.
      </p>
      <button className="su-link" onClick={s.reset}>Use a different email</button>
    </div>
  );
}
