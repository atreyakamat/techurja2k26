import { NextRequest, NextResponse } from "next/server";
import { registerToFtp, getRegistrationCount, incrementRegistrationCount } from "@/lib/ftp";
import { z } from "zod";
import { getEventBySlug } from "@/lib/event-data";
import { getEventCap } from "@/lib/registration-caps";

export const dynamic = 'force-dynamic';
// Increasing the limit for large image uploads (base64)
export const maxDuration = 60; 

// Registration schema for robust validation
const registrationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone number is required"),
  
  // These are optional in the schema but will be enforced if the form sends them
  participant2: z.string().min(2, "Participant 2 name required").optional().or(z.literal("")),
  email2: z.string().email("Invalid email 2").optional().or(z.literal("")),
  phone2: z.string().regex(/^\d{10}$/, "Invalid phone 2").optional().or(z.literal("")),
  
  participant3: z.string().min(2, "Participant 3 name required").optional().or(z.literal("")),
  email3: z.string().email("Invalid email 3").optional().or(z.literal("")),
  phone3: z.string().regex(/^\d{10}$/, "Invalid phone 3").optional().or(z.literal("")),
  
  participant4: z.string().min(2, "Participant 4 name required").optional().or(z.literal("")),
  email4: z.string().email("Invalid email 4").optional().or(z.literal("")),
  phone4: z.string().regex(/^\d{10}$/, "Invalid phone 4").optional().or(z.literal("")),
  
  teamName: z.string().min(2, "Team handle is required").optional().or(z.literal("")),
  institution: z.string().min(2, "Faction/Institution is required").max(100, "Institution name is too long (max 100 chars)"),
  eventSlug: z.string().min(1, "Event slug is missing"),
  eventName: z.string().optional(),
  transactionId: z.string().optional().or(z.literal("")),
  paymentScreenshot: z.string().min(1, "Payment screenshot missing"),
  screenshotName: z.string().optional(),
  needsAccommodation: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse JSON body
    const body = await request.json();

    // 2. Immediate Validation with Zod
    const validation = registrationSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.issues.map(err => `${err.path.join(".")}: ${err.message}`).join(", ");
      return NextResponse.json({ 
        message: "Registration data invalid. All fields are mandatory and must be correctly formatted.",
        error: "INVALID_INPUT",
        details: errorMessages
      }, { status: 400 });
    }

    const data = validation.data;
    const event = getEventBySlug(data.eventSlug);

    // --- CAPACITY CHECK ---
    try {
      const currentCount = await getRegistrationCount(data.eventSlug);
      const cap = getEventCap(data.eventSlug);
      
      if (currentCount >= cap) {
        return NextResponse.json({ 
          message: `Registration for ${event?.name || data.eventSlug} has reached its maximum capacity (${cap} entries).`,
          error: "CAPACITY_REACHED"
        }, { status: 403 });
      }
    } catch (capError) {
      console.error("Cap check failed, proceeding anyway:", capError);
    }
    // -----------------------

    // 3. Context-specific validation (e.g. Screenshot check for paid events)
    if (event && event.registrationFee !== "Free") {
      if (!data.paymentScreenshot || data.paymentScreenshot === "NO_SCREENSHOT") {
        return NextResponse.json({ 
          message: "Payment screenshot is required for paid events.",
          error: "PAYMENT_REQUIRED"
        }, { status: 400 });
      }
      
      if (!data.transactionId || data.transactionId === "N/A" || data.transactionId.length < 5) {
        return NextResponse.json({ 
          message: "A valid Transaction ID / UTR is required.",
          error: "TRANSACTION_ID_REQUIRED"
        }, { status: 400 });
      }
    }

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      team_name: data.teamName || "N/A",
      institution: data.institution,
      event_slug: data.eventSlug,
      event_name: data.eventName || data.eventSlug,
      transaction_id: data.transactionId || "N/A",
      needs_accommodation: data.needsAccommodation ? "YES" : "NO",
      participant2: data.participant2 || "N/A",
      email2: data.email2 || "N/A",
      phone2: data.phone2 || "N/A",
      participant3: data.participant3 || "N/A",
      email3: data.email3 || "N/A",
      phone3: data.phone3 || "N/A",
      participant4: data.participant4 || "N/A",
      email4: data.email4 || "N/A",
      phone4: data.phone4 || "N/A",
      timestamp: new Date().toISOString()
    };

    // 4. FTP Storage Execution
    try {
      const fileName = data.screenshotName || `receipt_${Date.now()}.jpg`;
      
      // We pass the data to our robust FTP handler
      const result = await registerToFtp(data.paymentScreenshot, fileName, userData);

      // 5. Increment Count on Success
      try {
        await incrementRegistrationCount(data.eventSlug);
      } catch (countError) {
        console.error("Count increment failed:", countError);
      }

      return NextResponse.json({ 
        message: "Registration successful. Data secured.",
        registrationId: result.id,
        path: result.path
      }, { status: 200 });

    } catch (ftpError: any) {
      console.error("FTP Handler Error:", ftpError);
      return NextResponse.json({ 
        message: "FTP Storage Failure. Registration could not be saved.",
        error: ftpError.message || "FTP_ERROR",
        code: ftpError.code || "UNKNOWN"
      }, { status: 500 });
    }

  } catch (globalError: any) {
    console.error("Critical API Crash:", globalError);
    return NextResponse.json({ 
      message: "Internal sync error occurred.",
      error: globalError.message || "CRASH"
    }, { status: 500 });
  }
}
