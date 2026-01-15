# Supabase Authentication Implementation Guide

This guide documents how Supabase authentication is implemented in this Next.js 15 application. Use this as a reference to replicate the exact authentication functionality in another app.

---

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Environment Variables](#environment-variables)
4. [Client Setup](#client-setup)
5. [Middleware for Route Protection](#middleware-for-route-protection)
6. [Login Implementation](#login-implementation)
7. [Authentication Checks](#authentication-checks)
8. [Session Management](#session-management)
9. [Logout (Not Implemented)](#logout-not-implemented)
10. [Complete Implementation Checklist](#complete-implementation-checklist)

---

## Overview

This app uses **Supabase Auth** with the following architecture:

- **Next.js 15** with App Router
- **@supabase/ssr** for server-side rendering support
- **Middleware** to protect admin routes
- **Server Actions** for login
- **HTTP-only cookies** for secure session storage
- **No logout functionality** (sessions expire after 7 days)

---

## Dependencies

Install these packages in your `package.json`:

```json
{
  "dependencies": {
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.50.0",
    "next": "15.3.8"
  }
}
```

**Installation command:**

```bash
npm install @supabase/ssr @supabase/supabase-js
```

---

## Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**How to get these values:**

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key

---

## Client Setup

You need **three different Supabase client configurations** for different contexts:

### 1. Server Client (for Server Components & Server Actions)

**File:** `src/utils/server.ts`

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
```

**Usage:** Use this in Server Components and Server Actions where you need to access auth state.

---

### 2. Browser Client (for Client Components)

**File:** `src/utils/client.ts`

```typescript
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
```

**Usage:** Use this in Client Components (files with `"use client"` directive).

---

### 3. Legacy Client (Alternative Browser Client)

**File:** `src/lib/supabase.ts`

```typescript
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Note:** This is a simpler alternative that exports a singleton instance. Use `src/utils/client.ts` for better practice.

---

## Middleware for Route Protection

**File:** `src/middleware.ts`

This middleware protects all `/admin` routes except `/admin/login`:

```typescript
"use server";

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  
  // Only run on admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect to login if not authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Allow access if authenticated
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
```

**What this does:**

- Runs on all `/admin` routes
- Allows unauthenticated access to `/admin/login`
- Checks for authenticated user on all other admin routes
- Redirects to login if not authenticated

---

## Login Implementation

### Server Action

**File:** `src/server-actions/admin.ts`

```typescript
"use server";

import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function login(email: string, password: string) {
  const supabase = await createClient();
  
  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  // Return error if login failed
  if (error) {
    console.error(error);
    return { error: error.message };
  }

  // Store session tokens in HTTP-only cookies
  if (data.session) {
    const cookieStore = await cookies();

    // Set access token
    cookieStore.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set refresh token
    cookieStore.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  // Redirect to admin dashboard
  redirect("/admin");
}
```

**Key features:**

- Uses server action for secure authentication
- Stores tokens in HTTP-only cookies (not accessible via JavaScript)
- Sets secure cookies in production
- Session expires after 7 days
- Redirects to admin dashboard on success

---

### Login Form Component

**File:** `src/components/admin/login-form.tsx`

```typescript
"use client";

import login from "@/server-actions/admin";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    const { error } = await login(email, password);

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

### Login Page

**File:** `src/app/admin/login/page.tsx`

```typescript
import LoginForm from "@/components/admin/login-form";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
```

---

## Authentication Checks

### Checking Auth in Server Components

```typescript
import { createClient } from "@/utils/server";

export default async function SomeServerComponent() {
  const supabase = await createClient();
  
  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome {user.email}</div>;
}
```

---

### Checking Auth in Client Components

```typescript
"use client";

import { createClient } from "@/utils/client";
import { useEffect, useState } from "react";

export default function SomeClientComponent() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Welcome {user.email}</div>;
}
```

---

### Checking Auth in Server Actions

```typescript
"use server";

import { createClient } from "@/utils/server";

export async function someServerAction() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Perform authenticated action
  return { success: true };
}
```

---

## Session Management

### Cookie Configuration

Sessions are stored in **HTTP-only cookies** with these settings:

- **Access Token Cookie:** `sb-access-token`
- **Refresh Token Cookie:** `sb-refresh-token`
- **Max Age:** 7 days (604,800 seconds)
- **HttpOnly:** `true` (prevents JavaScript access)
- **Secure:** `true` in production (requires HTTPS)
- **SameSite:** `lax` (prevents CSRF attacks)
- **Path:** `/` (available across entire site)

### Session Expiration

- Sessions automatically expire after **7 days**
- Users must log in again after expiration
- No automatic session refresh is implemented

---

## Logout (Not Implemented)

**Important:** This app does **NOT** have a logout function. Sessions simply expire after 7 days.

### How to Add Logout (Optional)

If you want to add logout functionality, here's how:

#### 1. Create Logout Server Action

**File:** `src/server-actions/admin.ts`

```typescript
"use server";

import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  const supabase = await createClient();
  
  // Sign out from Supabase
  await supabase.auth.signOut();

  // Delete session cookies
  const cookieStore = await cookies();
  cookieStore.delete("sb-access-token");
  cookieStore.delete("sb-refresh-token");

  // Redirect to login
  redirect("/admin/login");
}
```

#### 2. Create Logout Button Component

```typescript
"use client";

import { logout } from "@/server-actions/admin";

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
```

---

## Complete Implementation Checklist

Use this checklist when implementing in a new project:

### ✅ Step 1: Install Dependencies

```bash
npm install @supabase/ssr @supabase/supabase-js
```

### ✅ Step 2: Set Up Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### ✅ Step 3: Create Client Utilities

- [ ] Create `src/utils/server.ts` (server client)
- [ ] Create `src/utils/client.ts` (browser client)

### ✅ Step 4: Create Middleware

- [ ] Create `src/middleware.ts`
- [ ] Configure matcher for protected routes

### ✅ Step 5: Create Login Server Action

- [ ] Create `src/server-actions/admin.ts`
- [ ] Implement `login()` function with cookie storage

### ✅ Step 6: Create Login UI

- [ ] Create `src/components/admin/login-form.tsx`
- [ ] Create `src/app/admin/login/page.tsx`

### ✅ Step 7: Create Admin Dashboard

- [ ] Create `src/app/admin/page.tsx`
- [ ] Add authentication check

### ✅ Step 8: Create Admin User in Supabase

1. Go to Supabase Dashboard
2. Go to **Authentication** → **Users**
3. Click **Add User**
4. Enter email and password
5. Confirm user email

### ✅ Step 9: Test

- [ ] Try accessing `/admin` (should redirect to login)
- [ ] Login with test credentials
- [ ] Verify redirect to dashboard
- [ ] Verify cookies are set (check browser dev tools)
- [ ] Test middleware protection on other admin routes

---

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [@supabase/ssr NPM Package](https://www.npmjs.com/package/@supabase/ssr)
- [Next.js 15 Documentation](https://nextjs.org/docs)

---

## Summary

This authentication implementation provides:

✅ Secure server-side authentication  
✅ HTTP-only cookie storage  
✅ Middleware route protection  
✅ Server Actions for login  
✅ Separate clients for server/browser contexts  
✅ 7-day session expiration  

**Note:** No logout functionality is implemented - sessions expire automatically after 7 days.

