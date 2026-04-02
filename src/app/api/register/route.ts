import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToFtp } from "@/lib/ftp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      teamName, 
      email, 
      phone, 
      institution, 
      eventSlug, 
      eventName, 
      transactionId, 
      paymentScreenshot,
      screenshotName 
    } = body;

    if (!name || !email || !eventSlug) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Create registration record in DB
    const registration = await prisma.registration.create({
      data: {
        name,
        teamName: teamName || "",
        email,
        phone: phone || "",
        institution: institution || "",
        eventSlug,
        eventName: eventName || "",
        transactionId: transactionId || "",
        paymentScreenshot: "PENDING_FTP", // Initial status
      },
    });

    // 2. Upload to FTP if screenshot is provided
    let ftpStatus = "NO_SCREENSHOT";
    if (paymentScreenshot && paymentScreenshot !== "NO_SCREENSHOT") {
      try {
        const fileName = screenshotName || `transaction_${Date.now()}.jpg`;
        const userData = {
          id: registration.id,
          name,
          teamName,
          email,
          phone,
          institution,
          eventSlug,
          eventName,
          transactionId,
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
      message: "Registration data transmitted successfully!",
      id: registration.id,
      ftp: ftpStatus
    }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
