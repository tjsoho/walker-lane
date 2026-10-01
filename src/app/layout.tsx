import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { kiona, ttNorms } from "./fonts";
import { Header } from "@/components/ui/Header";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { Toaster } from 'react-hot-toast';
import { SITE_URL } from "@/lib/siteUrl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const defaultDescription =
  "Walker Lane is a Sydney-based financial planning and wealth management firm, empowering clients to build wealth with confidence through personalised guidance and expert solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Walker Lane | Financial Planning & Wealth Management Sydney",
    template: "%s | Walker Lane",
  },
  description: defaultDescription,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Walker Lane | Financial Planning & Wealth Management Sydney",
    description: defaultDescription,
    url: "./",
    siteName: "Walker Lane",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/Group_01.jpg",
        width: 1200,
        height: 630,
        alt: "The Walker Lane team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walker Lane | Financial Planning & Wealth Management Sydney",
    description: defaultDescription,
    images: ["/images/Group_01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured data for search engines and AI assistants
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Walker Lane",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 18, Suite 18.03, 1 Margaret Street",
    addressLocality: "Sydney",
    addressRegion: "NSW",
    postalCode: "2000",
    addressCountry: "AU",
  },
  areaServed: "AU",
  sameAs: ["https://www.linkedin.com/company/walker-lane/"],
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
          ${inter.variable} 
          antialiased
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationJsonLd),
          }}
        />
        <Header />
        {children}
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
