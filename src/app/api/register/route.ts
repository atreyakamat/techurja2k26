import { NextRequest, NextResponse } from "next/server";
import { registerToFtp } from "@/lib/ftp";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, email, phone,
      participant2, email2, phone2,
      participant3, email3, phone3,
      participant4, email4, phone4,
      teamName, 
      institution, 
      eventSlug, 
      eventName, 
      transactionId, 
      paymentScreenshot,
      screenshotName,
      needsAccommodation
    } = body;

    if (!name || !email || !eventSlug) {
      return NextResponse.json({ 
        message: "Node transmission rejected: Data packet incomplete.",
        error: "NODE_INPUT_INVALID"
      }, { status: 400 });
    }

    // Prepare full data payload for the CSV backup
    const userData = {
      name, email, phone: phone || "N/A",
      team_name: teamName || "N/A",
      institution: institution || "N/A",
      event_slug: eventSlug,
      event_name: eventName || eventSlug,
      transaction_id: transactionId || "N/A",
      needs_accommodation: needsAccommodation ? "YES" : "NO",
      participant2: participant2 || "N/A",
      email2: email2 || "N/A",
      phone2: phone2 || "N/A",
      participant3: participant3 || "N/A",
      email3: email3 || "N/A",
      phone3: phone3 || "N/A",
      participant4: participant4 || "N/A",
      email4: email4 || "N/A",
      phone4: phone4 || "N/A",
      timestamp: new Date().toISOString()
    };

    // Store directly to FTP (Database-less architecture)
    try {
      const fileName = screenshotName || `receipt_${Date.now()}.jpg`;
      const result = await registerToFtp(paymentScreenshot, fileName, userData);

      return NextResponse.json({ 
        message: "Data transmission successful. Registration logged on secure FTP terminal.",
        registrationId: result.id,
        path: result.path
      }, { status: 200 });

    } catch (ftpError: any) {
      console.error("Critical Storage Failure:", ftpError);
      return NextResponse.json({ 
        message: "System encountered a write error. Transmission suspended.",
        error: ftpError.message || "FTP_UNREACHABLE"
      }, { status: 500 });
    }

  } catch (globalError: any) {
    console.error("Critical Runtime Failure:", globalError);
    return NextResponse.json({ 
      message: "An internal critical error occurred.",
      error: globalError.message || "NODE_CRASH"
    }, { status: 500 });
  }
}
