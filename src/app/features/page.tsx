import type { Metadata } from "next";
import FeaturesContent from "./FeaturesContent";

export const metadata: Metadata = {
  title: "Features",
  description:
    "See the features that turn recurring charges into a clearer plan. Organised by the problem it solves, not by the module it lives in.",
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
