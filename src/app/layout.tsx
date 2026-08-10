import type { Metadata } from "next";
import { Sora, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/lib/currency";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    title: BRAND.name,
    description: BRAND.description,
    type: "website",
    siteName: BRAND.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${workSans.variable}`}>
        <CurrencyProvider>
          <div
            style={{
              minHeight: "100vh",
              background: "oklch(97% 0.012 80)",
              color: "oklch(22% 0.01 80)",
              overflowX: "hidden",
            }}
          >
            <Header />
            {children}
            <Footer />
          </div>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
