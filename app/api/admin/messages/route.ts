import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/mongodb";
import Message from "../../../models/Message";

const JWT_SECRET = process.env.JWT_SECRET!;

async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET all messages
export async function GET() {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ messages });
}

// PATCH — toggle read/unread
export async function PATCH(request: Request) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, read } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Message ID required." }, { status: 400 });
  }

  await connectDB();
  const updated = await Message.findByIdAndUpdate(
    id,
    { read },
    { new: true }
  ).lean();

  if (!updated) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: updated });
}
