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

    // 2. Upload to FTP if screenshot is provided
    let ftpStatus = "NO_SCREENSHOT";
    if (paymentScreenshot && paymentScreenshot !== "NO_SCREENSHOT") {
      try {
        const fileName = screenshotName || `transaction_${Date.now()}.jpg`;
        const userData = {
          id: registration.id,
          lead: { name, email, phone },
          p2: { name: participant2, email: email2, phone: phone2 },
          p3: { name: participant3, email: email3, phone: phone3 },
          p4: { name: participant4, email: email4, phone: phone4 },
          teamName: teamName || "N/A",
          institution,
          eventSlug,
          eventName,
          transactionId: transactionId || "N/A",
          needsAccommodation: !!needsAccommodation,
          timestamp: registration.createdAt.toISOString()
        };

        await uploadToFtp(registration.id.toString(), paymentScreenshot, fileName, userData);
        ftpStatus = `UPLOADED_TO_FTP: /registrations/${registration.id}/${fileName}`;
      } catch (ftpError) {
        console.error("FTP processing error:", ftpError);
        ftpStatus = "FTP_UPLOAD_FAILED";
      }

      // 3. Update DB with FTP status
      await prisma.registration.update({
        where: { id: registration.id },
        data: { paymentScreenshot: ftpStatus }
      });
    }

    return NextResponse.json({ 
      message: "Registration successful! Data transmitted to secure terminal.",
      id: registration.id,
      ftp: ftpStatus
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error during data transmission." }, { status: 500 });
  }
}
