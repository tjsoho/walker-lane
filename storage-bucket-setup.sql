-- ============================================
-- Storage Bucket Policies Setup
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- Make sure you have created the "blog-images" bucket first:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name it: blog-images
-- 4. Make it PUBLIC (toggle the switch)
-- 5. Click "Create bucket"
-- ============================================

-- ============================================
-- 1. DROP EXISTING POLICIES (if any)
-- ============================================
-- This allows you to re-run the script safely

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read images" ON storage.objects;

-- ============================================
-- 2. CREATE STORAGE POLICIES
-- ============================================

-- Authenticated users can upload files to the blog-images bucket
-- This allows uploads to root level and any subfolder
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- Authenticated users can update their files
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

-- Authenticated users can delete files
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

-- Public can read all files (for displaying images on the website)
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
-- Your storage bucket should now be configured with:
-- ✅ Authenticated users can upload images
-- ✅ Authenticated users can update images
-- ✅ Authenticated users can delete images
-- ✅ Public can read images (for website display)
-- ✅ Authenticated users can read images
-- ============================================
-- Next steps:
-- 1. Try uploading an image again in the admin panel
-- 2. If you still get errors, check:
--    - Bucket name is exactly "blog-images" (case-sensitive)
--    - Bucket is set to PUBLIC
--    - You are logged in as an authenticated user
-- ============================================

