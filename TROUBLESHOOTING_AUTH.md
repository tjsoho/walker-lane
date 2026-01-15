# Troubleshooting Authentication Issues

## "Failed to fetch" Error

This error typically occurs when the Supabase client cannot connect to your Supabase project. Here's how to fix it:

### Step 1: Verify Environment Variables

Make sure your `.env.local` file (or `.env`) contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key-here
```

**Important:**
- The URL should start with `https://` and end with `.supabase.co`
- The key should be the **Publishable Default Key** (not the anon key)
- Both variables must start with `NEXT_PUBLIC_` to be accessible in the browser

### Step 2: Get Your Supabase Credentials

1. Go to your Supabase Dashboard
2. Navigate to **Settings** > **API**
3. Copy the following:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable Default Key** → Use for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Step 3: Restart Your Dev Server

After updating environment variables:
```bash
# Stop your dev server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Check Browser Console

Open your browser's developer console and look for:
- The Supabase URL being logged
- Any CORS errors
- Network errors in the Network tab

### Step 5: Verify User Account

1. Go to Supabase Dashboard > **Authentication** > **Users**
2. Verify your user exists
3. Make sure the email matches exactly (case-sensitive)
4. If needed, reset the password or create a new user

### Step 6: Check Supabase Project Status

- Make sure your Supabase project is **active** (not paused)
- Verify you're using the correct project (not a deleted/archived one)

### Common Issues:

1. **Wrong Environment Variable Name**
   - Old: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - New: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

2. **Missing `NEXT_PUBLIC_` Prefix**
   - Environment variables must start with `NEXT_PUBLIC_` to work in the browser

3. **Project Paused/Deleted**
   - Check your Supabase dashboard to ensure the project is active

4. **CORS Issues**
   - Supabase should handle CORS automatically, but if issues persist, check your Supabase project settings

### Still Not Working?

1. Check the browser Network tab to see the actual request being made
2. Verify the request URL matches your Supabase project URL
3. Check if there are any browser extensions blocking requests
4. Try in an incognito/private window

