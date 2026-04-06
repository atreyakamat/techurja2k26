const ftp = require('basic-ftp');

async function verifyUpload() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    console.log("> Connecting to FTP server...");
    await client.access({
      host: 'ftp.aitdgoa.edu.in',
      user: 'techurja_folder@aitdgoa.edu.in',
      password: process.env.FTP_PASSWORD,
      port: 21,
      secure: false
    });
    
    console.log("\n> Listing registrations folder...");
    await client.cd('registrations');
    const folders = await client.list();
    
    console.log(`\n> Found ${folders.length} registration folders:`);
    const recentFolders = folders
      .filter(f => f.type === 2) // directories only
      .sort((a, b) => b.modifiedAt - a.modifiedAt)
      .slice(0, 5);
    
    for (const folder of recentFolders) {
      console.log(`  - ${folder.name} (${folder.modifiedAt})`);
    }
    
    if (recentFolders.length > 0) {
      const latestFolder = recentFolders[0].name;
      console.log(`\n> Checking latest folder: ${latestFolder}`);
      await client.cd(latestFolder);
      const files = await client.list();
      console.log(`  Files in ${latestFolder}:`);
      for (const file of files) {
        console.log(`    - ${file.name} (${file.size} bytes)`);
      }
      
      // Check image subfolder
      const imageDir = files.find(f => f.name === 'image' && f.type === 2);
      if (imageDir) {
        await client.cd('image');
        const imageFiles = await client.list();
        console.log(`  Files in ${latestFolder}/image:`);
        for (const file of imageFiles) {
          console.log(`    - ${file.name} (${file.size} bytes)`);
        }
      }
    }
    
    console.log("\n>>> VERIFICATION COMPLETE ✓");
  } catch (err) {
    console.error(">>> VERIFICATION FAILED:", err.message);
  } finally {
    client.close();
  }
}

verifyUpload();
