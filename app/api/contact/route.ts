import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/constants";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 100 * 1024 * 1024;
const MAX_TOTAL_PHOTO_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const propertyAddress = String(formData.get("propertyAddress") ?? "").trim();
  const projectDescription = String(formData.get("projectDescription") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const referralSource = String(formData.get("referralSource") ?? "").trim();
  const referralOther = String(formData.get("referralOther") ?? "").trim();
  const servicesOther = String(formData.get("servicesOther") ?? "").trim();
  const estimatePreference = String(formData.get("estimatePreference") ?? "").trim();
  const services = formData.getAll("services").map(String);

  const photos = formData.getAll("photos").filter((entry): entry is File => {
    return entry instanceof File && entry.size > 0;
  });

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Full name and phone number are required." },
      { status: 400 },
    );
  }

  if (services.length === 0) {
    return NextResponse.json(
      { error: "Please select at least one service." },
      { status: 400 },
    );
  }

  if (services.includes("Other") && !servicesOther) {
    return NextResponse.json(
      { error: 'Please describe the service under "Other".' },
      { status: 400 },
    );
  }

  if (!propertyAddress || !projectDescription || !timeline || !referralSource || !estimatePreference) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (referralSource === "Other" && !referralOther) {
    return NextResponse.json(
      { error: 'Please tell us how you heard about us under "Other".' },
      { status: 400 },
    );
  }

  if (photos.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `You can upload up to ${MAX_PHOTOS} photos.` },
      { status: 400 },
    );
  }

  for (const photo of photos) {
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "Each photo must be 100 MB or smaller." },
        { status: 400 },
      );
    }
  }

  const totalPhotoBytes = photos.reduce((sum, photo) => sum + photo.size, 0);
  if (totalPhotoBytes > MAX_TOTAL_PHOTO_BYTES) {
    return NextResponse.json(
      {
        error:
          "Total photo size must be under 4 MB for web upload. Email us directly for larger files.",
      },
      { status: 400 },
    );
  }

  const servicesList = services
    .map((service) => (service === "Other" ? `Other: ${servicesOther}` : service))
    .join(", ");

  const referralDisplay =
    referralSource === "Other" ? `Other: ${referralOther}` : referralSource;

  const emailBody = [
    `Full Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `Services Needed: ${servicesList}`,
    `Property Address: ${propertyAddress}`,
    "",
    "Project Description:",
    projectDescription,
    "",
    `Timeline: ${timeline}`,
    `How They Heard About Us: ${referralDisplay}`,
    `In-Person Estimate: ${estimatePreference}`,
    `Photos Attached: ${photos.length}`,
  ].join("\n");

  const attachments = await Promise.all(
    photos.map(async (photo) => ({
      filename: photo.name,
      content: Buffer.from(await photo.arrayBuffer()),
    })),
  );

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Everything Bros <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: SITE.email,
      ...(email ? { replyTo: email } : {}),
      subject: `New quote request from ${name}`,
      text: emailBody,
      attachments: attachments.length ? attachments : undefined,
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

  console.log("Contact form submission (Resend not configured):\n", emailBody);
  if (photos.length) {
    console.log(
      "Photo attachments:",
      photos.map((photo) => `${photo.name} (${photo.size} bytes)`),
    );
  }

  return NextResponse.json({ success: true, fallback: true });
}
