import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "souravsuman846@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const emailSubject = subject?.trim()
      ? `Portfolio Contact: ${subject.trim()} from ${name.trim()}`
      : `New Portfolio Message from ${name.trim()}`;

    const textContent = `
Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}

Message:
${message}
    `.trim();

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #d5daf4; border-radius: 8px; background-color: #ffffff; color: #121a30;">
        <h2 style="color: #3547f5; margin-top: 0;">New Message from Portfolio Contact Form</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #566078; font-weight: 600; width: 100px;">From:</td>
            <td style="padding: 8px 0;"><strong>${name}</strong> (&lt;<a href="mailto:${email}" style="color: #3547f5;">${email}</a>&gt;)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #566078; font-weight: 600;">Subject:</td>
            <td style="padding: 8px 0;">${subject || "General Inquiry"}</td>
          </tr>
        </table>
        <div style="padding: 16px; background-color: #eceef3; border-radius: 6px; border-left: 4px solid #3547f5; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">
${message}
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #566078;">
          This message was sent from your portfolio website to <strong>${RECIPIENT_EMAIL}</strong>. You can reply directly to this email to contact ${name}.
        </p>
      </div>
    `;

    // 1. Check for Gmail SMTP / Nodemailer configuration
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    const emailUser =
      process.env.EMAIL_USER || process.env.SMTP_USER || RECIPIENT_EMAIL;

    if (emailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${emailUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // 2. Check for Resend API configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Form <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.json();
        console.error("Resend API error:", errorData);
        throw new Error(errorData.message || "Failed to send email via Resend");
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // 3. Check for Web3Forms Access Key
    const web3formsKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      const w3fRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          subject: emailSubject,
          message,
          to: RECIPIENT_EMAIL,
        }),
      });

      const w3fData = await w3fRes.json();
      if (!w3fData.success) {
        console.error("Web3Forms error:", w3fData);
        throw new Error(w3fData.message || "Failed to send via Web3Forms");
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // 4. Development mode / logging fallback
    console.log("==========================================");
    console.log("[Portfolio Contact Form Submission]");
    console.log(`To: ${RECIPIENT_EMAIL}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${emailSubject}`);
    console.log("Message:\n", message);
    console.log("==========================================");

    return NextResponse.json({
      success: true,
      devMode: true,
      recipient: RECIPIENT_EMAIL,
      message:
        "Message received! To send live emails to your inbox, set your EMAIL_PASS in .env.local (see instructions in .env.local).",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "An unexpected error occurred while sending your message.",
      },
      { status: 500 }
    );
  }
}
