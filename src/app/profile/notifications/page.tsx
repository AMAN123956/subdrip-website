import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Notification settings are in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Notification settings are in the app" body="Choose which reminders, price alerts and summaries reach you from SubDrip's notification settings." />;
}
