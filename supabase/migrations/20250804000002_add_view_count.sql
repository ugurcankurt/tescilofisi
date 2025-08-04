-- Add view_count column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN view_count INTEGER DEFAULT 0;

-- Create index for better performance on view_count queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON public.blog_posts(view_count);

-- Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.blog_posts 
    SET view_count = view_count + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_view_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_view_count(UUID) TO anon;