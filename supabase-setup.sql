-- ============================================
-- Supabase Database Setup Script
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Page Content Table (for editable page sections)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, section_id)
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Content Images Table (tracks images in blog post content)
CREATE TABLE IF NOT EXISTS blog_content_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_page_content_page_section ON page_content(page_id, section_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_content_images_post_id ON blog_content_images(post_id);

-- ============================================
-- 3. CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. CREATE TRIGGERS
-- ============================================

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_content_images ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PAGE_CONTENT POLICIES
-- ============================================

-- Authenticated users can do everything
CREATE POLICY "Authenticated users full access to page_content"
  ON page_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can read page content
CREATE POLICY "Public can read page_content"
  ON page_content
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- BLOG_POSTS POLICIES
-- ============================================

-- Authenticated users can do everything
CREATE POLICY "Authenticated users full access to blog_posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can only read published posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (status = 'published');

-- ============================================
-- BLOG_CONTENT_IMAGES POLICIES
-- ============================================

-- Authenticated users can do everything
CREATE POLICY "Authenticated users full access to blog_content_images"
  ON blog_content_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can read blog content images
CREATE POLICY "Public can read blog_content_images"
  ON blog_content_images
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- 6. STORAGE BUCKET SETUP
-- ============================================
-- Note: Storage buckets must be created via Supabase Dashboard or API
-- This SQL creates the bucket if it doesn't exist via the storage API
-- You may need to create the bucket manually in the Supabase Dashboard:
-- 1. Go to Storage
-- 2. Create bucket named "blog-images"
-- 3. Make it public
-- 4. Then run the storage policies below

-- ============================================
-- 7. STORAGE POLICIES (for blog-images bucket)
-- ============================================
-- These policies assume the bucket is already created
-- If the bucket doesn't exist, create it first in the Supabase Dashboard

-- Authenticated users can upload files
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-images' AND
    (storage.foldername(name))[1] IN ('blog-images', 'blog-content-images')
  );

-- Authenticated users can update their files
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'blog-images' AND
    (storage.foldername(name))[1] IN ('blog-images', 'blog-content-images')
  )
  WITH CHECK (
    bucket_id = 'blog-images' AND
    (storage.foldername(name))[1] IN ('blog-images', 'blog-content-images')
  );

-- Authenticated users can delete files
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blog-images' AND
    (storage.foldername(name))[1] IN ('blog-images', 'blog-content-images')
  );

-- Public can read all files (for displaying images)
CREATE POLICY "Public can read images"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'blog-images');

-- Authenticated users can read all files
CREATE POLICY "Authenticated users can read images"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'blog-images');

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Next steps:
-- 1. Create the storage bucket "blog-images" in Supabase Dashboard (if not exists)
-- 2. Make the bucket public
-- 3. Create an admin user account in Authentication > Users
-- 4. Test the setup by logging in and creating a blog post

