"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { BlogPost } from "@/lib/supabase"

export default function BlogPostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPosts = useCallback(() => {
    let filtered = [...posts]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(post => 
        statusFilter === "published" ? post.published : !post.published
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter)
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, statusFilter, categoryFilter])

  useEffect(() => {
    filterPosts()
  }, [filterPosts])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }


  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" adlı yazıyı silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPosts(posts.filter(post => post.id !== id))
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    }
  }

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) throw error

      setPosts(posts.map(post => 
        post.id === id 
          ? { ...post, published: !currentStatus, published_at: !currentStatus ? new Date().toISOString() : null }
          : post
      ))
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    }
  }

  const categories = [...new Set(posts.map(post => post.category))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog Yazıları</h1>
          <p className="mt-1 text-sm text-gray-600">
            Tüm blog yazılarınızı yönetin
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Yazı
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Yazı ara..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Yazılar</SelectItem>
                <SelectItem value="published">Yayınlanan</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4 flex-1">
                  {post.featured_image && (
                    <div className="flex-shrink-0">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {post.title}
                      </h3>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Yayınlandı" : "Taslak"}
                      </Badge>
                    </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </span>
                      <Badge variant="outline">{post.category}</Badge>
                      <span>Yazar: {post.author}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {post.published && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublished(post.id, post.published)}
                  >
                    {post.published ? "Yayından Kaldır" : "Yayınla"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Arama kriterlerinize uygun yazı bulunamadı."
                  : "Henüz blog yazısı yok."}
              </p>
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  İlk Yazınızı Oluşturun
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
      {posts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                <div className="text-sm text-gray-500">Toplam Yazı</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {posts.filter(p => p.published).length}
                </div>
                <div className="text-sm text-gray-500">Yayınlanan</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {posts.filter(p => !p.published).length}
                </div>
                <div className="text-sm text-gray-500">Taslak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-sm text-gray-500">Kategori</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}