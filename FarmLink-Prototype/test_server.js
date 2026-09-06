const http = require('http');

http.get('http://localhost:5173', (res) => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response size:', data.length);
    console.log('Contains app-splash-screen:', data.includes('id="app-splash-screen"'));
    console.log('Contains splash-agri-svg:', data.includes('splash-agri-svg'));
    console.log('Contains splash-status-message:', data.includes('id="splash-status-message"'));
  });
}).on('error', (err) => {
  console.error('HTTP Error:', err.message);
});
