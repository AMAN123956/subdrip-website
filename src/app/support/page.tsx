import type { Metadata } from "next";
import SupportContent from "./SupportContent";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Tell us what's happening and we'll help. Never send passwords, bank credentials, or full card numbers.",
};

export default function SupportPage() {
  return <SupportContent />;
}
