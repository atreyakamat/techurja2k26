const http = require('http');

const data = JSON.stringify({
  name: "Test Lead",
  email: "test@example.com",
  phone: "1234567890",
  institution: "Test Inst",
  eventSlug: "test-event",
  eventName: "Test Event"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/register/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
