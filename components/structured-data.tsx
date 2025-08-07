interface BlogPost {
  title: string
  slug: string
  author: string
  published_at?: string
  created_at: string
}

interface StructuredDataProps {
  type: 'organization' | 'service' | 'article' | 'faq' | 'blog' | 'blogPosting'
  data?: {
    posts?: BlogPost[]
  }
}

export function StructuredData({ type, data }: StructuredDataProps) {
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

      case 'blog':
        const blogData: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Marka Tescil ve Patent Blog - Tescilofisi",
          "description": "Marka tescil işlemleri, patent başvurusu ve fikri mülkiyet konularında güncel bilgiler, rehberler ve uzman görüşleri.",
          "url": "https://tescilofisi.com/blog",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://tescilofisi.com/blog"
          },
          "publisher": {
            "@type": "Organization",
            "@name": "Tescilofisi",
            "@url": "https://tescilofisi.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tescilofisi.com/logo/logo.png",
              "width": 512,
              "height": 512
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+90-212-909-2657",
              "contactType": "customer service",
              "availableLanguage": "Turkish"
            }
          },
          "inLanguage": "tr-TR",
          "keywords": ["marka tescil", "patent başvurusu", "fikri mülkiyet", "marka patent", "tescil rehberi"],
          "about": {
            "@type": "Thing",
            "name": "Marka Tescil ve Patent Başvurusu",
            "sameAs": [
              "https://www.turkpatent.gov.tr/",
              "https://tescilofisi.com/hizmetler"
            ]
          }
        }
        
        // Add blog posts if provided
        if (data?.posts && Array.isArray(data.posts)) {
          blogData["blogPost"] = data.posts.map((post: BlogPost) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "url": `https://tescilofisi.com/blog/${post.slug}`,
            "datePublished": post.published_at || post.created_at,
            "author": {
              "@type": "Organization",
              "name": post.author
            }
          }))
        }
        
        return blogData

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Marka Tescil ve Patent Makaleleri",
          "description": "Fikri mülkiyet konularında güncel makaleler ve rehberler",
          "author": {
            "@type": "Organization",
            "name": "Tescilofisi",
            "url": "https://tescilofisi.com/hakkimizda"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Tescilofisi",
            "url": "https://tescilofisi.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://tescilofisi.com/logo/logo.png",
              "width": 512,
              "height": 512
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://tescilofisi.com/blog"
          },
          "inLanguage": "tr-TR"
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