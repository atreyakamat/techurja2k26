const http = require('http');

const slugs = [
  "robowar-15kg", "robowar-8kgs", "robowar-3lbs", "robo-nexus", 
  "cyber-strike", "grid-runner", "santo-domingo-race", "cyber-tug", 
  "escape-the-matrix", "innovibe", "kabuki-roundabout", "neon-span", 
  "ghostgrid", "circuit-breach", "war-room-protocol", "pixel-play", 
  "clashpunk", "the-cypher-heist", "cyber-smashers", "techyothon", 
  "symmetry-art", "structomat"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: e.message });
    });
  });
}

async function run() {
  // wait 3 seconds for server to boot
  await new Promise(r => setTimeout(r, 3000));

  let hasError = false;
  for (const slug of slugs) {
    const eventUrl = `http://localhost:3001/events/${slug}`;
    const registerUrl = `http://localhost:3001/register/${slug}`;
    
    const r1 = await checkUrl(eventUrl);
    const r2 = await checkUrl(registerUrl);
    
    if (r1.status !== 200 || r2.status !== 200) {
      console.log(`ERROR: ${eventUrl} -> ${r1.status} | ${registerUrl} -> ${r2.status}`);
      hasError = true;
    } else {
      console.log(`OK: ${slug}`);
    }
  }
  
  if (!hasError) {
    console.log("All URLs returned 200 OK!");
  }
}

run();