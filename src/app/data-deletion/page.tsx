import type { Metadata } from "next";
import { FONT_SORA } from "@/lib/brand";
import { DELETED_ITEMS, DELETION_ROUTES, RETAINED_ITEMS } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Delete your data",
  description:
    "You can remove your account and everything associated with it at any time. Two routes, depending on whether you still have access to the app.",
};

export default function DataDeletionPage() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "72px 32px 88px" }}>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(32px, 4vw, 46px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Delete your data
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: "oklch(48% 0.012 80)",
          margin: "18px 0 0",
          maxWidth: 600,
        }}
      >
        You can remove your account and everything associated with it at any time. Two routes, depending on whether you
        still have access to the app.
      </p>

      <div data-r="cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36 }}>
        {DELETION_ROUTES.map((d) => (
          <div
            key={d.kicker}
            style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 22, padding: 28 }}
          >
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "oklch(52% 0.06 175)",
              }}
            >
              {d.kicker}
            </div>
            <div style={{ fontFamily: FONT_SORA, fontSize: 19, fontWeight: 600, marginTop: 10 }}>{d.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {d.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 7,
                      background: "oklch(94% 0.03 175)",
                      color: "oklch(38% 0.075 175)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11.5,
                      fontWeight: 700,
                      fontFamily: FONT_SORA,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(40% 0.012 80)" }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div data-r="cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 22, padding: 28 }}>
          <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600 }}>What gets deleted</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
            {DELETED_ITEMS.map((i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "oklch(60% 0.11 160)",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(43% 0.012 80)" }}>{i}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid oklch(92% 0.01 80)", borderRadius: 22, padding: 28 }}>
          <div style={{ fontFamily: FONT_SORA, fontSize: 17, fontWeight: 600 }}>What may be retained</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
            {RETAINED_ITEMS.map((i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "oklch(70% 0.1 70)",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(43% 0.012 80)" }}>{i}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
