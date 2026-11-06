"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import JoinBetaButton from "@/components/signup/JoinBetaButton";
import { BRAND, FONT_SORA, NAV_LINKS } from "@/lib/brand";

const teal = "oklch(40% 0.075 175)";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "oklch(97% 0.012 80 / 0.86)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(92% 0.01 80)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link
          href="/"
          aria-label={`${BRAND.name} — home`}
          onClick={() => setMenuOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            marginRight: "auto",
            minWidth: 0,
            flexShrink: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Logo size={32} />
          <span
            style={{
              fontFamily: FONT_SORA,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
              color: "oklch(22% 0.01 80)",
            }}
          >
            {BRAND.name}
          </span>
        </Link>

        <nav
          data-r="desknav"
          aria-label="Main"
          style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hov-bg-soft"
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{
                border: "none",
                background: "transparent",
                fontSize: 14.5,
                fontWeight: 500,
                padding: "9px 11px",
                borderRadius: 9,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "background 0.15s ease",
                textDecoration: "none",
                color: isActive(link.href) ? teal : "oklch(38% 0.012 80)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <JoinBetaButton placement="header" variant="outline" className="headercta-btn" />

        <button
          data-r="burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            flexShrink: 0,
            border: "1.5px solid oklch(88% 0.01 80)",
            background: "#fff",
            borderRadius: 12,
            cursor: "pointer",
            color: "oklch(24% 0.01 80)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          >
            <path
              d={menuOpen ? "M6 6 L18 18 M18 6 L6 18" : "M4 7h16 M4 12h16 M4 17h16"}
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        data-r="mobilenav"
        data-open={menuOpen ? "1" : "0"}
        style={{
          borderTop: "1px solid oklch(92% 0.01 80)",
          background: "oklch(97% 0.012 80)",
          padding: "12px 20px 20px",
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="hov-bg-soft"
            aria-current={isActive(link.href) ? "page" : undefined}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              border: "none",
              background: "transparent",
              fontSize: 16,
              fontWeight: 500,
              padding: "14px 8px",
              borderRadius: 10,
              cursor: "pointer",
              borderBottom: "1px solid oklch(93% 0.01 80)",
              textDecoration: "none",
              color: isActive(link.href) ? teal : "oklch(38% 0.012 80)",
            }}
          >
            {link.label}
          </Link>
        ))}
        <JoinBetaButton
          placement="mobile-menu"
          onOpen={() => setMenuOpen(false)}
          style={{ display: "block", width: "100%", marginTop: 16 }}
        />
      </div>
    </header>
  );
}
