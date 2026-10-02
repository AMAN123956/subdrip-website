import type { Metadata } from "next";
import OpenInApp from "@/components/OpenInApp";

export const metadata: Metadata = { title: "Your bills live in the app", robots: { index: false } };

export default function Page() {
  return <OpenInApp title="Your bills live in the app" body="Rent, EMIs, utilities and every household payment — mark them paid and see what's due, inside SubDrip." />;
}
