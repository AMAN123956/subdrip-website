import { ImageResponse } from "next/og";

/**
 * Link-preview card for X / Reddit / WhatsApp. Satori doesn't take oklch,
 * so the brand tokens are hex approximations of brand.ts COLORS.
 */
export const alt = "SubDrip — every subscription is a drip. We add them up.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEAL = "#1f5c54";
const CREAM = "#f8f4ee";
const MINT = "#8fd6c6";
const INK = "#24211d";
const MUTED = "#6e685f";

const ROWS = [
  { name: "Netflix Premium", meta: "Renews in 3 days", amount: "₹649" },
  { name: "Adobe CC", meta: "Trial converts tomorrow", amount: "₹1,949" },
  { name: "Spotify Duo", meta: "Monthly", amount: "₹179" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: CREAM, padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 100 100">
              <rect width="100" height="100" rx="30" fill={TEAL} />
              <circle cx="50" cy="23" r="11" fill={MINT} />
              <path
                d="M38.5 33 C 27 47.5, 21.5 60, 27.5 70.5 C 33 80, 43 84.5, 50 84.5 C 57 84.5, 67 80, 72.5 70.5 C 78.5 60, 73 47.5, 61.5 33"
                stroke={CREAM}
                strokeWidth="13"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div style={{ fontSize: 40, fontWeight: 700, color: INK }}>SubDrip</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 700, color: INK, lineHeight: 1.08, letterSpacing: -2, maxWidth: 560 }}>
              Every subscription is a drip. We add them up.
            </div>
            <div style={{ fontSize: 28, color: MUTED, marginTop: 22 }}>Find, total and get reminded about every recurring charge.</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ background: TEAL, color: "#fff", fontSize: 26, fontWeight: 600, padding: "14px 26px", borderRadius: 16 }}>
              Android beta open · getsubdrip.com
            </div>
          </div>
        </div>

        <div
          style={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: 32,
            padding: 30,
            marginLeft: 40,
            boxShadow: "0 30px 60px rgba(40,35,30,0.14)",
          }}
        >
          <div style={{ fontSize: 20, color: MUTED }}>This month</div>
          <div style={{ fontSize: 60, fontWeight: 700, color: INK, marginTop: 6 }}>₹4,268</div>
          <div style={{ fontSize: 20, color: TEAL, marginTop: 4 }}>8 subscriptions · ₹51,216 / yr</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
            {ROWS.map((r) => (
              <div
                key={r.name}
                style={{ display: "flex", alignItems: "center", padding: "16px 0", borderTop: "1px solid #ece6dc" }}
              >
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: INK }}>{r.name}</div>
                  <div style={{ fontSize: 17, color: MUTED, marginTop: 2 }}>{r.meta}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>{r.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
