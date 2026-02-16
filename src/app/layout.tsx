import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resize AI - Professional Image Tools",
  description: "Professional AI-powered image optimization platform. Compress JPG, PNG, convert to WebP/AVIF, remove backgrounds, and resize for Instagram, LinkedIn, and web.",
  keywords: "image compression, image optimizer, webp converter, background removal, resize images, instagram image size",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
