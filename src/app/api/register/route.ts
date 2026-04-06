import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToFtp } from "@/lib/ftp";

// This explicitly enables dynamic rendering so Netlify doesn't try to pre-render during build.
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Data Parsing
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

    // 2. Validation
    if (!name || !email || !eventSlug) {
      return NextResponse.json({ 
        message: "Missing required fields.",
        error: "NODE_INPUT_INVALID",
        fields: { name: !!name, email: !!email, eventSlug: !!eventSlug }
      }, { status: 400 });
    }

    // 3. Database Execution
    // This is the primary mission - save the user first!
    let registration;
    try {
      registration = await prisma.registration.create({
        data: {
          name,
          email,
          phone: phone || "",
          participant2: participant2 || "",
          email2: email2 || "",
          phone2: phone2 || "",
          participant3: participant3 || "",
          email3: email3 || "",
          phone3: phone3 || "",
          participant4: participant4 || "",
          email4: email4 || "",
          phone4: phone4 || "",
          teamName: teamName || "",
          institution: institution || "",
          eventSlug,
          eventName: eventName || "",
          transactionId: transactionId || "",
          paymentScreenshot: "PENDING_FTP", 
          needsAccommodation: !!needsAccommodation
        },
      });
    } catch (dbError: any) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json({ 
        message: "Secure database connection could not be established.",
        error: dbError.message || "P6001_DB_ACCESS_DENIED",
        code: dbError.code || "DB_LINK_ERROR"
      }, { status: 500 });
    }

    // 4. FTP Execution (Resilient)
    // We do not fail the whole request if FTP is just slow.
    let ftpStatus = "NO_SCREENSHOT";
    if (paymentScreenshot && paymentScreenshot !== "NO_SCREENSHOT") {
      try {
        const fileName = screenshotName || `transaction_${Date.now()}.jpg`;
        const userData = {
          registration_id: registration.id,
          event_name: eventName,
          event_slug: eventSlug,
          team_name: teamName || "N/A",
          institution: institution,
          transaction_id: transactionId || "N/A",
          needs_accommodation: needsAccommodation ? "YES" : "NO",
          lead_name: name,
          lead_email: email,
          timestamp: registration.createdAt.toISOString()
        };

        // Try the upload with an internal 15s timeout
        const uploadTask = uploadToFtp(registration.id.toString(), paymentScreenshot, fileName, userData);
        const timeoutTask = new Promise((_, reject) => setTimeout(() => reject(new Error("FTP_TIMEOUT")), 15000));

        await Promise.race([uploadTask, timeoutTask]);
        ftpStatus = `UPLOADED_TO_FTP: /registrations/${registration.id}/${fileName}`;
      } catch (ftpErr: any) {
        console.error("FTP Background Task Warning:", ftpErr.message);
        ftpStatus = ftpErr.message === "FTP_TIMEOUT" ? "FTP_TIMEOUT_STILL_QUEUED" : "FTP_UPLOAD_FAILED";
      }

      // 5. Atomic Update
      try {
        await prisma.registration.update({
          where: { id: registration.id },
          data: { paymentScreenshot: ftpStatus }
        });
      } catch (updateErr) {
        console.error("Sync Status Update Failed:", updateErr);
      }
    }

    // 6. Success Response
    return NextResponse.json({ 
      message: "Data transmission successful. Registration locked in.",
      id: registration.id,
      ftp: ftpStatus
    }, { status: 200 });

  } catch (globalError: any) {
    console.error("Critical Runtime Failure:", globalError);
    return NextResponse.json({ 
      message: "An internal critical error occurred.",
      error: globalError.message || "NODE_CRASH",
      stack: process.env.NODE_ENV === "development" ? globalError.stack : "HIDDEN_IN_PRODUCTION"
    }, { status: 500 });
  }
}
