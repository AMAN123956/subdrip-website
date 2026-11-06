"use client";

import type { CSSProperties } from "react";
import { useSignup } from "@/components/signup/SignupProvider";

/** The homepage hero form; when present, buttons scroll to it instead of opening the popup. */
export const HERO_SIGNUP_ID = "hero-signup";

/**
 * Every "Join the beta" entry point. On the homepage it scrolls to the hero
 * form and focuses the email field; elsewhere it opens the popup. After a
 * signup it reads "You're in ✓" and shows the install steps.
 */
export default function JoinBetaButton({
  placement,
  label = "Join the beta",
  variant = "solid",
  className,
  style,
  id,
  onOpen,
}: {
  placement: string;
  label?: string;
  variant?: "solid" | "outline" | "light";
  className?: string;
  style?: CSSProperties;
  id?: string;
  onOpen?: () => void;
}) {
  const { openSignup, done } = useSignup();
  return (
    <button
      id={id}
      type="button"
      className={`jb jb-${variant} hov-lift2 hov-btn-press${className ? ` ${className}` : ""}`}
      style={style}
      onClick={() => {
        onOpen?.();
        const hero = document.getElementById(HERO_SIGNUP_ID);
        if (hero && !done) {
          hero.scrollIntoView({ behavior: "smooth", block: "center" });
          window.setTimeout(() => hero.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true }), 350);
          return;
        }
        openSignup(placement);
      }}
    >
      {done ? "You're in ✓" : label}
    </button>
  );
}
