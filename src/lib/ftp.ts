import * as ftp from "basic-ftp";
import { Readable } from "stream";

export async function uploadToFtp(registrationId: string, imageData: Buffer | string, fileName: string, userData: Record<string, unknown>) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    // Decode password if it was URL encoded (e.g. %40 for @)
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";

    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false, // Set to true if your FTP server supports implicit FTPS
      port: 21,
    });

    // Use relative path for ensuring directory (removes leading slash)
    const remotePath = `registrations/${registrationId}`;
    await client.ensureDir(remotePath);

    // 1. Upload the image
    let imageStream: Readable;
    if (typeof imageData === "string") {
      // Assuming it's a base64 string
      const base64Data = imageData.split(",")[1] || imageData;
      imageStream = Readable.from(Buffer.from(base64Data, "base64"));
    } else {
      imageStream = Readable.from(imageData);
    }
    
    await client.uploadFrom(imageStream, `${remotePath}/${fileName}`);

    // 2. Create and upload the CSV file
    const csvContent = Object.keys(userData)
      .map(key => `"${key}","${String(userData[key]).replace(/"/g, '""')}"`)
      .join("\n");
    
    const csvStream = Readable.from(csvContent);
    await client.uploadFrom(csvStream, `${remotePath}/details.csv`);

    return { ok: true };
  } catch (err) {
    console.error("FTP upload failed:", err);
    throw err;
  } finally {
    client.close();
  }
}
