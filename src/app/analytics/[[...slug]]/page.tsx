import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your spend analytics live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your spend analytics live in the app" body="Where your money goes by category, month and service — all in SubDrip." />;
}
