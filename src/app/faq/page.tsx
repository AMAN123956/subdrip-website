import type { Metadata } from "next";
import FaqContent from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions, answered. Product, sources, privacy, behavior, and support — with plain-language answers.",
};

export default function FaqPage() {
  return <FaqContent />;
}
