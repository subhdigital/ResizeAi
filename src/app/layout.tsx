import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://resizely.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Resize AI - Professional Image Tools",
    template: "%s | Resize AI"
  },
  description: "Professional AI-powered image optimization platform. Compress JPG, PNG, convert to WebP/AVIF, remove backgrounds, and resize for Instagram, LinkedIn, and web.",
  keywords: ["image compression", "image optimizer", "webp converter", "background removal", "resize images", "instagram image size"],
  authors: [{ name: "Resize AI Team", url: baseUrl }],
  creator: "Resize AI",
  publisher: "Resize AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Resize AI - Professional Image Tools",
    description: "Professional AI-powered image optimization platform. Compress JPG, PNG, convert to WebP/AVIF, remove backgrounds, and resize for Instagram, LinkedIn, and web.",
    url: baseUrl,
    siteName: "Resize AI",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resize AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize AI - Professional Image Tools",
    description: "Professional AI-powered image optimization platform. Compress JPG, PNG, convert to WebP/AVIF, remove backgrounds, and resize for Instagram, LinkedIn, and web.",
    images: ["/images/og-image.jpg"],
    creator: "@resizeai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Resizely",
  },
  verification: {
    google: "add-your-google-site-verification-here",
  },
};

export const viewport: Viewport = {
  themeColor: "#00d4ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import Analytics from "@/components/common/Analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <Analytics />
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Resize AI",
                "url": "https://resizely.com",
                "logo": "https://resizely.com/icons/icon-192x192.png",
                "sameAs": [
                  "https://twitter.com/resizeai",
                  "https://www.linkedin.com/company/resizeai"
                ]
              })
            }}
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Resize AI",
                "url": "https://resizely.com",
                "description": "Professional AI-powered image optimization platform.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://resizely.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
