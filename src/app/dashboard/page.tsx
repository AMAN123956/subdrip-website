import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your dashboard lives in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your dashboard lives in the app" body="Monthly spend, upcoming renewals and anything that needs a look — all in SubDrip." />;
}
