const fs = require('fs');
const writable = fs.createWriteStream('shit.txt');

function createLoggingWriteable(writableOg) {
  class LoggingWritableStream extends Object.create(Object.getPrototypeOf(writableOg)) {
    write(chunk, encoding, callback) {
      if(!callback && typeof encoding === 'function') {
        callback = encoding;
        encoding = undefined;
      }

      console.log('Writing ', chunk);
      return super.write(chunk, encoding, function () {
        console.log('Finished writing ' + chunk);
        callback && callback();
      })
    }
  }

  return new LoggingWritableStream();
}

const writableProxy = createLoggingWriteable(writable);
writableProxy.write('shiiiiiit');
writableProxy.end();
