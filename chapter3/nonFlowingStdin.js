// streams2

// reads data from console and echos

// can pipe a program to this
// comment out the wrapper function // module.exports = () => {
// then run this by "cat path/to/a/file | node path/to/this/file"

module.exports = () => {
  process.stdin.setEncoding('utf8');

  process.stdin
    .on('readable', () => {
      let chunk;
      while((chunk = process.stdin.read()) !== null) {
        console.log('Chunk: ' + chunk.length + ' : ' + chunk.toString());
      }
    })
    .on('end', () => console.log('Finished'));
};
