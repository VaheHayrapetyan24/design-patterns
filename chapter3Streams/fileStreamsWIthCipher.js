const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');

const iv = crypto.randomBytes(16);
const encryptionKey = Buffer.from('12345678901234567890123456789012');

// Create server with one endpoint that responds with gzipped and encrypted file
module.exports.cipherServer = () => {
  const server = http.createServer((req, res) => {
    fs.createReadStream(__filename)
      .pipe(zlib.createGzip())
      .pipe(crypto.createCipheriv('aes-256-cbc', encryptionKey, iv))
      .pipe(res)
      .on('finish', () => console.log('done'))
  });

  server.listen(3000, () => {
    console.log('server listening');
  });
};

module.exports.decipher = () => {
  const writeStream = fs.createWriteStream('/home/vahe/Downloads/deciphered.gzip');
  fs.createReadStream('/home/vahe/Downloads/response.txt')
    .pipe(crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv))
    // .pipe(zlib.createGunzip())
    .pipe(writeStream)
    .on('finish', () => console.log('done'));
};
