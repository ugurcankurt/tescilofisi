import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleSearchConsole } from "@/components/analytics/google-search-console";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tescilofisi.com'),
  title: "Marka Tescil ve Patent Başvurusu | Tescilofisi - Türkiye'nin Güvenilir Marka Patent Danışmanı",
  description: "⭐ Marka tescil işlemleri, patent başvurusu ve fikri mülkiyet danışmanlığı. ✓ Hızlı süreç ✓ Uygun fiyat ✓ %98 başarı oranı. Marka patent uzmanları ile çalışın!",
  keywords: "marka tescil, marka tescili, patent başvurusu, marka patent, fikri mülkiyet, patent danışmanlığı, marka danışmanlığı, turkpatent, patent vekili, marka araştırması, patent araştırması, istanbul marka tescil, türkiye patent, marka koruma, patent koruma, endüstriyel tasarım, faydalı model, trademark registration turkey, tescilofisi",
  authors: [{ name: "Tescilofisi" }],
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
  openGraph: {
    title: "Marka Tescil ve Patent Başvurusu | Tescilofisi",
    description: "Türkiye'de marka tescil işlemleri ve patent başvurusu için güvenilir danışmanlık. Hızlı süreç, uygun fiyat, yüksek başarı oranı.",
    type: "website",
    locale: "tr_TR",
    url: "https://tescilofisi.com",
    siteName: "Tescilofisi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tescilofisi - Marka Tescil ve Patent Başvurusu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marka Tescil ve Patent Başvurusu | Tescilofisi",
    description: "Türkiye'de marka tescil işlemleri ve patent başvurusu için güvenilir danışmanlık.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tescilofisi.com",
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <StructuredData type="organization" />
        <GoogleSearchConsole verificationCode={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE || ""} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton 
          phoneNumber="902129092657"
          message="Merhaba! Marka tescil ve patent başvurusu hakkında bilgi almak istiyorum."
        />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
      </body>
    </html>
  );
}
