"use client";

import Link from "next/link";
import { useState } from "react";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import { PRIVACY_PILLARS, PRIVACY_SECTIONS } from "@/lib/siteData";

export default function PrivacyContent() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "72px 32px 88px" }}>
      <div style={EYEBROW_STYLE}>Privacy &amp; security</div>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(34px, 4.2vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "14px 0 0",
          textWrap: "balance",
        }}
      >
        Clear visibility starts with clear data practices.
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: "oklch(48% 0.012 80)",
          margin: "18px 0 0",
          maxWidth: 620,
        }}
      >
        This page explains how source connections work, what the app accesses, and how to remove everything. It is a
        plain-language summary — the full policy has the legal detail.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
          gap: 12,
          marginTop: 36,
        }}
      >
        {PRIVACY_PILLARS.map((pp) => (
          <div
            key={pp.title}
            style={{
              background: "#fff",
              border: "1px solid oklch(92% 0.01 80)",
              borderRadius: 18,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 17 }}>{pp.icon}</div>
            <div style={{ fontFamily: FONT_SORA, fontSize: 15, fontWeight: 600, marginTop: 10 }}>{pp.title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "oklch(50% 0.012 80)", marginTop: 6 }}>{pp.body}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
        {PRIVACY_SECTIONS.map((ps) => {
          const isOpen = open === ps.id;
          return (
            <div
              key={ps.id}
              style={{
                background: "#fff",
                border: "1px solid oklch(92% 0.01 80)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : ps.id)}
                aria-expanded={isOpen}
                aria-controls={`privacy-${ps.id}`}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "oklch(24% 0.01 80)",
                  padding: "18px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ flex: 1 }}>{ps.title}</span>
                <span
                  aria-hidden
                  style={{
                    fontSize: 18,
                    color: "oklch(55% 0.05 175)",
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div
                  id={`privacy-${ps.id}`}
                  style={{
                    padding: "0 20px 20px",
                    animation: "fadeUp 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {ps.items.map((it) => (
                    <div key={it} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "oklch(60% 0.08 175)",
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "oklch(45% 0.012 80)" }}>{it}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "oklch(94% 0.03 175)",
          borderRadius: 22,
          padding: 28,
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600, color: "oklch(30% 0.06 175)" }}>
            Want everything removed?
          </div>
          <div style={{ fontSize: 14.5, color: "oklch(42% 0.04 175)", marginTop: 4 }}>
            Delete your account and data from inside the app, or request it by email.
          </div>
        </div>
        <Link
          href="/data-deletion"
          className="hov-teal-dark"
          style={{
            border: "none",
            background: "oklch(40% 0.075 175)",
            color: "#fff",
            fontFamily: "var(--font-work-sans), sans-serif",
            fontSize: 15,
            fontWeight: 600,
            padding: "13px 22px",
            borderRadius: 12,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Data deletion
        </Link>
      </div>
    </main>
  );
}
