# Supabase Database Setup Guide

This guide will help you set up your Supabase database for the Walker Lane Private Wealth application.

## Prerequisites

- A new Supabase project created
- Access to Supabase Dashboard
- Your environment variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## Step 1: Run the SQL Setup Script

1. Open your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-setup.sql`
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Verify all commands executed successfully (you should see "Success" messages)

## Step 2: Create Storage Bucket

1. Navigate to **Storage** in the Supabase Dashboard
2. Click **New bucket**
3. Name it: `blog-images`
4. Make it **Public** (toggle the "Public bucket" switch)
5. Click **Create bucket**

## Step 3: Verify Storage Policies

The SQL script should have created storage policies automatically. To verify:

1. Go to **Storage** > **Policies** tab
2. Select the `blog-images` bucket
3. You should see policies for:
   - Authenticated users can upload
   - Authenticated users can update
   - Authenticated users can delete
   - Public can read
   - Authenticated users can read

If policies are missing, you can run just the storage policy section from the SQL script again.

## Step 4: Create Admin User

1. Navigate to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter an email and password for your admin account
4. Click **Create user**
5. **Important**: Note down these credentials - you'll need them to log into the admin panel

## Step 5: Test the Setup

1. Start your Next.js development server: `npm run dev`
2. Navigate to `/admin` in your browser
3. Log in with the admin credentials you created
4. Try creating a blog post
5. Try uploading an image
6. Verify everything works as expected

## Database Tables Created

- **page_content**: Stores editable content for page sections
- **blog_posts**: Stores blog posts with metadata
- **blog_content_images**: Tracks images used in blog post content

## Storage Structure

The `blog-images` bucket stores images in two locations:
- Root folder (`blog-images/`): Featured images for blog posts
- `blog-content-images/` folder: Images embedded in blog post content

## Security

- **Authenticated users** (logged in admins) have full access to all tables and storage
- **Public users** (anonymous visitors) can only:
  - Read published blog posts
  - Read page content
  - View images (storage is public for display)

## Troubleshooting

### Storage policies not working
- Make sure the bucket is named exactly `blog-images`
- Verify the bucket is set to public
- Re-run the storage policy section of the SQL script

### Can't log in as admin
- Verify the user was created in Authentication > Users
- Check that RLS policies are enabled (they should be from the SQL script)
- Try creating a new user if needed

### Images not uploading
- Check that the storage bucket exists and is public
- Verify storage policies are in place
- Check browser console for error messages

## Need Help?

If you encounter issues, check:
1. Supabase Dashboard logs
2. Browser console for errors
3. Network tab for failed requests

