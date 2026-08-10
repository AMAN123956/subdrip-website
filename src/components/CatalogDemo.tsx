"use client";

import { useState } from "react";
import { useCurrency } from "@/lib/currency";

const teal = "oklch(40% 0.075 175)";
const sora = "var(--font-sora), sans-serif";

/** Interactive catalog quick-add walkthrough — ported from design/CatalogDemo.dc.html. */
export default function CatalogDemo() {
  const { p } = useCurrency();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [planIdx, setPlanIdx] = useState<number | null>(null);

  const services = [
    {
      id: "netflix", name: "Netflix", category: "Entertainment", initial: "N",
      tint: "oklch(93% 0.05 25)", fg: "oklch(45% 0.16 25)",
      plans: [
        { name: "Mobile", meta: "480p · 1 device", price: p("₹149", "$6.99") },
        { name: "Standard", meta: "1080p · 2 devices", price: p("₹499", "$15.49") },
        { name: "Premium", meta: "4K · 4 devices", price: p("₹649", "$22.99") },
      ],
    },
    {
      id: "spotify", name: "Spotify", category: "Music", initial: "S",
      tint: "oklch(93% 0.06 145)", fg: "oklch(42% 0.13 145)",
      plans: [
        { name: "Individual", meta: "1 account", price: p("₹119", "$11.99") },
        { name: "Duo", meta: "2 accounts", price: p("₹179", "$16.99") },
        { name: "Family", meta: "6 accounts", price: p("₹199", "$19.99") },
      ],
    },
    {
      id: "googleone", name: "Google One", category: "Cloud storage", initial: "G",
      tint: "oklch(93% 0.05 250)", fg: "oklch(45% 0.14 250)",
      plans: [
        { name: "100 GB", meta: "Basic", price: p("₹130", "$1.99") },
        { name: "200 GB", meta: "Standard", price: p("₹210", "$2.99") },
        { name: "2 TB", meta: "Premium", price: p("₹650", "$9.99") },
      ],
    },
    {
      id: "notion", name: "Notion", category: "Productivity", initial: "N",
      tint: "oklch(94% 0.01 80)", fg: "oklch(35% 0.01 80)",
      plans: [
        { name: "Plus", meta: "Per member", price: p("₹420", "$10.00") },
        { name: "Business", meta: "Per member", price: p("₹1,250", "$18.00") },
      ],
    },
  ];

  const chosen = services.find((x) => x.id === serviceId) ?? services[0];
  const plan = chosen.plans[planIdx ?? 1];
  const crumbLabels = ["Service", "Plan", "Confirm", "Added"];

  const confirmRows = [
    { label: "Service", value: chosen.name },
    { label: "Plan", value: plan.name },
    { label: "Amount", value: plan.price + " / month" },
    { label: "Next renewal", value: "14 Sep 2026" },
  ];

  return (
    <div
      style={{
        width: 380,
        maxWidth: "100%",
        background: "oklch(97% 0.012 80)",
        border: "1px solid oklch(91% 0.01 80)",
        borderRadius: 22,
        padding: 22,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {crumbLabels.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                padding: "5px 10px",
                borderRadius: 100,
                whiteSpace: "nowrap",
                background: i === step ? teal : i < step ? "oklch(94% 0.03 175)" : "transparent",
                color: i === step ? "#fff" : i < step ? "oklch(38% 0.075 175)" : "oklch(62% 0.012 80)",
              }}
            >
              {label}
            </div>
            {i < crumbLabels.length - 1 && (
              <div style={{ fontSize: 11, color: "oklch(72% 0.01 80)" }}>→</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, minHeight: 268 }}>
        <div key={`cat${step}${serviceId ?? ""}`} style={{ animation: "fadeUp 0.26s ease" }}>
          {step === 0 && (
            <>
              <div style={{ fontSize: 13, color: "oklch(50% 0.012 80)" }}>Choose a service</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServiceId(s.id);
                      setStep(1);
                      setPlanIdx(null);
                    }}
                    className="hov-lift hov-border-teal-soft"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "#fff",
                      border: "1.5px solid oklch(92% 0.01 80)",
                      borderRadius: 14,
                      padding: "12px 14px",
                      cursor: "pointer",
                      fontFamily: "var(--font-work-sans), sans-serif",
                      textAlign: "left",
                      transition: "border-color 0.18s ease, transform 0.14s ease",
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sora, fontWeight: 700, fontSize: 13, background: s.tint, color: s.fg }}>{s.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{s.name}</div>
                      <div style={{ fontSize: 11.5, color: "oklch(55% 0.01 80)" }}>{s.category}</div>
                    </div>
                    <div style={{ fontSize: 15, color: "oklch(70% 0.02 175)" }}>›</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ fontSize: 13, color: "oklch(50% 0.012 80)" }}>
                Select a plan for {chosen.name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {chosen.plans.map((pl, i) => (
                  <button
                    key={pl.name + pl.meta}
                    onClick={() => {
                      setPlanIdx(i);
                      setStep(2);
                    }}
                    className="hov-border-teal-soft"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: planIdx === i ? "oklch(95% 0.03 175)" : "#fff",
                      border: `1.5px solid ${planIdx === i ? "oklch(65% 0.06 175)" : "oklch(92% 0.01 80)"}`,
                      borderRadius: 14,
                      padding: "13px 14px",
                      cursor: "pointer",
                      fontFamily: "var(--font-work-sans), sans-serif",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "oklch(22% 0.01 80)" }}>{pl.name}</div>
                      <div style={{ fontSize: 11.5, color: "oklch(55% 0.01 80)", marginTop: 2 }}>{pl.meta}</div>
                    </div>
                    <div style={{ fontFamily: sora, fontSize: 14, fontWeight: 700, color: "oklch(22% 0.01 80)" }}>{pl.price}</div>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "oklch(58% 0.012 80)", marginTop: 12, lineHeight: 1.5 }}>
                Catalog prices are suggestions — you can edit the amount on the next step.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontSize: 13, color: "oklch(50% 0.012 80)" }}>Confirm the details</div>
              <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 16, padding: 16, marginTop: 12 }}>
                {confirmRows.map((r, i, a) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 0",
                      borderBottom: `1px solid ${i === a.length - 1 ? "transparent" : "oklch(94% 0.01 80)"}`,
                    }}
                  >
                    <div style={{ fontSize: 13, color: "oklch(52% 0.012 80)" }}>{r.label}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "oklch(24% 0.01 80)" }}>{r.value}</div>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: "oklch(58% 0.012 80)", marginTop: 12 }}>
                  Every field stays editable after adding.
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="hov-teal-dark"
                style={{
                  width: "100%",
                  marginTop: 12,
                  border: "none",
                  background: teal,
                  color: "#fff",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 14.5,
                  fontWeight: 600,
                  padding: 13,
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                Add subscription
              </button>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "46px 12px" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: "oklch(92% 0.06 160)", color: "oklch(40% 0.12 160)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto" }}>✓</div>
              <div style={{ fontFamily: sora, fontSize: 17, fontWeight: 600, marginTop: 14, color: "oklch(22% 0.01 80)" }}>
                {chosen.name} added
              </div>
              <div style={{ fontSize: 13, color: "oklch(52% 0.012 80)", marginTop: 6, lineHeight: 1.5 }}>
                {plan.name} · {plan.price} a month, renewing 14 Sep.
              </div>
              <button
                onClick={() => {
                  setStep(0);
                  setServiceId(null);
                  setPlanIdx(null);
                }}
                style={{
                  marginTop: 18,
                  border: "1.5px solid oklch(87% 0.01 80)",
                  background: "#fff",
                  color: "oklch(30% 0.01 80)",
                  fontFamily: "var(--font-work-sans), sans-serif",
                  fontSize: 13.5,
                  fontWeight: 600,
                  padding: "10px 18px",
                  borderRadius: 11,
                  cursor: "pointer",
                }}
              >
                Try it again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
