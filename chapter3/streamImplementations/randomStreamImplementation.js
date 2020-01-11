const stream = require('stream');
const crypto = require('crypto');
class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
    this._index = 0;
  }
  _read(size) {
    if (this._index++ < 5) {
      const chunk = crypto.randomBytes(size);
      this.push(chunk, 'utf8');
    }
    this.push(null);
  }
}

module.exports = () => {
  const randomStream = new RandomStream();
  randomStream.on('readable', () => {
    let chunk;
    while((chunk = randomStream.read()) !== null) {
      console.log('Chunk: ' + chunk);
    }
  }).on('end', () => console.log('done'));
};
