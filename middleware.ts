import { NextResponse, type NextRequest } from "next/server";

// TODO: need more test on this middleware once we have protected routes available.
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Example authentication token from cookies

  // Allow access if the user is authenticated
  if (token) return NextResponse.next();

  // Redirect unauthenticated users to the login page with a "redirect" query
  const loginUrl = new URL("/user-auth", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname); // Save the current path
  return NextResponse.redirect(loginUrl);
}

// Apply to specific routes
export const config = {
  matcher: ["/profile", "/protected/:path*"], // Routes that require authentication
};
