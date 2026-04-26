import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/admin", "/admin2"];

// Routes that redirect authenticated users away (e.g., sign in page)
const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if it's a protected route (admin)
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    // Look for Supabase session cookie
    const hasSession = req.cookies.has("sb-access-token") ||
      req.cookies.get("sb-auth-token") ||
      // Supabase v2 uses these cookie names
      Array.from(req.cookies.getAll()).some(c => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

    if (!hasSession) {
      const signInUrl = req.nextUrl.clone();
      signInUrl.pathname = "/auth/signin";
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin2/:path*",
    "/auth/:path*",
  ],
};
