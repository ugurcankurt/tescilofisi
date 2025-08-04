import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marka Tescil ve Patent Blog | Tescilofisi",
  description: "Marka tescil işlemleri, patent başvurusu ve fikri mülkiyet konularında güncel bilgiler, rehberler ve uzman görüşleri. En güncel marka patent bilgileri için blogumuzu takip edin.",
  keywords: "marka tescil blog, patent başvurusu rehberi, fikri mülkiyet makaleleri, marka patent güncel bilgiler, tescil süreçleri, patent koruma stratejileri",
  openGraph: {
    title: "Marka Tescil ve Patent Blog | Tescilofisi",
    description: "Marka tescil işlemleri, patent başvurusu ve fikri mülkiyet konularında güncel bilgiler ve uzman rehberleri.",
    type: "website",
    url: "https://tescilofisi.com/blog",
    siteName: "Tescilofisi",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marka Tescil ve Patent Blog | Tescilofisi",
    description: "Marka tescil işlemleri, patent başvurusu ve fikri mülkiyet konularında güncel bilgiler.",
  },
  alternates: {
    canonical: "https://tescilofisi.com/blog",
  }
}
import { 
  Calendar,
  User,
  ArrowRight,
  Scale
} from "lucide-react"

export default async function BlogPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const posts = blogPosts || []
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} dk`
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <StructuredData type="article" />
      <div className="font-sans">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Marka Patent Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Marka Tescil</span> ve <span className="text-blue-600">Patent</span> Rehberleri
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>Marka tescil işlemleri</strong>, <strong>patent başvurusu</strong> ve fikri mülkiyet 
              konularında güncel bilgiler, rehberler ve uzman görüşleri.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Öne Çıkan Makale</h2>
                <div className="w-20 h-1 bg-blue-600"></div>
              </div>
              
              <Card className="overflow-hidden hover:shadow-lg transition-shadow mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    {featuredPost.featured_image ? (
                      <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
                        <Image
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Badge variant="secondary" className="mb-2">
                              {featuredPost.category}
                            </Badge>
                            <p className="text-sm">{calculateReadTime(featuredPost.content)} okuma</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Scale className="h-10 w-10 text-white" />
                          </div>
                          <Badge variant="secondary" className="mb-2">
                            {featuredPost.category}
                          </Badge>
                          <p className="text-sm text-gray-600">{calculateReadTime(featuredPost.content)} okuma</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Makaleyi Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tüm Makaleler</h2>
              <div className="w-20 h-1 bg-blue-600"></div>
            </div>

            {otherPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    {post.featured_image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="text-xs bg-white/90">
                            {calculateReadTime(post.content)}
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardHeader className={post.featured_image ? "pb-2" : ""}>
                      {!post.featured_image && (
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{calculateReadTime(post.content)}</span>
                        </div>
                      )}
                      <CardTitle className="text-lg leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={`/blog/${post.slug}`}>
                          Devamını Oku
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Henüz blog yazısı yayınlanmamış.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}