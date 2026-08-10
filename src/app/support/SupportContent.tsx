"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, FONT_SORA } from "@/lib/brand";
import { SUPPORT_LINKS, SUPPORT_TOPICS } from "@/lib/siteData";

const teal = "oklch(40% 0.075 175)";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function SupportContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [version, setVersion] = useState("");
  const [topic, setTopic] = useState("Gmail connection");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const emailValid = EMAIL_RE.test(email.trim());
  const canSubmit = Boolean(name.trim()) && emailValid && Boolean(message.trim());

  const fields = [
    { key: "name", label: "Name", placeholder: "Aman Dixit", value: name, set: setName, error: showErrors && !name.trim(), errorText: "Please tell us your name." },
    { key: "email", label: "Email", placeholder: "you@email.com", value: email, set: setEmail, error: showErrors && !emailValid, errorText: "Enter an email we can reply to." },
    { key: "platform", label: "Platform", placeholder: "Android or iPhone", value: platform, set: setPlatform, error: false, errorText: "" },
    { key: "version", label: "App version (optional)", placeholder: "1.4.2", value: version, set: setVersion, error: false, errorText: "" },
  ];

  const submit = () => {
    if (!canSubmit) {
      setShowErrors(true);
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_SUPPORT_ENDPOINT;
    if (endpoint) {
      // Fire-and-forget; the UI optimistically confirms.
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, platform, version, topic, message }),
      }).catch(() => {});
    }
    // TODO: replace the optimistic no-op path with a real endpoint response
    // once the support inbox service exists.
    setSent(true);
    setShowErrors(false);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setMessage("");
    setPlatform("");
    setVersion("");
  };

  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 32px 88px" }}>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(34px, 4.2vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Support
      </h1>
      <p
        style={{
          fontSize: 17.5,
          lineHeight: 1.65,
          color: "oklch(48% 0.012 80)",
          margin: "16px 0 0",
          maxWidth: 560,
        }}
      >
        Tell us what&rsquo;s happening and we&rsquo;ll help. Never send passwords, bank credentials, or full card
        numbers.
      </p>

      <div
        data-r="cols"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 32,
          marginTop: 36,
          alignItems: "start",
        }}
      >
        <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 24, padding: 32 }}>
          {sent ? (
            <div role="status" style={{ textAlign: "center", padding: "48px 12px", animation: "fadeUp 0.3s ease" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "oklch(92% 0.06 160)",
                  color: "oklch(40% 0.12 160)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  margin: "0 auto",
                }}
              >
                ✓
              </div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 21, fontWeight: 600, marginTop: 18 }}>Message sent</div>
              <p
                style={{
                  fontSize: 15,
                  color: "oklch(50% 0.012 80)",
                  margin: "10px auto 0",
                  maxWidth: 340,
                  lineHeight: 1.6,
                }}
              >
                We&rsquo;ve got it. A reply will come to the email you gave us.
              </p>
              <button
                onClick={reset}
                style={{
                  marginTop: 22,
                  border: "1.5px solid oklch(85% 0.01 80)",
                  background: "#fff",
                  color: "oklch(30% 0.01 80)",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 14.5,
                  fontWeight: 600,
                  padding: "11px 20px",
                  borderRadius: 11,
                  cursor: "pointer",
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <div data-r="form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {fields.map((f) => (
                <div key={f.key} style={{ gridColumn: "span 1" }}>
                  <label
                    htmlFor={`support-${f.key}`}
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "oklch(35% 0.012 80)",
                      display: "block",
                      marginBottom: 7,
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={`support-${f.key}`}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    aria-invalid={f.error || undefined}
                    className="input-field"
                    style={{
                      width: "100%",
                      fontFamily: "var(--font-work-sans), sans-serif",
                      fontSize: 15,
                      color: "oklch(22% 0.01 80)",
                      background: "oklch(98% 0.006 80)",
                      border: `1.5px solid ${f.error ? "oklch(65% 0.16 28)" : "oklch(90% 0.01 80)"}`,
                      borderRadius: 12,
                      padding: "13px 15px",
                      outline: "none",
                      transition: "border-color 0.18s ease",
                    }}
                  />
                  {f.error && (
                    <div style={{ fontSize: 12.5, color: "oklch(52% 0.16 28)", marginTop: 6 }}>{f.errorText}</div>
                  )}
                </div>
              ))}

              <div style={{ gridColumn: "1 / -1" }}>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "oklch(35% 0.012 80)",
                    display: "block",
                    marginBottom: 7,
                  }}
                >
                  Topic
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} role="group" aria-label="Topic">
                  {SUPPORT_TOPICS.map((t) => {
                    const selected = topic === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTopic(t)}
                        aria-pressed={selected}
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                          fontSize: 13.5,
                          fontWeight: 600,
                          padding: "9px 15px",
                          borderRadius: 100,
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          background: selected ? "oklch(94% 0.03 175)" : "#fff",
                          color: selected ? "oklch(34% 0.075 175)" : "oklch(40% 0.012 80)",
                          border: `1.5px solid ${selected ? "oklch(70% 0.06 175)" : "oklch(89% 0.01 80)"}`,
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  htmlFor="support-message"
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "oklch(35% 0.012 80)",
                    display: "block",
                    marginBottom: 7,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What happened, and what did you expect instead?"
                  rows={5}
                  aria-invalid={(showErrors && !message.trim()) || undefined}
                  className="input-field"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "oklch(22% 0.01 80)",
                    background: "oklch(98% 0.006 80)",
                    border: `1.5px solid ${showErrors && !message.trim() ? "oklch(65% 0.16 28)" : "oklch(90% 0.01 80)"}`,
                    borderRadius: 12,
                    padding: "13px 15px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
                {showErrors && !message.trim() && (
                  <div style={{ fontSize: 12.5, color: "oklch(52% 0.16 28)", marginTop: 6 }}>
                    Tell us what happened so we can help.
                  </div>
                )}
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 16,
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <div style={{ fontSize: 13, color: "oklch(52% 0.012 80)", maxWidth: 380, lineHeight: 1.5 }}>
                  By sending this you agree we may use the details to answer you. See the{" "}
                  <Link href="/privacy" style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>
                    privacy notice
                  </Link>
                  .
                </div>
                <button
                  onClick={submit}
                  className="hov-lift"
                  style={{
                    border: "none",
                    background: canSubmit ? teal : "oklch(75% 0.02 175)",
                    color: "#fff",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    padding: "14px 26px",
                    borderRadius: 12,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    transition: "transform 0.12s ease, background 0.2s ease",
                  }}
                >
                  Send message
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SUPPORT_LINKS.map((l) => (
            <Link
              key={l.title}
              href={l.href}
              className="hov-lift2-border"
              style={{
                textAlign: "left",
                background: "#fff",
                border: "1px solid oklch(92% 0.01 80)",
                borderRadius: 18,
                padding: 20,
                cursor: "pointer",
                fontFamily: "var(--font-work-sans), sans-serif",
                transition: "border-color 0.2s ease, transform 0.15s ease",
                display: "block",
                textDecoration: "none",
              }}
            >
              <div style={{ fontFamily: FONT_SORA, fontSize: 15.5, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>
                {l.title}
              </div>
              <div style={{ fontSize: 13.5, color: "oklch(52% 0.012 80)", marginTop: 5, lineHeight: 1.5 }}>{l.body}</div>
            </Link>
          ))}
          <div style={{ background: "oklch(94% 0.03 175)", borderRadius: 18, padding: 20 }}>
            <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 600, color: "oklch(30% 0.06 175)" }}>
              Or email us
            </div>
            <div style={{ fontSize: 14.5, color: "oklch(38% 0.05 175)", marginTop: 5 }}>{BRAND.supportEmail}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
