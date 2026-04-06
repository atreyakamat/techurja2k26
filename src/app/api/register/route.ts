import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToFtp } from "@/lib/ftp";

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
      return NextResponse.json({ message: "Missing required fields (Lead Name, Email, or Event)" }, { status: 400 });
    }

    // 1. Create registration record in DB
    const registration = await prisma.registration.create({
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

    // 2. Upload to FTP if screenshot is provided (using a wrapper with timeout)
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
          lead_phone: phone || "N/A",
          p2_name: participant2 || "N/A",
          p2_email: email2 || "N/A",
          p2_phone: phone2 || "N/A",
          p3_name: participant3 || "N/A",
          p3_email: email3 || "N/A",
          p3_phone: phone3 || "N/A",
          p4_name: participant4 || "N/A",
          p4_email: email4 || "N/A",
          p4_phone: phone4 || "N/A",
          timestamp: registration.createdAt.toISOString()
        };

        // Create a timeout promise (15 seconds) to prevent killing the function
        const ftpWithTimeout = Promise.race([
          uploadToFtp(registration.id.toString(), paymentScreenshot, fileName, userData),
          new Promise((_, reject) => setTimeout(() => reject(new Error("FTP_TIMEOUT")), 15000))
        ]);

        await ftpWithTimeout;
        ftpStatus = `UPLOADED_TO_FTP: /registrations/${registration.id}/${fileName}`;
      } catch (ftpError: any) {
        console.error("FTP processing error:", ftpError);
        ftpStatus = ftpError.message === "FTP_TIMEOUT" ? "FTP_TIMEOUT_STILL_UPLOAD_QUEUED" : "FTP_UPLOAD_FAILED";
      }

      // 3. Update DB with FTP status
      await prisma.registration.update({
        where: { id: registration.id },
        data: { paymentScreenshot: ftpStatus }
      });
    }

    return NextResponse.json({ 
      message: "Registration successful! Record saved to terminal.",
      id: registration.id,
      ftp: ftpStatus
    }, { status: 200 });

  } catch (error: any) {
  console.error("Registration error:", error);
  return NextResponse.json({ 
    message: "Internal server error during data transmission.",
    error: error?.message || "Unknown error",
    stack: process.env.NODE_ENV === "development" ? error?.stack : undefined
  }, { status: 500 });
  }}
