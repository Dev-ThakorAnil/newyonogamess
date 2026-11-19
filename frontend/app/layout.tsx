import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "NewYonoGamess – All Yono Apps & Games 2026 | Free APK Download",
    template: "%s | NewYonoGamess",
  },
  description:
    "NewYonoGamess is India's most trusted directory of All Yono and Rummy gaming apps. Download verified APKs with instant signup bonus, RNG certification, and fast UPI withdrawals.",
  keywords: [
    "NewYonoGamess",
    "All Yono Games",
    "All Yono Apps",
    "All Yono Bonus",
    "Yono Rummy",
    "Yono Slots Games",
    "Yono App List",
    "Latest Yono Games 2026",
    "Yono 777",
    "Win Rummy",
    "OK Rummy Yono",
    "Diwa Games",
    "Diwa Rummy",
    "Rummy APK Download",
    "Instant UPI Withdrawal Games",
    "RNG Certified Rummy Apps",
    "Indian Cash Games APK",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "NewYonoGamess",
    title: "NewYonoGamess – All Yono Apps & Games 2026 | Free APK Download",
    description: "Download verified All Yono games, Diwa apps, Rummy and Slots APKs. Safe, fast downloads with signup bonuses and instant UPI withdrawals.",
    images: [{ url: "/logo1.png", width: 500, height: 500, alt: "NewYonoGamess Logo" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
