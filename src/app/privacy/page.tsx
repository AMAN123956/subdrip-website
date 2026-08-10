import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy & security",
  description:
    "Clear visibility starts with clear data practices. How source connections work, what the app accesses, and how to remove everything.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
