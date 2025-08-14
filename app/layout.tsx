import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrassHeader from "./components/GrassHeader";
import Footer from "./components/Footer";
import SocialMediaButtons from "./components/WhatsAppButton";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Grass Venture | Real Estate & Properties for Sale in Indore, Ujjain, Dewas, Madhya Pradesh",
  description:
    "Find your dream property in Madhya Pradesh with Grass Venture. We offer a wide selection of residential, commercial, and agricultural land in Indore, Ujjain & Dewas. Your property search ends here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <GrassHeader />
        {/* Adjust height to match your header */}
        <div className="headerSpacer"></div>
        {children}
        <Footer />
        <SocialMediaButtons />
      </body>
    </html>
  );
}
