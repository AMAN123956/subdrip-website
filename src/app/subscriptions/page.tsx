import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your subscriptions live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your subscriptions live in the app" body="Every subscription you track, with renewal dates, prices and reminders — all in SubDrip." />;
}
