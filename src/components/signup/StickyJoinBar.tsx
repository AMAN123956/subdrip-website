"use client";

import { useEffect, useState } from "react";
import JoinBetaButton, { HERO_SIGNUP_ID } from "@/components/signup/JoinBetaButton";
import { useSignup } from "@/components/signup/SignupProvider";

/**
 * Phone-only bottom bar (CSS hides it above 560px). Appears once the hero
 * signup form scrolls out of view, hides again after signup.
 */
export default function StickyJoinBar() {
  const { done, isOpen } = useSignup();
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(HERO_SIGNUP_ID);
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const show = !heroVisible && !done && !isOpen;
  return (
    <div className="sticky-join" data-show={show ? "1" : "0"} aria-hidden={!show} inert={!show}>
      <span>
        <b>Android beta open</b>
        Free · takes 10 seconds
      </span>
      <JoinBetaButton placement="sticky" />
    </div>
  );
}
