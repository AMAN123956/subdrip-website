"use client";

import { useState } from "react";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Waitlist signup — ported from design/WaitlistForm.dc.html.
 * Submissions POST to /api/waitlist (stored in the project's cloud
 * Postgres); NEXT_PUBLIC_WAITLIST_ENDPOINT overrides the target.
 */
export default function WaitlistForm({
  tone = "light",
  align = "left",
}: {
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<"invalid" | "failed" | null>(null);
  const [sending, setSending] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  const submit = async () => {
    if (sending) return;
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("invalid");
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "/api/waitlist";
    setSending(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "website" }),
      });
      if (!res.ok) throw new Error(`waitlist endpoint returned ${res.status}`);
      setSubmitted(true);
      setError(null);
      setSavedEmail(trimmed);
    } catch {
      setError("failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        marginTop: dark ? 0 : 22,
        maxWidth: 470,
        width: "100%",
        textAlign: align,
      }}
    >
      {submitted ? (
        <div
          role="status"
          style={{
            display: "flex",
            gap: 13,
            alignItems: "center",
            background: dark ? "oklch(52% 0.08 172)" : "oklch(95% 0.04 160)",
            border: `1px solid ${dark ? "oklch(64% 0.09 170)" : "oklch(88% 0.06 160)"}`,
            borderRadius: 14,
            padding: "16px 18px",
            textAlign: "left",
            animation: "fadeUp 0.28s ease",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: dark ? "#fff" : "oklch(88% 0.08 160)",
              color: dark ? "oklch(38% 0.09 170)" : "oklch(38% 0.11 160)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <div>
            <div
              style={{
                fontSize: 14.5,
                fontWeight: 600,
                color: dark ? "#fff" : "oklch(30% 0.06 160)",
              }}
            >
              You&rsquo;re on the list.
            </div>
            <div
              style={{
                fontSize: 13,
                color: dark ? "oklch(95% 0.02 170)" : "oklch(42% 0.05 160)",
                marginTop: 2,
              }}
            >
              We&rsquo;ll email {savedEmail} the day it ships.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <label htmlFor={`waitlist-email-${tone}-${align}`} className="sr-only">
              Email address
            </label>
            <input
              id={`waitlist-email-${tone}-${align}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
              aria-invalid={error !== null || undefined}
              className="input-field-wait"
              style={{
                flex: "1 1 180px",
                minWidth: 0,
                fontFamily: "var(--font-work-sans), sans-serif",
                fontSize: 15,
                color: dark ? "#fff" : "oklch(22% 0.01 80)",
                background: dark ? "oklch(34% 0.06 175)" : "#fff",
                border: `1.5px solid ${
                  error
                    ? "oklch(65% 0.16 28)"
                    : dark
                      ? "oklch(56% 0.07 175)"
                      : "oklch(87% 0.01 80)"
                }`,
                borderRadius: 13,
                padding: "15px 17px",
                outline: "none",
                transition: "border-color 0.18s ease",
              }}
            />
            <button
              onClick={submit}
              disabled={sending}
              className="hov-lift2 hov-btn-press"
              style={{
                border: "none",
                background: dark ? "#fff" : "oklch(40% 0.075 175)",
                color: dark ? "oklch(30% 0.06 175)" : "#fff",
                fontFamily: "var(--font-work-sans), sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: "15px 24px",
                borderRadius: 13,
                cursor: sending ? "wait" : "pointer",
                whiteSpace: "nowrap",
                opacity: sending ? 0.7 : 1,
                boxShadow: dark
                  ? "none"
                  : "0 6px 20px oklch(40% 0.075 175 / 0.25)",
                transition: "transform 0.12s ease, background 0.2s ease",
              }}
            >
              {sending ? "Adding…" : dark ? "Notify me" : "Notify me at launch"}
            </button>
          </div>
          <div
            style={{
              fontSize: 13.5,
              marginTop: 12,
              color: error
                ? dark
                  ? "oklch(88% 0.11 42)"
                  : "oklch(52% 0.16 28)"
                : dark
                  ? "oklch(92% 0.03 175)"
                  : "oklch(55% 0.012 80)",
            }}
          >
            {error === "invalid"
              ? "That email address does not look right."
              : error === "failed"
                ? "That didn’t go through — please try again."
                : "One email when it ships. Nothing else."}
          </div>
        </>
      )}
    </div>
  );
}
