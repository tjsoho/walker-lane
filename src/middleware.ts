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
