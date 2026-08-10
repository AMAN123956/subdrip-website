import type { Metadata } from "next";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: "Get early access",
  description:
    "The app is in private beta on iOS and Android. Join the list and we'll send your invite the day it opens.",
};

export default function DownloadPage() {
  return <DownloadContent />;
}
