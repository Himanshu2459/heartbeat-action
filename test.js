// Test script to run the GitHub Action locally
const { execSync } = require('child_process');

console.log('--- TESTING HEARTBEAT ACTION LOCALLY ---');

// We will use the test token we generated earlier: c7b3e3f2-1cdc-4998-afee-c5b017ccd90b

const runEnv = {
  ...process.env,
  INPUT_TOKEN: 'c7b3e3f2-1cdc-4998-afee-c5b017ccd90b',
  INPUT_STATE: 'run',
  INPUT_API_URL: 'http://localhost:3000'
};

const completeEnv = {
  ...process.env,
  INPUT_TOKEN: 'c7b3e3f2-1cdc-4998-afee-c5b017ccd90b',
  INPUT_STATE: 'complete',
  INPUT_API_URL: 'http://localhost:3000'
};

try {
  console.log('\n[1] Simulating GitHub Action Step: Notify ClockingPulse (Start)');
  execSync('node index.js', { env: runEnv, stdio: 'inherit' });
  
  console.log('\n⏳ Simulating a 3-second build process...');
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000);
  
  console.log('\n[2] Simulating GitHub Action Step: Notify ClockingPulse (Complete)');
  execSync('node index.js', { env: completeEnv, stdio: 'inherit' });
  
  console.log('\n🎉 Test completed successfully!');
} catch (error) {
  console.error('\n❌ Test failed.', error.message);
}
