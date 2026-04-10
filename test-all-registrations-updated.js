const http = require('http');

const events = [
  { slug: "robowar-15kg", name: "ROBOWAR (15KG)", registrationFee: 1180, formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true } },
  { slug: "robowar-8kgs", name: "ROBOWAR (8KGS)", registrationFee: 944, formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true } },
  { slug: "robowar-3lbs", name: "ROBOWAR (3LBS)", registrationFee: 590, formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true } },
  { slug: "robo-nexus", name: "ROBO NEXUS", registrationFee: 472, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "cyber-strike", name: "CYBER STRIKE", registrationFee: 413, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "grid-runner", name: "GRID RUNNER", registrationFee: 295, formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true } },
  { slug: "santo-domingo-race", name: "SANTO DOMINGO RACE", registrationFee: 354, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "cyber-tug", name: "CYBER TUG", registrationFee: 354, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "escape-the-matrix", name: "ESCAPE THE MATRIX", registrationFee: 118, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "innovibe", name: "INNOVIBE", registrationFee: 236, formConfig: { minParticipants: 1, maxParticipants: 4, hasTeamName: true } },
  { slug: "kabuki-roundabout", name: "KABUKI ROUNDABOUT", registrationFee: 354, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "neon-span", name: "NEON SPAN", registrationFee: 295, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "ghostgrid", name: "GHOSTGRID", registrationFee: 118, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "circuit-breach", name: "CIRCUIT BREACH", registrationFee: 236, formConfig: { minParticipants: 2, maxParticipants: 2, hasTeamName: true } },
  { slug: "war-room-protocol", name: "WAR ROOM PROTOCOL", registrationFee: 236, formConfig: { minParticipants: 3, maxParticipants: 3, hasTeamName: true } },
  { slug: "pixel-play", name: "PIXEL PLAY", registrationFee: 295, formConfig: { minParticipants: 1, maxParticipants: 1, hasTeamName: false } },
  { slug: "clashpunk", name: "CLASHPUNK", registrationFee: 59, formConfig: { minParticipants: 1, maxParticipants: 1, hasTeamName: false } },
  { slug: "the-cypher-heist", name: "THE CYPHER HEIST", registrationFee: 295, formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true } },
  { slug: "cyber-smashers", name: "CYBER SMASHERS", registrationFee: 59, formConfig: { minParticipants: 1, maxParticipants: 1, hasTeamName: false } },
  { slug: "techyothon", name: "TECHYOTHON", registrationFee: 590, formConfig: { minParticipants: 2, maxParticipants: 4, hasTeamName: true }, isClosed: true },
  { slug: "symmetry-art", name: "SYMMETRY ART", registrationFee: "Free", formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true } },
  { slug: "structomat", name: "STRUCTOMAT", registrationFee: "Free", formConfig: { minParticipants: 4, maxParticipants: 4, hasTeamName: true } }
];

const PORT = 3000;
const minimalImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
const TEST_ID = `AI_TEST_${Date.now()}`;

async function sendRequest(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: body
        });
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log(`Starting COMPREHENSIVE registration tests for ${events.length} events on port ${PORT}...`);
  console.log(`TEST_ID: ${TEST_ID}\n`);

  for (const event of events) {
    console.log(`Testing Event: ${event.name} (${event.slug})`);
    
    const isPaid = event.registrationFee !== "Free";
    
    const payload = {
      name: `Test User ${event.slug}`,
      email: `test_${event.slug}@example.com`,
      phone: "9988776655",
      institution: "AI Testing Lab",
      eventSlug: event.slug,
      eventName: event.name,
      transactionId: isPaid ? `TXN_${Date.now()}` : "N/A",
      paymentScreenshot: isPaid ? minimalImage : "NO_SCREENSHOT",
      screenshotName: `test_${event.slug}.png`,
      needsAccommodation: false,
      agreedToRefundPolicy: isPaid ? true : undefined,
      teamName: event.formConfig.hasTeamName ? `Team ${event.slug}` : "",
      testId: TEST_ID
    };

    // Add required participants
    for (let i = 2; i <= event.formConfig.minParticipants; i++) {
      payload[`participant${i}`] = `Participant ${i} ${event.slug}`;
      payload[`email${i}`] = `p${i}_${event.slug}@example.com`;
      payload[`phone${i}`] = `998877665${i}`;
    }

    try {
      const res = await sendRequest(payload);
      const isExpectedFailure = event.isClosed || (event.slug === 'techyothon');
      
      let statusIcon = '❌';
      if (res.status === 200 && !isExpectedFailure) statusIcon = '✅';
      if (res.status === 403 && isExpectedFailure) statusIcon = '🔒 (Expected Closed/Cap)';
      
      console.log(`  Status: ${res.status} ${statusIcon}`);
      if (res.status !== 200 && !isExpectedFailure) {
        console.log(`  Response: ${res.body}`);
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }

    console.log('-----------------------------------');
  }

  console.log('\nAll tests completed.');
}

runTests();
