import * as ftp from "basic-ftp";
import { Readable } from "stream";

/**
 * PRODUCTION-GRADE FTP HANDLER
 * Optimized for cPanel/Pure-FTPd servers to avoid 553 errors.
 */
export async function registerToFtp(imageData: Buffer | string, fileName: string, userData: Record<string, any>) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  const registrationId = `REG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";

    await client.access({
      host: process.env.FTP_HOST || "ftp.aitdgoa.edu.in",
      user: process.env.FTP_USER || "techurja_folder@aitdgoa.edu.in",
      password: rawPassword,
      secure: false,
      port: 21, // Explicitly using port 21
    });

    // 1. ENSURE BASE DIRECTORY AND NAVIGATE
    // We navigate into the folder so we can upload files using just their names.
    // This bypasses the 553 "No such file or directory" error on strict servers.
    await client.ensureDir(`registrations/${registrationId}`);
    // No leading slash in ensureDir for basic-ftp relative paths

    // 2. UPLOAD USER DATA CSV
    const csvContent = Object.keys(userData)
      .map(key => `"${key}","${String(userData[key]).replace(/"/g, '""')}"`)
      .join("\n");
    
    // Uploading to current directory (which is now registrations/ID)
    await client.uploadFrom(Readable.from(csvContent), "details.csv");

    // 3. UPLOAD IMAGE
    if (imageData && imageData !== "NO_SCREENSHOT") {
      // Create and move into image subfolder
      await client.ensureDir("image");
      
      let buffer: Buffer;
      if (typeof imageData === "string") {
        const base64Data = imageData.includes(",") ? imageData.split(",")[1] : imageData;
        buffer = Buffer.from(base64Data, "base64");
      } else {
        buffer = imageData;
      }
      
      // Uploading to current directory (registrations/ID/image)
      await client.uploadFrom(Readable.from(buffer), fileName);
    }

    return { 
      ok: true, 
      id: registrationId, 
      path: `registrations/${registrationId}` 
    };

  } catch (err) {
    console.error("FTP PROD ERROR:", err);
    throw err;
  } finally {
    client.close();
  }
}
