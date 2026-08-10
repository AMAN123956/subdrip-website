"use client";

import { useState } from "react";
import DemoPhone from "@/components/phone/DemoPhone";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";
import {
  DEMO_FLOWS,
  DEMO_NOTES,
  DEMO_SCREENS,
  DEMO_TIPS,
  type DemoScreenKey,
} from "@/lib/siteData";

const teal = "oklch(40% 0.075 175)";

export default function DemoContent() {
  const [jump, setJump] = useState<DemoScreenKey | null>(null);

  const screen: DemoScreenKey = jump ?? "dashboard";
  const tip = DEMO_TIPS[jump ?? "flow"] ?? DEMO_TIPS.flow;

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 32px 72px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <div style={EYEBROW_STYLE}>Live demo</div>
          <h1
            style={{
              fontFamily: FONT_SORA,
              fontSize: "clamp(32px, 4vw, 46px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "14px 0 0",
              textWrap: "balance",
            }}
          >
            Use the real app, end to end.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.62, color: "oklch(48% 0.012 80)", margin: "14px 0 0" }}>
            This is the actual prototype, not a video: sign in, connect a source, review what it finds, add a service
            from the catalog, set a reminder, and walk the savings recap — the same build that ships, running in your
            browser.
          </p>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            border: "1px solid oklch(88% 0.02 100)",
            background: "oklch(96% 0.03 100)",
            color: "oklch(45% 0.06 80)",
            fontSize: 12,
            fontWeight: 600,
            padding: "8px 13px",
            borderRadius: 100,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(65% 0.12 80)", flexShrink: 0 }} />
          Sample data · nothing is connected
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "oklch(50% 0.012 80)", marginRight: 6 }}>Jump to</span>
          {DEMO_SCREENS.map((j) => {
            const selected = jump === j.k;
            return (
              <button
                key={j.k}
                onClick={() => setJump(j.k)}
                className="hov-border-teal-soft"
                aria-pressed={selected}
                title={j.d}
                style={{
                  fontFamily: "var(--font-work-sans), sans-serif",
                  border: `1.5px solid ${selected ? teal : "oklch(89% 0.01 80)"}`,
                  borderRadius: 100,
                  padding: "9px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  transition: "all 0.18s ease",
                  background: selected ? teal : "#fff",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: selected ? "oklch(85% 0.1 168)" : "oklch(80% 0.02 175)",
                  }}
                />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: selected ? "#fff" : "oklch(32% 0.012 80)" }}>
                  {j.l}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => setJump("welcomeAuth")}
            className="hov-border-teal-soft"
            style={{
              fontFamily: "var(--font-work-sans), sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              padding: "9px 16px",
              borderRadius: 100,
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: "transparent",
              color: "oklch(45% 0.012 80)",
              border: "1.5px dashed oklch(82% 0.01 80)",
            }}
          >
            ↺ Restart from sign-in
          </button>
        </div>

        <div
          data-r="demoframe"
          style={{
            marginTop: 24,
            background: "#fff",
            border: "1px solid oklch(92% 0.01 80)",
            borderRadius: 30,
            padding: "32px 24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            data-r="demophone"
            style={{
              width: 330,
              height: 716,
              overflow: "hidden",
              filter: "drop-shadow(0 26px 54px oklch(30% 0.02 80 / 0.18))",
            }}
          >
            <div style={{ width: 412, transform: "scale(0.8)", transformOrigin: "top left" }}>
              <DemoPhone screen={screen} onNavigate={(s) => setJump(s)} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 24, padding: 28 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(48% 0.07 175)",
              }}
            >
              On this screen
            </div>
            <div key={jump ?? "flow"} style={{ animation: "fadeUp 0.3s ease" }}>
              <div style={{ fontFamily: FONT_SORA, fontSize: 20, fontWeight: 600, marginTop: 12, lineHeight: 1.3 }}>
                {tip.title}
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "oklch(48% 0.012 80)", margin: "8px 0 0" }}>
                {tip.body}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                {tip.tries.map((t) => (
                  <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: "50%",
                        background: "oklch(94% 0.03 175)",
                        color: "oklch(38% 0.075 175)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 3,
                      }}
                    >
                      →
                    </div>
                    <div style={{ fontSize: 14.5, color: "oklch(38% 0.012 80)", lineHeight: 1.5 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "oklch(94% 0.03 175)", borderRadius: 24, padding: 28 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(38% 0.075 175)",
              }}
            >
              Good to know
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 18 }}>
              {DEMO_NOTES.map((n) => (
                <div key={n} style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(35% 0.04 175)" }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={EYEBROW_STYLE}>The full path</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            marginTop: 20,
            borderTop: "1.5px solid oklch(89% 0.01 80)",
          }}
        >
          {DEMO_FLOWS.map((d) => (
            <div key={d.num} style={{ padding: "24px 24px 0 0", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -6.5,
                  left: 0,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: teal,
                  border: "2.5px solid oklch(97% 0.012 80)",
                }}
              />
              <div style={{ fontFamily: FONT_SORA, fontSize: 12.5, fontWeight: 700, color: "oklch(60% 0.06 175)", letterSpacing: "0.04em" }}>
                {d.num}
              </div>
              <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600, marginTop: 10 }}>{d.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "oklch(50% 0.012 80)", margin: "8px 0 0", maxWidth: 240 }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
