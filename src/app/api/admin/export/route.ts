import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const format = searchParams.get("format") || "json"; // json or xml
  const eventSlug = searchParams.get("eventSlug");

  // Basic security check - in a real app use better auth
  if (secret !== process.env.ADMIN_SECRET && secret !== "techurja_admin_2026") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const where = eventSlug ? { eventSlug } : {};
    const registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (format === "xml") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<registrations>\n`;
      registrations.forEach((reg) => {
        xml += `  <registration>\n`;
        xml += `    <id>${reg.id}</id>\n`;
        xml += `    <name>${reg.name}</name>\n`;
        xml += `    <teamName>${reg.teamName || ""}</teamName>\n`;
        xml += `    <email>${reg.email}</email>\n`;
        xml += `    <phone>${reg.phone}</phone>\n`;
        xml += `    <institution>${reg.institution}</institution>\n`;
        xml += `    <event>${reg.eventName}</event>\n`;
        xml += `    <slug>${reg.eventSlug}</slug>\n`;
        xml += `    <timestamp>${reg.createdAt.toISOString()}</timestamp>\n`;
        xml += `  </registration>\n`;
      });
      xml += `</registrations>`;

      return new NextResponse(xml, {
        headers: {
          "Content-Type": "application/xml",
          "Content-Disposition": `attachment; filename=registrations_${eventSlug || "all"}.xml`,
        },
      });
    }

    // Default JSON
    return new NextResponse(JSON.stringify(registrations, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=registrations_${eventSlug || "all"}.json`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
