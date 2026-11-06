import type { Metadata } from "next";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: "Join the beta",
  description:
    "The SubDrip Android beta is open on Google Play and free. iPhone users can join the waitlist.",
};

export default function DownloadPage() {
  return <DownloadContent />;
}
