import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, teamName, email, phone, institution, eventSlug, eventName, transactionId, paymentScreenshot } = body;

    if (!name || !email || !eventSlug) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        teamName,
        email,
        phone,
        institution,
        eventSlug,
        eventName,
        transactionId,
        paymentScreenshot,
      },
    });

    return NextResponse.json({ 
      message: "Registration successful!",
      id: registration.id 
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
