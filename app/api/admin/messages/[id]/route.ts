import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/mongodb";
import Message from "../../../../models/Message";

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

// DELETE a single message by ID
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();
  const deleted = await Message.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
