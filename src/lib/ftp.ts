import * as ftp from "basic-ftp";
import { Readable } from "stream";

/**
 * Robust FTP registration handler (No-Database Architecture)
 * 1. Creates a directory: /registrations/{timestamp_id}/
 * 2. Uploads user data to: details.csv
 * 3. Uploads image to: /image/{original_name}
 */
export async function registerToFtp(imageData: Buffer | string, fileName: string, userData: Record<string, any>) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  // Use timestamp + random for a unique ID since we don't have an auto-incrementing DB
  const registrationId = `REG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";

    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21,
    });

    // Root directory for this registration
    const remotePath = `registrations/${registrationId}`;
    await client.ensureDir(remotePath);

    // 1. CREATE AND UPLOAD THE CSV (User Data)
    const csvContent = Object.keys(userData)
      .map(key => `"${key}","${String(userData[key]).replace(/"/g, '""')}"`)
      .join("\n");
    
    const csvStream = Readable.from(csvContent);
    await client.uploadFrom(csvStream, `${remotePath}/details.csv`);

    // 2. CREATE IMAGE FOLDER AND UPLOAD SCREENSHOT
    if (imageData && imageData !== "NO_SCREENSHOT") {
      await client.ensureDir(`${remotePath}/image`);
      
      let imageStream: Readable;
      if (typeof imageData === "string") {
        const base64Data = imageData.split(",")[1] || imageData;
        imageStream = Readable.from(Buffer.from(base64Data, "base64"));
      } else {
        imageStream = Readable.from(imageData);
      }
      
      await client.uploadFrom(imageStream, `${remotePath}/image/${fileName}`);
    }

    return { 
      ok: true, 
      id: registrationId, 
      path: remotePath 
    };

  } catch (err) {
    console.error("FTP storage failed:", err);
    throw err;
  } finally {
    client.close();
  }
}
