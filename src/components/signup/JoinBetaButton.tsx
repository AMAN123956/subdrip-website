"use client";

import type { CSSProperties } from "react";
import { useSignup } from "@/components/signup/SignupProvider";

/**
 * Every "Join the beta" entry point. After a signup it reads "You're in ✓"
 * and reopens the install steps instead of a fresh form.
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
        openSignup(placement);
      }}
    >
      {done ? "You're in ✓" : label}
    </button>
  );
}
