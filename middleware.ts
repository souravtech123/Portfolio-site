import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard (and any sub-paths)
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      const response = NextResponse.redirect(new URL("/admin", request.url));
      response.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
