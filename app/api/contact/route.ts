import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, phone, message } = body;

  console.log("📩 New Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Message:", message);

  return NextResponse.json({
    success: true,
    message: "Form submitted successfully",
  });
}
