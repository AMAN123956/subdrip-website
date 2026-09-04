import Link from "next/link";
import Logo from "@/components/Logo";
import { BRAND, FONT_SORA } from "@/lib/brand";

/**
 * Fallback for app-link paths (https://getsubdrip.com/subscriptions/…, /renewals, /reminders/…):
 * on a phone with SubDrip installed Android opens the app directly (assetlinks.json in public/);
 * anyone else — desktop, no app yet — lands here with the way onward instead of a 404.
 */
export default function OpenInApp({ title, body }: { title: string; body: string }) {
  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "72px 32px 88px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Logo size={64} />
      </div>
      <h1
        style={{
          fontFamily: FONT_SORA,
          fontSize: "clamp(26px, 4vw, 34px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          margin: "24px auto 0",
          textWrap: "balance",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 16.5, lineHeight: 1.62, color: "oklch(48% 0.012 80)", margin: "14px auto 0" }}>
        {body}
      </p>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "oklch(56% 0.01 80)", margin: "10px auto 0" }}>
        On a phone with {BRAND.name} installed, this link opens straight in the app.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 28 }}>
        <Link
          href="/download"
          style={{
            display: "inline-block",
            padding: "13px 24px",
            borderRadius: 999,
            background: "oklch(40% 0.075 175)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Get the app
        </Link>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "13px 24px",
            borderRadius: 999,
            border: "1.5px solid oklch(85% 0.01 80)",
            color: "oklch(30% 0.01 80)",
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Back to {BRAND.name}
        </Link>
      </div>
    </main>
  );
}
