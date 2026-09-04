import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your renewals live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your renewals live in the app" body="The renewals timeline, reminder coverage and every upcoming charge are in SubDrip." />;
}
