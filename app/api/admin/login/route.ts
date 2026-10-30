import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 }
    );
  }
}
