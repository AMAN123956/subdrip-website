import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your account settings live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your account settings live in the app" body="Profile, notifications, privacy and connected sources are all managed inside SubDrip." />;
}
