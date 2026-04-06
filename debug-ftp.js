const ftp = require('basic-ftp');
const { Readable } = require('stream');

async function debugFtp() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    console.log("> Attempting connection to ftp.aitdgoa.edu.in...");
    await client.access({
      host: 'ftp.aitdgoa.edu.in',
      user: 'techurja_folder@aitdgoa.edu.in',
      password: 'AitdTech@2026',
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
    await client.uploadFrom(Readable.from(content), `${remotePath}/test.txt`);
    console.log("> Upload SUCCESSFUL.");

    console.log("> Cleanup: deleting test file and dir...");
    await client.remove(`${remotePath}/test.txt`);
    // basic-ftp doesn't have a recursive rm, just checking success so far is enough
    
    console.log(">>> DIAGNOSTIC COMPLETE: FTP NODE IS FULLY FUNCTIONAL.");
  } catch (err) {
    console.error(">>> DIAGNOSTIC FAILED:", err.message);
    console.error("Stack:", err.stack);
  } finally {
    client.close();
  }
}

debugFtp();
