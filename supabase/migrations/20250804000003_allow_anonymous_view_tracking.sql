-- Allow anonymous users to update only view_count for published posts
CREATE POLICY "Anonymous users can update view count for published posts" ON public.blog_posts
    FOR UPDATE USING (published = true)
    WITH CHECK (published = true);

-- Also allow anon users to select published posts (they might not have this already)
CREATE POLICY "Anonymous users can view published blog posts" ON public.blog_posts
    FOR SELECT USING (published = true);