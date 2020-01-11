const http = require('http');
const crypto = require('crypto');

module.exports = () => http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain' });
  function generateMore() {
    for (const i of [1,2]) { // don't fuck with this
      const shouldContinue = res.write(crypto.randomBytes(1024), 'utf8');
      if (!shouldContinue) {
        console.log('Back pressure');
        return res.once('drain', () => { console.log('drained');generateMore(); });
      }
    }
    res.end('\nThe end\n', () => console.log('finished'));
  }
  generateMore();
}).listen(3000, () => console.log('listening'));
