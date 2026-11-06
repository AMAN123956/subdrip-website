import Link from "next/link";
import { FONT_SORA } from "@/lib/brand";

/** Four lines that answer "why does it need my email?". Full detail on /privacy. */
const POINTS = [
  { strong: "Read-only Gmail access.", rest: " We can't send or delete." },
  { strong: "Never asks for your bank login.", rest: "" },
  { strong: "Only billing emails", rest: " are parsed." },
  { strong: "Delete your data anytime,", rest: " in the app." },
];

export default function PrivacyStrip() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 80px" }}>
      <div className="priv-strip">
        <div>
          <h2
            style={{
              fontFamily: FONT_SORA,
              fontSize: "clamp(24px, 2.4vw, 30px)",
              fontWeight: 700,
              letterSpacing: "-0.024em",
              margin: 0,
            }}
          >
            Your inbox stays yours.
          </h2>
          <Link href="/privacy" style={{ display: "inline-block", marginTop: 12, fontSize: 14.5, fontWeight: 600 }}>
            How we handle your data →
          </Link>
        </div>
        <ul>
          {POINTS.map((pt) => (
            <li key={pt.strong}>
              <b>{pt.strong}</b>
              {pt.rest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
