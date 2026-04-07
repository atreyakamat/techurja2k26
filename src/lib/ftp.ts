import * as ftp from "basic-ftp";
import { Readable } from "stream";
import { getEventOffset } from "./registration-caps";

/**
 * PRODUCTION-GRADE FTP HANDLER
 * Optimized for cPanel/Pure-FTPd servers to avoid 553 errors.
 */
export async function registerToFtp(imageData: Buffer | string, fileName: string, userData: Record<string, any>) {
  const client = new ftp.Client();
  client.ftp.verbose = false; // Disable verbose logging for production

  const registrationId = `REG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  console.log(`[FTP] Starting registration ${registrationId}`);
  
  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";

    // Validate required environment variables
    if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASSWORD) {
      throw new Error("Missing FTP credentials. Please set FTP_HOST, FTP_USER, and FTP_PASSWORD environment variables.");
    }

    console.log(`[FTP] Connecting to ${process.env.FTP_HOST}...`);
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21, // Explicitly using port 21
    });
    console.log(`[FTP] Connected successfully`);

    // 1. ENSURE BASE DIRECTORY AND NAVIGATE STEP-BY-STEP
    // Some servers fail on multi-level ensureDir if parent doesn't exist
    // We navigate step-by-step to be extra safe on strict cPanel/Pure-FTPd servers
    console.log(`[FTP] Navigating to registrations folder...`);
    await client.ensureDir("registrations");
    
    console.log(`[FTP] Creating/Navigating to ID folder: ${registrationId}`);
    await client.ensureDir(registrationId);
    
    // 2. UPLOAD USER DATA CSV
    const csvContent = Object.keys(userData)
      .map(key => `"${key}","${String(userData[key]).replace(/"/g, '""')}"`)
      .join("\n");
    
    console.log(`[FTP] Uploading CSV data...`);
    // Uploading to current directory (which is now registrations/ID)
    await client.uploadFrom(Readable.from(csvContent), "details.csv");
    console.log(`[FTP] CSV uploaded successfully`);

    // 3. UPLOAD IMAGE
    if (imageData && imageData !== "NO_SCREENSHOT") {
      console.log(`[FTP] Creating/Navigating to image directory...`);
      // Create and move into image subfolder
      await client.ensureDir("image");
      
      let buffer: Buffer;
      if (typeof imageData === "string") {
        const base64Data = imageData.includes(",") ? imageData.split(",")[1] : imageData;
        buffer = Buffer.from(base64Data, "base64");
      } else {
        buffer = imageData;
      }
      
      // CRITICAL: Sanitize filename to prevent 553 errors from path components
      // Extract just the filename and sanitize it
      const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').split('/').pop() || 'screenshot.jpg';
      
      console.log(`[FTP] Uploading image: ${safeFileName} (${buffer.length} bytes)...`);
      // Uploading to current directory (registrations/ID/image)
      await client.uploadFrom(Readable.from(buffer), safeFileName);
      console.log(`[FTP] Image uploaded successfully`);
    }

    console.log(`[FTP] Registration ${registrationId} completed successfully`);
    return { 
      ok: true, 
      id: registrationId, 
      path: `registrations/${registrationId}` 
    };

  } catch (err: any) {
    console.error("[FTP] ERROR:", err);
    // Enhance error message for the API response
    if (err.code === 553) {
      err.message = `FTP 553 Error: ${err.message} (Likely due to invalid filename or permission issue). Ensure registrations/ directory exists.`;
    }
    throw err;
  } finally {
    console.log(`[FTP] Closing connection`);
    client.close();
  }
}

/**
 * NEW: TRACKING & COUNTING LOGIC (Separate from registrations folder)
 * Checks the current count for a specific event slug.
 */
export async function getRegistrationCount(eventSlug: string): Promise<number> {
  const client = new ftp.Client();
  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21,
    });

    // We keep this in a separate folder so it doesn't break the admin's mapping of the registrations/ folder.
    await client.ensureDir("_event_metadata/counts");
    
    const countFile = `${eventSlug}.txt`;
    const buffers: Buffer[] = [];
    
    try {
      await client.downloadTo(
        { write: (chunk: Buffer) => { buffers.push(chunk); return chunk.length; } } as any, 
        countFile
      );
      const current = parseInt(Buffer.concat(buffers).toString().trim()) || 0;
      // Total count = Recorded on FTP + Initial Offset from code
      return current + getEventOffset(eventSlug);
    } catch {
      // If file doesn't exist, count is just the offset
      return getEventOffset(eventSlug);
    }
  } catch (err) {
    console.error("[FTP_COUNT_READ_ERROR]", err);
    return getEventOffset(eventSlug); // Default to offset on failure
  } finally {
    client.close();
  }
}

/**
 * Increment the count for a specific event slug.
 */
export async function incrementRegistrationCount(eventSlug: string): Promise<void> {
  const client = new ftp.Client();
  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21,
    });

    await client.ensureDir("_event_metadata/counts");
    const countFile = `${eventSlug}.txt`;
    
    // Read existing
    const buffers: Buffer[] = [];
    let count = 0;
    try {
      await client.downloadTo(
        { write: (chunk: Buffer) => { buffers.push(chunk); return chunk.length; } } as any, 
        countFile
      );
      count = parseInt(Buffer.concat(buffers).toString().trim()) || 0;
    } catch {}

    // Increment and upload
    const nextCount = count + 1;
    await client.uploadFrom(Readable.from(`${nextCount}`), countFile);
    console.log(`[FTP] Count for ${eventSlug} incremented to ${nextCount}`);
  } catch (err) {
    console.error("[FTP_COUNT_INC_ERROR]", err);
  } finally {
    client.close();
  }
}

/**
 * ADMIN FETCH LOGIC: Retrieves a file from FTP for verification.
 * Reverses the registration process to discover and download dynamic filenames.
 */
export async function fetchFromFtp(registrationId: string) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  console.log(`[FTP_FETCH_INIT]: Fetching data for ${registrationId}`);

  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";

    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21,
    });
    console.log(`[FTP_CONNECT]: Connected for fetch operation`);

    // 1. Navigate to the registration directory
    const remotePath = `registrations/${registrationId}/image/`;
    console.log(`[FTP] Navigating to: ${remotePath}`);
    
    // Check if directory exists and list files
    const files = await client.list(remotePath);
    
    if (files.length === 0) {
      throw new Error(`[FTP_ERROR_404]: No files found in ${remotePath}`);
    }

    // 2. Identify the screenshot (first file in the image/ directory)
    const targetFile = files[0].name;
    const fullFilePath = `${remotePath}${targetFile}`;
    console.log(`[FTP] Found file: ${targetFile}`);

    // 3. Download to buffer
    const buffers: Buffer[] = [];
    await client.downloadTo(
      {
        write: (chunk: Buffer) => {
          buffers.push(chunk);
          return chunk.length;
        },
      } as any, 
      fullFilePath
    );

    const completeBuffer = Buffer.concat(buffers);
    console.log(`[FTP_FETCH_SUCCESS]: ${registrationId} (${completeBuffer.length} bytes)`);

    return {
      buffer: completeBuffer,
      fileName: targetFile,
      mimeType: targetFile.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
    };

  } catch (err: any) {
    console.error(`[FTP_ERROR_${err.code || 'UNKNOWN'}]:`, err.message);
    throw err;
  } finally {
    console.log(`[FTP_DISCONNECT]: Closing fetch connection`);
    client.close();
  }
}
