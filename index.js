const token = process.env.INPUT_TOKEN;
const state = process.env.INPUT_STATE || 'run';

if (!token) {
  console.error('❌ ClockingPulse Action Failed: The "token" input is required.');
  process.exit(1);
}

const validStates = ['run', 'complete', 'fail'];
if (!validStates.includes(state)) {
  console.error(`❌ ClockingPulse Action Failed: Invalid state "${state}". Must be one of: ${validStates.join(', ')}.`);
  process.exit(1);
}

const url = `https://clockingpulse.com/api/heartbeat/${token}?state=${state}`;

console.log(`📡 Pinging ClockingPulse Heartbeat: ${url}`);

fetch(url, {
  method: 'POST',
  headers: {
    'User-Agent': 'clockingpulse-heartbeat-action/1.0',
    'Content-Type': 'application/json'
  }
})
  .then(async (res) => {
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(`❌ ClockingPulse Action Failed: API returned ${res.status} ${res.statusText}`);
      if (body) console.error(`Response Body: ${body}`);
      process.exit(1);
    }
    console.log(`✅ Successfully pinged ClockingPulse (${res.status})!`);
  })
  .catch((err) => {
    console.error(`❌ ClockingPulse Action Failed: Network error occurred while pinging the API.`);
    console.error(err.message || err);
    process.exit(1);
  });
