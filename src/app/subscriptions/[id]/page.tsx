import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Open this subscription in SubDrip", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Open this subscription in SubDrip" body="Review the charge, change the reminder, or see how to cancel — all inside the app." />;
}
