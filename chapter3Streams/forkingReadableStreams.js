const fs = require('fs');

let endCount = 0;
function end(write) {
  ++endCount;
  if (endCount === 2) {
    write.end();
  }
}

module.exports = () => {
  const read1 = fs.createReadStream('/home/vahe/Practice/nodeDesignPatterns/files/shit.txt');
  const read2 = fs.createReadStream('/home/vahe/Practice/nodeDesignPatterns/files/dumbShit.txt');

  const write = fs.createWriteStream('/home/vahe/Practice/nodeDesignPatterns/files/bullshit.txt');

  read1.on('end', () => end(write));
  read2.on('end', () => end(write));

  read1.pipe(write, { end: false });
  read2.pipe(write, { end: false });
};
