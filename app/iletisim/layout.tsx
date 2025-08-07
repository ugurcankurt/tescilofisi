import { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim - Ücretsiz Marka Tescil Danışmanlığı | Tescilofisi",
  description: "Marka tescil ve patent başvurusu için ücretsiz danışmanlık alın. Telefon: 0(212) 909 2657, Email: info@tescilofisi.com. İstanbul, Türkiye merkezli uzman ekibimizle iletişime geçin.",
  keywords: "tescilofisi iletişim, marka tescil danışmanlık, patent başvuru danışmanlık, ücretsiz marka danışmanlığı, istanbul marka tescil, telefon iletişim",
  openGraph: {
    title: "İletişim - Ücretsiz Marka Tescil Danışmanlığı | Tescilofisi",
    description: "Marka tescil ve patent başvurusu için ücretsiz danışmanlık alın. İstanbul merkezli uzman ekibimizle iletişime geçin.",
    url: "https://tescilofisi.com/iletisim",
    type: "website",
  },
  alternates: {
    canonical: "https://tescilofisi.com/iletisim",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}