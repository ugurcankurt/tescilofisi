"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { Upload, X, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export function ImageUpload({ value, onChange, label = "Öne Çıkan Görsel" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload")
  const [urlInput, setUrlInput] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Sadece JPEG, PNG, WebP ve GIF formatları desteklenmektedir.')
      return
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      setError('Dosya boyutu 5MB\'dan küçük olmalıdır.')
      return
    }

    setUploading(true)
    setError("")

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        setError('Dosya yüklemek için giriş yapmanız gerekiyor.')
        return
      }

      console.log('User authenticated:', user.email)
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `featured-images/${fileName}`

      console.log('Uploading file:', file.name, 'to path:', filePath)

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      console.log('Upload successful:', uploadData)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      console.log('File uploaded successfully:', filePath)
      console.log('Public URL:', publicUrl)

      onChange(publicUrl)
      setError("")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Yükleme sırasında bir hata oluştu'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (value && value.includes('supabase')) {
      // Extract file path from Supabase URL
      try {
        const url = new URL(value)
        const pathParts = url.pathname.split('/storage/v1/object/public/blog-images/')
        if (pathParts.length > 1) {
          const filePath = pathParts[1]
          await supabase.storage
            .from('blog-images')
            .remove([filePath])
        }
      } catch (err) {
        console.error('Error removing file from storage:', err)
      }
    }
    
    onChange("")
    setUrlInput("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setError("")
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* Method Selector */}
      <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
        <Button
          type="button"
          variant={uploadMethod === "upload" ? "default" : "ghost"}
          size="sm"
          className="flex-1"
          onClick={() => setUploadMethod("upload")}
        >
          <Upload className="mr-2 h-4 w-4" />
          Dosya Yükle
        </Button>
        <Button
          type="button"
          variant={uploadMethod === "url" ? "default" : "ghost"}
          size="sm"
          className="flex-1"
          onClick={() => setUploadMethod("url")}
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          URL Gir
        </Button>
      </div>

      {/* Upload Method */}
      {uploadMethod === "upload" && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              disabled={uploading}
              className="flex-1"
            />
            {uploading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
          <p className="text-xs text-gray-500">
            JPEG, PNG, WebP, GIF • Maksimum 5MB
          </p>
        </div>
      )}

      {/* URL Method */}
      {uploadMethod === "url" && (
        <div className="flex space-x-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
          >
            Kullan
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
            <img
              src={value}
              alt="Öne çıkan görsel önizleme"
              className="w-full h-48 object-cover rounded-lg"
              onError={() => setError("Görsel yüklenemedi. Lütfen geçerli bir URL girin.")}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-6 right-6"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 break-all">
            <ImageIcon className="inline mr-1 h-3 w-3" />
            {value}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Görsel yükleniyor...</span>
        </div>
      )}
    </div>
  )
}