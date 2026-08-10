import type { Metadata } from "next";
import DemoContent from "./DemoContent";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "Use the real app, end to end — sign in, connect a source, review what it finds, add a service from the catalog, set a reminder, and walk the savings recap.",
};

export default function DemoPage() {
  return <DemoContent />;
}
