interface StructuredDataProps {
  type: 'organization' | 'service' | 'article' | 'faq'
  data?: Record<string, unknown>
}

export function StructuredData({ type }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tescilofisi",
          "alternateName": "Tescilofisi Marka Patent Danışmanlık",
          "url": "https://tescilofisi.com",
          "logo": "https://tescilofisi.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-212-555-0123",
            "contactType": "customer service",
            "availableLanguage": "Turkish",
            "areaServed": "TR"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Maslak Mahallesi Büyükdere Caddesi No: 123",
            "addressLocality": "Sarıyer",
            "addressRegion": "İstanbul",
            "addressCountry": "TR"
          },
          "sameAs": [
            "https://www.linkedin.com/company/tescilofisi",
            "https://twitter.com/tescilofisi"
          ],
          "description": "Türkiye'de marka tescil, patent başvurusu ve fikri mülkiyet danışmanlığı alanında uzman hizmetler sunuyoruz."
        }

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Marka Tescil ve Patent Başvuru Hizmetleri",
          "description": "Profesyonel marka tescil işlemleri, patent başvurusu ve fikri mülkiyet danışmanlığı hizmetleri",
          "provider": {
            "@type": "Organization",
            "name": "Tescilofisi"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Turkey"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Marka Patent Hizmetleri",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Marka Tescil İşlemleri",
                  "description": "Ulusal ve uluslararası marka tescil başvuruları"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Patent Başvuru Hizmetleri",
                  "description": "Patent başvurusu ve PCT başvuruları"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tasarım Tescili",
                  "description": "Endüstriyel tasarım tescil işlemleri"
                }
              }
            ]
          }
        }

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Marka tescil süreci ne kadar sürer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Marka tescil süreci genellikle 6-12 ay arasında tamamlanır. İtiraz süreci ve inceleme detaylarına göre süre değişebilir."
              }
            },
            {
              "@type": "Question",
              "name": "Patent başvurusu maliyeti nedir?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Patent maliyetleri başvuru türüne göre değişir. Ücretsiz danışmanlık ile size özel fiyat teklifi sunuyoruz."
              }
            },
            {
              "@type": "Question",
              "name": "Uluslararası marka tescil yapabiliyor musunuz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Evet, 150+ ülkede marka ve patent başvurusu yapabiliyoruz. Madrid Sistemi ve PCT başvuruları da hizmetlerimiz arasındadır."
              }
            }
          ]
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}