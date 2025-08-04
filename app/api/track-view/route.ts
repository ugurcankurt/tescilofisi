import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    // Use service role key for server-side operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    // First get current view count
    const { data: currentPost, error: selectError } = await supabase
      .from('blog_posts')
      .select('view_count')
      .eq('id', postId)
      .eq('published', true)
      .single()
    
    if (selectError) {
      console.error('Error fetching current post:', selectError)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Increment view count
    const newViewCount = (currentPost.view_count || 0) + 1
    
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ 
        view_count: newViewCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .eq('published', true)
    
    if (updateError) {
      console.error('Error updating view count:', updateError)
      return NextResponse.json({ error: 'Failed to update view count' }, { status: 500 })
    }

    console.log(`View count updated for post ${postId}: ${newViewCount}`)
    return NextResponse.json({ success: true, viewCount: newViewCount })
    
  } catch (error) {
    console.error('Error in track-view API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}