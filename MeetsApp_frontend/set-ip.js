const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal && !iface.address.startsWith('169.')) {
        return iface.address;
      }
    }
  }
  return null;
}

const ip = getLocalIP();
if (ip) {
  const envPath = path.join(__dirname, '.env');
  const baseUrlLine = `BASE_URL=http://${ip}:5000`;
  fs.writeFileSync(envPath, baseUrlLine + '\n');
  console.log(baseUrlLine);
} else {
  console.log('Could not detect local IP address. BASE_URL not updated.');
}
