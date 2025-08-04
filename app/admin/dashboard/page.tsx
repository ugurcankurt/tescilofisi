"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Eye, 
  Calendar,
  TrendingUp
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  })
  const [recentPosts, setRecentPosts] = useState<{
    id: string
    title: string
    slug: string
    published: boolean
    created_at: string
    category: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch posts statistics including view counts
      const { data: allPosts } = await supabase
        .from('blog_posts')
        .select('id, published, view_count')

      const { data: recentPostsData } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published, created_at, category, view_count')
        .order('created_at', { ascending: false })
        .limit(5)

      if (allPosts) {
        const published = allPosts.filter(post => post.published).length
        const drafts = allPosts.filter(post => !post.published).length
        
        // Calculate total views from all posts
        const totalViews = allPosts.reduce((sum, post) => {
          return sum + (post.view_count || 0)
        }, 0)
        
        setStats({
          totalPosts: allPosts.length,
          publishedPosts: published,
          draftPosts: drafts,
          totalViews: totalViews
        })
      }

      if (recentPostsData) {
        setRecentPosts(recentPostsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Tescilofisi blog yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Yazı
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalPosts}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Yayınlanan
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.publishedPosts}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Taslak
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.draftPosts}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Toplam Görüntülenme
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Son Blog Yazıları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
                <div>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Yayınlandı" : "Taslak"}
                  </Badge>
                </div>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Henüz blog yazısı yok. İlk yazınızı oluşturun!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}