import { createServerSupabaseClient } from '@/lib/supabase'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerSupabaseClient()
  
  // Get all published blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  // Base URLs
  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://tescilofisi.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://tescilofisi.com/hizmetler',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://tescilofisi.com/iletisim',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://tescilofisi.com/hakkimizda',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://tescilofisi.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Blog post URLs
  const blogUrls: MetadataRoute.Sitemap = (blogPosts || []).map((post) => ({
    url: `https://tescilofisi.com/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...baseUrls, ...blogUrls]
}