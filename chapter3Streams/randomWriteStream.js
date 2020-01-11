const http = require('http');
const crypto = require('crypto');

module.exports = () => http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain' });
  for (const i of [1,2,3,4,5]) {
    res.write(crypto.randomBytes(5), 'utf8');
  }
  res.end('\nThe end\n');
  res.on('finish', () => {
    console.log('finished');
  });
}).listen(3000, () => console.log('listening'));
