import { NextResponse } from "next/server";

// Protects every route except /login and the login API with a simple
// shared-password cookie check. Not enterprise-grade auth, but enough
// to keep the CRM off the open internet for a small team.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login") || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }
  const authed = request.cookies.get("crm_authed")?.value === "1";
  if (!authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
