import { NextResponse } from "next/server";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const contacts: Contact[] = [];

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, phone, message } = body;

  const newContact: Contact = {
    id: Date.now(),
    name,
    email,
    phone,
    message,
  };

  contacts.push(newContact);

  return NextResponse.json({
    success: true,
    message: "Form submitted successfully",
    data: newContact,
  });
}

export async function GET() {
  return NextResponse.json(contacts);
}