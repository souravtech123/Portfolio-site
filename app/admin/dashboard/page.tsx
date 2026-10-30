export const instant = false;

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/mongodb";
import Message from "../../models/Message";
import MessagesClient, { MessageData } from "./MessagesClient";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AdminDashboardPage() {
  // Verify auth server-side
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin");

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    redirect("/admin");
  }

  // Fetch messages directly — no API round-trip
  await connectDB();
  const raw = await Message.find({}).sort({ createdAt: -1 }).lean();

  // Serialize for the client (convert ObjectId/_id to string)
  const messages: MessageData[] = raw.map((m) => ({
    _id: String(m._id),
    name: m.name,
    email: m.email,
    subject: m.subject ?? "",
    message: m.message,
    read: m.read,
    createdAt: m.createdAt instanceof Date
      ? m.createdAt.toISOString()
      : String(m.createdAt),
  }));

  return <MessagesClient initialMessages={messages} />;
}
