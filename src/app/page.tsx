import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FixesSection from "@/components/home/FixesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PrivacyStrip from "@/components/home/PrivacyStrip";
import FaqPreviewSection from "@/components/home/FaqPreviewSection";
import BetaBand from "@/components/home/BetaBand";
import StickyJoinBar from "@/components/signup/StickyJoinBar";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FixesSection />
      <HowItWorksSection />
      <PrivacyStrip />
      <FaqPreviewSection />
      <BetaBand />
      <StickyJoinBar />
    </main>
  );
}
