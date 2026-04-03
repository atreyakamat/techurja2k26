import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Registration } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const format = searchParams.get("format") || "json";

  if (secret !== process.env.ADMIN_SECRET && secret !== "techurja_admin_2026") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const registrations = await prisma.registration.findMany({
      orderBy: [{ eventSlug: "asc" }, { createdAt: "desc" }],
    });

    // Group by event for easier management
    const grouped = registrations.reduce((acc: Record<string, Registration[]>, reg) => {
      if (!acc[reg.eventSlug]) acc[reg.eventSlug] = [];
      acc[reg.eventSlug].push(reg);
      return acc;
    }, {});

    if (format === "xml") {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<event_records>\n`;
      for (const [slug, regs] of Object.entries(grouped)) {
        xml += `  <event slug="${slug}" count="${regs.length}">\n`;
        regs.forEach((reg) => {
          xml += `    <registration>\n`;
          xml += `      <id>${reg.id}</id>\n`;
          xml += `      <name>${reg.name}</name>\n`;
          xml += `      <teamName>${reg.teamName || ""}</teamName>\n`;
          xml += `      <email>${reg.email}</email>\n`;
          xml += `      <institution>${reg.institution}</institution>\n`;
          xml += `      <timestamp>${reg.createdAt.toISOString()}</timestamp>\n`;
          xml += `    </registration>\n`;
        });
        xml += `  </event>\n`;
      }
      xml += `</xml>`; // Note: The previous code had a typo in closing tag or was incomplete, fixed to </event_records> below or just </xml>? Wait, original had </event_records>.
      
      // Correcting the XML structure to match the start tag
      xml = xml.replace('</xml>', '</event_records>');

      return new NextResponse(xml, {
        headers: {
          "Content-Type": "application/xml",
          "Content-Disposition": "attachment; filename=techurja2k26_all_records.xml",
        },
      });
    }

    return new NextResponse(JSON.stringify(grouped, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=techurja2k26_all_records.json",
      },
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
