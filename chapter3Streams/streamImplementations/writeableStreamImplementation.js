const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class WriteableStream extends stream.Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), (err) => {
      if (err) {
        return callback(err);
      }
      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

module.exports = () => {
  const tfs = new WriteableStream();
  tfs.write({ path: "file1.txt", content: 'sup biatch' });
  tfs.end(() => {
    console.log('finished');
  })
};
