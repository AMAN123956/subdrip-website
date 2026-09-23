import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your monthly recap lives in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your monthly recap lives in the app" body="See where your subscriptions went last month — a 30-second story, inside SubDrip." />;
}
