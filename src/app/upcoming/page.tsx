import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "What's coming up lives in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="What's coming up lives in the app" body="Every bill and renewal due in the next weeks, in one timeline, inside SubDrip." />;
}
