import { NextRequest, NextResponse } from "next/server";
import { registerToFtp } from "@/lib/ftp";

export const dynamic = 'force-dynamic';
// Increasing the limit for large image uploads (base64)
export const maxDuration = 60; 

export async function POST(request: NextRequest) {
  try {
    // 1. Parse JSON body
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

    // 2. Immediate Validation
    if (!name || !email || !eventSlug) {
      return NextResponse.json({ 
        message: "Missing required fields.",
        error: "INVALID_INPUT"
      }, { status: 400 });
    }

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

    // 3. FTP Storage Execution
    try {
      const fileName = screenshotName || `receipt_${Date.now()}.jpg`;
      
      // We pass the data to our robust FTP handler
      const result = await registerToFtp(paymentScreenshot, fileName, userData);

      return NextResponse.json({ 
        message: "Registration successful.",
        registrationId: result.id,
        path: result.path
      }, { status: 200 });

    } catch (ftpError: any) {
      console.error("FTP Handler Error:", ftpError);
      return NextResponse.json({ 
        message: "FTP Storage Failure. Check credentials or disk space.",
        error: ftpError.message || "FTP_ERROR",
        code: ftpError.code || "UNKNOWN"
      }, { status: 500 });
    }

  } catch (globalError: any) {
    console.error("Critical API Crash:", globalError);
    return NextResponse.json({ 
      message: "Critical Server Error.",
      error: globalError.message || "CRASH",
      // Returning stack in response briefly to help you debug the exact line
      details: globalError.toString()
    }, { status: 500 });
  }
}
