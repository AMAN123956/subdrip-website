"use client";

import Link from "next/link";
import { useState } from "react";
import { FONT_SORA } from "@/lib/brand";
import { ALL_FAQS, FAQ_CAT_LABELS } from "@/lib/siteData";

const teal = "oklch(40% 0.075 175)";

export default function FaqContent() {
  const [openFaq, setOpenFaq] = useState<string | null>("q1");
  const [cat, setCat] = useState("All");

  const visible = cat === "All" ? ALL_FAQS : ALL_FAQS.filter((f) => f.cat === cat);

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "72px 32px 88px" }}>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(34px, 4.2vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Questions, answered.
      </h1>
      <p style={{ fontSize: 17.5, lineHeight: 1.65, color: "oklch(48% 0.012 80)", margin: "16px 0 0" }}>
        If something isn&rsquo;t covered here,{" "}
        <Link href="/support" style={{ color: teal, fontWeight: 600, cursor: "pointer" }}>
          contact support
        </Link>
        .
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 30 }}>
        {FAQ_CAT_LABELS.map((c) => {
          const selected = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={selected}
              style={{
                fontFamily: "var(--font-work-sans), sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: "9px 16px",
                borderRadius: 100,
                cursor: "pointer",
                transition: "all 0.18s ease",
                background: selected ? teal : "#fff",
                color: selected ? "#fff" : "oklch(35% 0.012 80)",
                border: `1.5px solid ${selected ? teal : "oklch(88% 0.01 80)"}`,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        {visible.map((q) => {
          const open = openFaq === q.id;
          return (
            <div
              key={q.id}
              style={{
                background: "#fff",
                border: "1px solid oklch(92% 0.01 80)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenFaq(open ? null : q.id)}
                aria-expanded={open}
                aria-controls={`faq-${q.id}`}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "oklch(24% 0.01 80)",
                  padding: "18px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ flex: 1 }}>{q.q}</span>
                <span
                  aria-hidden
                  style={{
                    fontSize: 18,
                    color: "oklch(55% 0.05 175)",
                    transition: "transform 0.2s ease",
                    transform: open ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {open && (
                <div
                  id={`faq-${q.id}`}
                  style={{
                    padding: "0 20px 20px",
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
    </main>
  );
}
