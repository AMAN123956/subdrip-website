import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PayoffSection from "@/components/home/PayoffSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PrivacySection from "@/components/home/PrivacySection";
import FaqPreviewSection from "@/components/home/FaqPreviewSection";
import BetaBand from "@/components/home/BetaBand";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <PayoffSection />
      <FeaturesSection />
      <PrivacySection />
      <FaqPreviewSection />
      <BetaBand />
    </main>
  );
}
