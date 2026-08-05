import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { PageScroll } from "@/components/layout/PageScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Everything Bros | Premium Home Services in Edmonds & Lynnwood, WA",
  description:
    "Professional exterior cleaning and home services for homeowners in Edmonds, Lynnwood, and Mountlake Terrace. Window cleaning, pressure washing, gutter cleaning, junk removal, and more. Free quotes.",
  keywords: [
    "pressure washing Edmonds",
    "window cleaning Lynnwood",
    "gutter cleaning Snohomish County",
    "home services Washington",
    "Everything Bros",
  ],
  openGraph: {
    title: "Everything Bros | Premium Home Services",
    description:
      "Professional exterior cleaning and home services for homeowners in Edmonds, Lynnwood, and surrounding areas. Free quotes.",
    type: "website",
    locale: "en_US",
    siteName: "Everything Bros",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everything Bros | Premium Home Services",
    description:
      "Professional exterior cleaning and home services in Edmonds & Lynnwood, WA. Free quotes.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full font-sans">
        <Header />
        <PageScroll>{children}</PageScroll>
        <Analytics />
      </body>
    </html>
  );
}
