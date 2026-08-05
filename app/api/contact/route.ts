import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const services = formData.getAll("services").map(String);

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  const emailBody = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Address/Neighborhood: ${address || "Not provided"}`,
    `Services: ${services.length ? services.join(", ") : "Not specified"}`,
    "",
    "Message:",
    message || "No message provided",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Everything Bros <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: SITE.email,
      replyTo: email,
      subject: `New quote request from ${name}`,
      text: emailBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please call or email us directly." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  }

  // Fallback: log and succeed so the UI works during development
  console.log("Contact form submission (Resend not configured):\n", emailBody);
  return NextResponse.json({ success: true, fallback: true });
}
