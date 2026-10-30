import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Message from "../../models/Message";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await connectDB();
    await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
