import { NextResponse } from "next/server";
import { z } from "zod";
import { getEventBySlug } from "@/lib/event-data";
import { prisma } from "@/lib/prisma";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  institution: z.string().trim().min(2).max(140),
  eventSlug: z.string().trim().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = registrationSchema.parse(body);

    const event = getEventBySlug(payload.eventSlug);
    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    await prisma.registration.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        institution: payload.institution,
        eventSlug: event.slug,
        eventName: event.name,
      },
    });

    return NextResponse.json({ message: "Registration successful. See you in the arena." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data." }, { status: 400 });
    }

    return NextResponse.json({ message: "Server error. Please try again later." }, { status: 500 });
  }
}
