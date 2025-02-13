import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { kiona, ttNorms } from "./fonts";
import { Header } from "@/components/ui/Header";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${kiona.variable} 
          ${ttNorms.variable} 
          antialiased
        `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
