import * as ftp from "basic-ftp";
import { Readable } from "stream";

export async function registerToFtp(imageData: Buffer | string, fileName: string, userData: Record<string, any>) {
  const client = new ftp.Client();
  // Set a longer timeout for large file uploads
  client.trackProgress(info => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[FTP] Uploading ${info.name}: ${info.bytesOverall} bytes`);
    }
  });

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

    const remotePath = `registrations/${registrationId}`;
    await client.ensureDir(remotePath);

    // 1. Upload CSV
    const csvContent = Object.keys(userData)
      .map(key => `"${key}","${String(userData[key]).replace(/"/g, '""')}"`)
      .join("\n");
    
    await client.uploadFrom(Readable.from(csvContent), `${remotePath}/details.csv`);

    // 2. Upload Image
    if (imageData && imageData !== "NO_SCREENSHOT") {
      await client.ensureDir(`${remotePath}/image`);
      
      let buffer: Buffer;
      if (typeof imageData === "string") {
        // Strip the data:image/jpeg;base64, prefix if it exists
        const base64Data = imageData.includes(",") ? imageData.split(",")[1] : imageData;
        buffer = Buffer.from(base64Data, "base64");
      } else {
        buffer = imageData;
      }
      
      // Upload directly from buffer for better performance in serverless
      await client.uploadFrom(Readable.from(buffer), `${remotePath}/image/${fileName}`);
    }

    return { ok: true, id: registrationId, path: remotePath };

  } catch (err) {
    console.error("FTP Core Error:", err);
    throw err;
  } finally {
    client.close();
  }
}
