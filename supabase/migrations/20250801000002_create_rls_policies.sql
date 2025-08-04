-- Enable Row Level Security (RLS) on blog_posts table
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published posts
CREATE POLICY "Public can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);

-- Policy for authenticated users to view all posts (for admin)
CREATE POLICY "Authenticated users can view all blog posts" ON public.blog_posts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for authenticated users to insert posts (admin only)
CREATE POLICY "Authenticated users can insert blog posts" ON public.blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy for authenticated users to update posts (admin only)
CREATE POLICY "Authenticated users can update blog posts" ON public.blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy for authenticated users to delete posts (admin only)
CREATE POLICY "Authenticated users can delete blog posts" ON public.blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create a function to check if user is admin (optional, for future use)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.jwt() ->> 'email' IN (
        'admin@tescilofisi.com',
        'ugurcankurt@gmail.com'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;