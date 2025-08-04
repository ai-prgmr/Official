import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrassHeader from "./components/GrassHeader";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grass Venture",
  description: "Find your dream property in Madhya Pradesh",
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
