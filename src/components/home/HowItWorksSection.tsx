import Link from "next/link";
import { EYEBROW_STYLE, FONT_SORA } from "@/lib/brand";

/** Three static steps. The full walkthrough lives on /how-it-works. */
const STEPS = [
  { title: "Connect Gmail", body: "Read-only. Or add subscriptions by hand." },
  { title: "Review what we found", body: "Nothing is saved until you confirm it." },
  { title: "Stay ahead", body: "Monthly total, renewal reminders, savings." },
];

export default function HowItWorksSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 80px" }}>
      <div style={{ borderTop: "1px solid oklch(89% 0.01 80)", paddingTop: 60 }}>
        <div style={EYEBROW_STYLE}>How it works</div>
        <h2
          style={{
            fontFamily: FONT_SORA,
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.026em",
            margin: "14px 0 0",
          }}
        >
          Set up in about two minutes.
        </h2>

        <ol className="how-steps">
          {STEPS.map((st, i) => (
            <li key={st.title}>
              <span className="how-num">{i + 1}</span>
              <div>
                <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {st.title}
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(48% 0.012 80)", marginTop: 4 }}>
                  {st.body}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Link href="/demo" style={{ display: "inline-block", marginTop: 26, fontSize: 15, fontWeight: 600 }}>
          See it in the live demo →
        </Link>
      </div>
    </section>
  );
}
