const http = require('http');

// Create a minimal base64 image (1x1 pixel white PNG)
const minimalImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

const data = JSON.stringify({
  name: "Test Participant",
  email: "test@example.com",
  phone: "9876543210",
  institution: "Test Institute",
  teamName: "Test Team",
  eventSlug: "test-event-slug",
  eventName: "Test Event Name",
  transactionId: "TEST_TXN_" + Date.now(),
  paymentScreenshot: minimalImage,
  screenshotName: "test_screenshot.png",
  needsAccommodation: false
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('Sending registration request to http://localhost:3001/api/register...\n');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('\nRESPONSE BODY:');
    try {
      const parsed = JSON.parse(body);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(body);
    }
  });
});

req.on('error', (e) => {
  console.error(`ERROR: ${e.message}`);
});

req.write(data);
req.end();
