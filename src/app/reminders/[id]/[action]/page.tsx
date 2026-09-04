import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Manage this reminder in SubDrip", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Manage this reminder in SubDrip" body="Snooze or turn off a renewal reminder from the app — it takes one tap." />;
}
