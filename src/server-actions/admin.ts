"use server";

import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function login(email: string, password: string) {
  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
    console.error("URL:", supabaseUrl ? "Set" : "Missing");
    console.error("Key:", supabaseKey ? "Set" : "Missing");
    return { 
      error: "Server configuration error. Please check your environment variables." 
    };
  }

  let data;
  try {
    const supabase = await createClient();
    
    // Attempt to sign in
    const result = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // Return error if login failed
    if (result.error) {
      console.error("Login error:", result.error);
      return { error: result.error.message };
    }

    data = result.data;
  } catch (err) {
    console.error("Login exception:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    
    // Check for network/fetch errors
    if (errorMessage.includes("fetch") || errorMessage.includes("network") || errorMessage.includes("AuthRetryableFetchError")) {
      return { 
        error: "Unable to connect to authentication server. Please verify your Supabase URL and that your project is active." 
      };
    }
    
    return { error: errorMessage };
  }

  // Store session tokens in HTTP-only cookies
  if (data?.session) {
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

