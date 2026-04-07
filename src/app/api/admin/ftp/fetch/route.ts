import { NextRequest, NextResponse } from "next/server";
import { fetchFromFtp } from "@/lib/ftp";

/**
 * ADMIN API: FTP Retrieval Proxy
 * GET /api/admin/ftp/fetch?id={regId}
 * Securely streams payment screenshots from FTP to the Admin UI.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const regId = searchParams.get("id");

    if (!regId) {
      return NextResponse.json({ error: "Missing registration ID" }, { status: 400 });
    }

    // 1. Logic for ADMIN AUTHENTICATION (Placeholder for simplicity)
    // In production, verify session or ADMIN_SECRET header here.
    const isAdmin = true; // TODO: Implement real session check
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Execute Fetch Logic
    const result = await fetchFromFtp(regId);

    // 3. Return Binary Stream
    return new Response(result.buffer, {
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `inline; filename="${result.fileName}"`,
        "Cache-Control": "private, max-age=3600"
      }
    });

  } catch (error: any) {
    console.error("[ADMIN_FETCH_API_ERROR]:", error);
    
    // Detailed error mapping
    const status = error.message.includes("404") ? 404 : 500;
    return NextResponse.json({ 
      error: "Failed to fetch from FTP node", 
      details: error.message 
    }, { status });
  }
}
