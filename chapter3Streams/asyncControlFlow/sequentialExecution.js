const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

// concats files together

function concatFiles(destination, files, callback) {
  const destStream = fs.createWriteStream(destination);

  fromArray.obj(files)
    .pipe(through.obj(function (file, enc, done) {
      const src = fs.createReadStream(file);
      src.pipe(destStream, { end: false });

      src.on('end', done);
    }))
    .on('finish', function () {
      destStream.end();
      callback();
    });
}

// concatFiles('shit.txt', [ '/home/vahe/Practice/nodeDesignPatterns/files/dumbShit.txt', "/home/vahe/Practice/nodeDesignPatterns/files/shit.txt"], () => console.log("aaaa"))

module.exports = concatFiles;
