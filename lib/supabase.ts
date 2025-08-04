import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

// Client-side Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side Supabase client
export async function createServerSupabaseClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Database Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured_image?: string
  published: boolean
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
  published_at?: string | null
}

export interface ContactForm {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'read' | 'replied' | 'closed'
  created_at: string
  updated_at: string
}