import Link from "next/link";
import Logo from "@/components/Logo";
import { BRAND, FONT_SORA, FOOTER_COLS } from "@/lib/brand";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid oklch(91% 0.01 80)",
        background: "oklch(96% 0.01 80)",
      }}
    >
      <div
        data-r="foot"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 32px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={30} />
            <span
              style={{
                fontFamily: FONT_SORA,
                fontWeight: 700,
                fontSize: 14.5,
                color: "oklch(22% 0.01 80)",
              }}
            >
              {BRAND.name}
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "oklch(50% 0.012 80)",
              margin: "14px 0 0",
              maxWidth: 280,
            }}
          >
            {BRAND.footerBlurb}
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div data-r="footcol" key={col.title}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "oklch(45% 0.012 80)",
              }}
            >
              {col.title}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 16,
              }}
            >
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hov-foot-link"
                  style={{
                    fontSize: 14.5,
                    color: "oklch(38% 0.012 80)",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        data-r="footbottom"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 32px 40px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          fontSize: 13,
          color: "oklch(55% 0.012 80)",
          borderTop: "1px solid oklch(91% 0.01 80)",
        }}
      >
        <div>{BRAND.copyright}</div>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/privacy" style={{ cursor: "pointer", color: "inherit" }}>
            Privacy Policy
          </Link>
          <Link
            href="/data-deletion"
            style={{ cursor: "pointer", color: "inherit" }}
          >
            Data deletion
          </Link>
          <Link href="/support" style={{ cursor: "pointer", color: "inherit" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
