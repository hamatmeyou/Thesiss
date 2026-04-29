const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route all requests to index.html (for SPA behavior if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Helper to get local IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 ThesisFlow Server is running!`);
  console.log(`-------------------------------------------`);
  console.log(`🏠 Local access:    http://localhost:${PORT}`);
  console.log(`🌐 Remote access:   http://${localIP}:${PORT}`);
  console.log(`-------------------------------------------`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
