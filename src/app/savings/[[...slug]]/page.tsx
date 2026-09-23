import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your savings ideas live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your savings ideas live in the app" body="Savings ideas picked from your own subscriptions, plus the wins you've already made — all in SubDrip." />;
}
