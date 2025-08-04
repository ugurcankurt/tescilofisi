"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { ImageUpload } from "@/components/admin/image-upload"
import { supabase } from "@/lib/supabase"
import { Save, Eye, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const categories = [
  "Marka Tescil",
  "Patent Başvurusu", 
  "Tasarım Tescili",
  "Fikri Mülkiyet Hukuku",
  "Uluslararası Tescil",
  "Strateji",
  "Genel"
]

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Tescilofisi Uzmanları",
    category: "",
    tags: "",
    featured_image: "",
    published: false,
    seo_title: "",
    seo_description: ""
  })

  // Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', postId)
          .single()

        if (error) {
          throw error
        }

        if (!data) {
          setError("Blog yazısı bulunamadı.")
          return
        }

        // Convert data to form format
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          author: data.author || "Tescilofisi Uzmanları",
          category: data.category || "",
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
          featured_image: data.featured_image || "",
          published: data.published || false,
          seo_title: data.seo_title || "",
          seo_description: data.seo_description || ""
        })

      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Blog yazısı yüklenemedi"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      loadPost()
    }
  }, [postId])

  // Auto generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo_title: title || ""
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        published: !isDraft && formData.published,
        published_at: (!isDraft && formData.published) ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', postId)

      if (error) {
        throw error
      }

      setSuccess(isDraft ? "Taslak kaydedildi!" : "Blog yazısı başarıyla güncellendi!")
      
      setTimeout(() => {
        router.push('/admin/posts')
      }, 1500)

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Blog yazısı yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="outline" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog Yazısını Düzenle</h1>
          <p className="mt-1 text-sm text-gray-600">
            Mevcut blog yazısını düzenleyin
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>İçerik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Blog yazısının başlığı"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-slug-ornegi"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Özet</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Blog yazısının kısa özeti"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>İçerik *</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Blog yazısının içeriğini buraya yazın..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">SEO Başlığı</Label>
                  <Input
                    id="seo_title"
                    value={formData.seo_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                    placeholder="Arama motorları için optimize edilmiş başlık"
                  />
                </div>

                <div>
                  <Label htmlFor="seo_description">SEO Açıklaması</Label>
                  <Textarea
                    id="seo_description"
                    value={formData.seo_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                    placeholder="Arama motorları için açıklama (160 karakter önerilir)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yayın Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Yazar</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Etiketler</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="etiket1, etiket2, etiket3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Etiketleri virgülle ayırın
                  </p>
                </div>

                <ImageUpload
                  value={formData.featured_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                  label="Öne Çıkan Görsel"
                  placeholder="Görsel yükleyin veya URL girin"
                />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Yayınlı</Label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={saving || !formData.title || !formData.category}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {formData.published ? "Güncelle ve Yayınla" : "Güncelle"}
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={saving || !formData.title || !formData.category}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Taslak Olarak Kaydet
                  </Button>

                  {formData.published && (
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href={`/blog/${formData.slug}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Yazıyı Görüntüle
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  )
}