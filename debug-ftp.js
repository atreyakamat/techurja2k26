const ftp = require('basic-ftp');
const { Readable } = require('stream');
require('dotenv').config();

async function debugFtp() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  // Load credentials from environment variables
  const FTP_HOST = process.env.FTP_HOST;
  const FTP_USER = process.env.FTP_USER;
  const FTP_PASSWORD = process.env.FTP_PASSWORD;

  if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
    console.error("ERROR: Missing FTP credentials in .env file");
    console.error("Please set FTP_HOST, FTP_USER, and FTP_PASSWORD in your .env file");
    process.exit(1);
  }
  
  try {
    console.log(`> Attempting connection to ${FTP_HOST}...`);
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: 21,
      secure: false
    });
    
    console.log("> LOGIN SUCCESSFUL.");
    
    console.log("> Checking Current Working Directory...");
    const pwd = await client.pwd();
    console.log(`> CWD: ${pwd}`);
    
    console.log("> Listing root files...");
    const list = await client.list();
    console.log("> Root contents:", list.map(f => f.name));

    const testId = `TEST_${Date.now()}`;
    const remotePath = `registrations/${testId}`;
    
    console.log(`> Attempting to ensureDir: ${remotePath}`);
    await client.ensureDir(remotePath);
    console.log("> ensureDir SUCCESSFUL.");

    console.log("> Attempting dummy file upload...");
    const content = "test data";
    // Use relative path since we're already inside the directory
    await client.uploadFrom(Readable.from(content), "test.txt");
    console.log("> Upload SUCCESSFUL.");

    console.log("> Cleanup: deleting test file...");
    await client.remove("test.txt");
    console.log("> Navigating back to registrations folder...");
    await client.cdup();
    console.log("> Removing test directory...");
    await client.removeDir(testId);
    
    console.log(">>> DIAGNOSTIC COMPLETE: FTP NODE IS FULLY FUNCTIONAL.");
  } catch (err) {
    console.error(">>> DIAGNOSTIC FAILED:", err.message);
    console.error("Stack:", err.stack);
  } finally {
    client.close();
  }
}

debugFtp();
