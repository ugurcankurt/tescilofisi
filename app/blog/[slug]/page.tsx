import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ViewTracker } from "@/components/view-tracker"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { BlogPost } from "@/lib/supabase"
import type { Metadata } from "next"
import { 
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  CheckCircle
} from "lucide-react"
import { notFound } from "next/navigation"

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: article } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) {
    return {
      title: 'Blog Yazısı Bulunamadı | Tescilofisi',
      description: 'Aradığınız blog yazısı bulunamadı.',
    }
  }

  const title = article.seo_title || article.title
  const description = article.seo_description || article.excerpt || 'Marka tescil ve patent başvurusu konularında uzman görüşleri.'

  return {
    title: `${title} | Tescilofisi`,
    description,
    keywords: article.tags?.join(', ') || 'marka tescil, patent başvurusu, fikri mülkiyet',
    authors: [{ name: article.author }],
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      url: `https://tescilofisi.com/blog/${slug}`,
      siteName: 'Tescilofisi',
      locale: 'tr_TR',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at,
      authors: [article.author],
      tags: article.tags || [],
      images: article.featured_image ? [{
        url: article.featured_image,
        width: 1200,
        height: 630,
        alt: article.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: article.featured_image ? [article.featured_image] : [],
    },
    alternates: {
      canonical: `https://tescilofisi.com/blog/${slug}`,
    }
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: article } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (!article) {
    notFound()
  }

  // Fetch related articles
  const { data: relatedArticles } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, category, published_at, created_at')
    .eq('published', true)
    .eq('category', article.category)
    .neq('id', article.id)
    .limit(3)

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} dk`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt || "",
    "image": article.featured_image ? {
      "@type": "ImageObject",
      "url": article.featured_image,
      "width": 1200,
      "height": 630,
      "caption": article.title
    } : {
      "@type": "ImageObject",
      "url": "https://tescilofisi.com/logo/logo.png",
      "width": 512,
      "height": 512
    },
    "author": {
      "@type": "Organization",
      "name": article.author,
      "url": "https://tescilofisi.com/hakkimizda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tescilofisi.com/logo/logo.png"
      }
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
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-212-909-2657",
        "contactType": "customer service",
        "availableLanguage": "Turkish"
      }
    },
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tescilofisi.com/blog/${slug}`
    },
    "url": `https://tescilofisi.com/blog/${slug}`,
    "keywords": article.tags?.join(", ") || "marka tescil, patent başvurusu, fikri mülkiyet",
    "articleSection": article.category,
    "articleBody": article.content.replace(/<[^>]*>/g, ''),
    "wordCount": article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    "timeRequired": `PT${Math.ceil(article.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)}M`,
    "inLanguage": "tr-TR",
    "isAccessibleForFree": true,
    "genre": "Fikri Mülkiyet Danışmanlık",
    "audience": {
      "@type": "Audience",
      "audienceType": "Girişimciler, Şirket sahipleri, mücitler"
    },
    "about": {
      "@type": "Thing",
      "name": "Marka Tescil ve Patent Başvurusu",
      "description": "Fikri mülkiyet haklarının korunması",
      "sameAs": [
        "https://www.turkpatent.gov.tr/",
        "https://tescilofisi.com/hizmetler"
      ]
    },
    "mentions": [
      {
        "@type": "Organization",
        "name": "TURKPATENT",
        "url": "https://www.turkpatent.gov.tr/"
      }
    ],
    "isPartOf": {
      "@type": "Blog",
      "name": "Tescilofisi Blog",
      "url": "https://tescilofisi.com/blog"
    }
  }

  return (
    <>
      <ViewTracker postId={article.id} slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="font-sans">
        {/* Article Header */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Blog&apos;a Dön
                </Link>
              </Button>
            </div>
            
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{calculateReadTime(article.content)} okuma</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Paylaş
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {article.featured_image && (
          <section className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  width={1200}
                  height={630}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
                
                {/* Article Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Etiketler</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Card className="mt-12 bg-blue-50 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Marka Tescil Konusunda Yardıma İhtiyacınız Var mı?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Uzman ekibimizle <strong>marka tescil</strong> sürecinizi 
                      başarıyla tamamlayın. Ücretsiz danışmanlık için iletişime geçin.
                    </p>
                    <Button size="lg" asChild>
                      <Link href="/iletisim">
                        Ücretsiz Danışmanlık Alın
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Table of Contents - simplified for dynamic content */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Bu Makalede</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Konuyla ilgili temel bilgiler</p>
                        <p>• Adım adım süreç rehberi</p>
                        <p>• Önemli noktalar ve ipuçları</p>
                        <p>• Sonuç ve öneriler</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Services */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">İlgili Hizmetler</h3>
                      <div className="space-y-3">
                        <Link href="/hizmetler#marka-tescili" className="block text-sm text-gray-600 hover:text-blue-600">
                          <CheckCircle className="inline h-3 w-3 mr-2 text-green-600" />
                          Marka Tescil Hizmeti
                        </Link>
                        <Link href="/hizmetler#patent-basvurusu" className="block text-sm text-gray-600 hover:text-blue-600">
                          <CheckCircle className="inline h-3 w-3 mr-2 text-green-600" />
                          Patent Başvuru Hizmeti
                        </Link>
                        <Link href="/hizmetler#fikri-mulkiyet" className="block text-sm text-gray-600 hover:text-blue-600">
                          <CheckCircle className="inline h-3 w-3 mr-2 text-green-600" />
                          Fikri Mülkiyet Danışmanlığı
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact CTA */}
                  <Card className="bg-blue-600 text-white">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold mb-2">Hemen Başlayın</h3>
                      <p className="text-blue-100 text-sm mb-4">
                        Ücretsiz danışmanlık için iletişime geçin
                      </p>
                      <Button variant="secondary" size="sm" asChild className="w-full">
                        <Link href="/iletisim">
                          İletişime Geç
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                İlgili Makaleler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-2">{relatedArticle.category}</Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedArticle.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {relatedArticle.excerpt}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${relatedArticle.slug}`}>
                          Oku
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}