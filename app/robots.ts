import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/hizmetler',
          '/iletisim', 
          '/hakkimizda',
          '/blog',
          '/blog/*',
          '/images/',
          '/logo/',
          '/*.jpg',
          '/*.jpeg',
          '/*.png',
          '/*.svg',
          '/*.webp'
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/',
          '/api/*',
          '/_next/',
          '/private',
          '/temp',
          '/*.json$'
        ],
      },
      // Özel arama motoru botları için kurallar
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: [
          '/',
          '/hizmetler',
          '/iletisim',
          '/hakkimizda', 
          '/blog',
          '/blog/*'
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/',
          '/api/*'
        ],
        crawlDelay: 1
      }
    ],
    sitemap: 'https://tescilofisi.com/sitemap.xml',
    host: 'https://tescilofisi.com'
  }
}