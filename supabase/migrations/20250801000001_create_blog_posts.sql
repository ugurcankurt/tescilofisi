-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Admin',
    category TEXT NOT NULL DEFAULT 'Genel',
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER handle_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create function to automatically update published_at when published becomes true
CREATE OR REPLACE FUNCTION public.handle_published_at()
RETURNS TRIGGER AS $$
BEGIN
    -- If published status changes from false to true, set published_at
    IF OLD.published = false AND NEW.published = true THEN
        NEW.published_at = timezone('utc'::text, now());
    -- If published status changes from true to false, clear published_at
    ELSIF OLD.published = true AND NEW.published = false THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for published_at
CREATE TRIGGER handle_blog_posts_published_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE PROCEDURE public.handle_published_at();