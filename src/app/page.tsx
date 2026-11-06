import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import WhySection from "@/components/home/WhySection";
import WaysSection from "@/components/home/WaysSection";
import FeaturesBento from "@/components/home/FeaturesBento";
import PrivacyBand from "@/components/home/PrivacyBand";
import HomeFaq from "@/components/home/HomeFaq";
import BetaBand from "@/components/home/BetaBand";
import StickyJoinBar from "@/components/signup/StickyJoinBar";
import { BRAND } from "@/lib/brand";
import "@/components/home/home.css";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function HomePage() {
  // Sections live inside .hp (not directly under <main>) so the legacy
  // `main > section` gutter overrides in globals.css don't double the padding.
  return (
    <main className="hp-main">
      <div className="hp">
        <HeroSection />
        <ServicesStrip />
        <WhySection />
        <WaysSection />
        <FeaturesBento />
        <PrivacyBand />
        <HomeFaq />
        <BetaBand />
      </div>
      <StickyJoinBar />
    </main>
  );
}
