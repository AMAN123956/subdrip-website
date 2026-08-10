import type { Metadata } from "next";
import HowItWorksContent from "./HowItWorksContent";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From scattered billing signals to clear decisions. Three steps, and you keep control at every one of them. Nothing is imported without your review.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
