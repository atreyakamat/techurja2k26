const ftp = require("basic-ftp");
const dotenv = require("dotenv");
dotenv.config();

async function testConnection() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    const rawPassword = process.env.FTP_PASSWORD ? decodeURIComponent(process.env.FTP_PASSWORD) : "";
    
    console.log(`> Connecting to ${process.env.FTP_HOST} as ${process.env.FTP_USER}...`);
    
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: rawPassword,
      secure: false,
      port: 21,
    });

    console.log("> Connection SUCCESSFUL.");
    
    // Check if registrations directory exists or create it
    console.log("> Checking for 'registrations' directory...");
    await client.ensureDir("registrations");
    
    console.log("> Listing current registrations:");
    const list = await client.list("registrations");
    console.log(list.map(f => f.name).join(", ") || "(empty)");

    console.log("> ALL SYSTEMS GO.");
  } catch (err) {
    console.error("> Connection FAILED:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

testConnection();
