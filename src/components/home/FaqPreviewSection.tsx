"use client";

import Link from "next/link";
import { useState } from "react";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { ALL_FAQS } from "@/lib/siteData";

export default function FaqPreviewSection() {
  const [openFaq, setOpenFaq] = useState<string | null>("q1");
  const faqs = ALL_FAQS.slice(0, 5);

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 88px" }}>
      <div
        style={{
          borderTop: "1px solid oklch(89% 0.01 80)",
          paddingTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
          gap: 56,
          alignItems: "start",
        }}
      >
        <div>
          <div style={EYEBROW_STYLE}>Questions</div>
          <h2
            style={{
              fontFamily: FONT_SORA,
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.026em",
              margin: "14px 0 0",
              maxWidth: 400,
              textWrap: "balance",
            }}
          >
            The things people ask first.
          </h2>
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.62,
              color: "oklch(48% 0.012 80)",
              margin: "12px 0 0",
              maxWidth: 420,
            }}
          >
            Five quick answers. The full list covers sources, privacy, reminders and support.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
            <Link
              href="/faq"
              className="hov-border-teal"
              style={{
                border: "1.5px solid oklch(85% 0.01 80)",
                background: "#fff",
                color: "oklch(28% 0.01 80)",
                fontFamily: "var(--font-work-sans), sans-serif",
                fontSize: 14.5,
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: 12,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              See all questions
            </Link>
            <Link
              href="/support"
              className="hov-link-dark"
              style={{
                border: "none",
                background: "transparent",
                color: "oklch(40% 0.075 175)",
                fontFamily: "var(--font-work-sans), sans-serif",
                fontSize: 14.5,
                fontWeight: 600,
                padding: "12px 4px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Contact support →
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid oklch(92% 0.01 80)",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          {faqs.map((q) => {
            const open = openFaq === q.id;
            return (
              <div key={q.id} style={{ borderBottom: "1px solid oklch(95% 0.008 80)" }}>
                <button
                  onClick={() => setOpenFaq(open ? null : q.id)}
                  className="hov-faq-row"
                  aria-expanded={open}
                  aria-controls={`faq-preview-${q.id}`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    fontFamily: "var(--font-work-sans), sans-serif",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "oklch(24% 0.01 80)",
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transition: "background 0.15s ease",
                  }}
                >
                  <span style={{ flex: 1 }}>{q.q}</span>
                  <span
                    aria-hidden
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "oklch(95% 0.02 175)",
                      color: "oklch(40% 0.075 175)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                      transform: open ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div
                    id={`faq-preview-${q.id}`}
                    style={{
                      padding: "0 24px 22px",
                      fontSize: 14.5,
                      lineHeight: 1.65,
                      color: "oklch(48% 0.012 80)",
                      animation: "fadeUp 0.2s ease",
                    }}
                  >
                    {q.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
