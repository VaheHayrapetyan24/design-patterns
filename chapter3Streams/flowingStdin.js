// this is old version streams1

module.exports = () => {
  process.stdin.setEncoding('utf8');

  process.stdin
    .on('data', (chunk) => {
        console.log('Chunk: ' + chunk.length + ' : ' + chunk.toString());
    })
    .on('end', () => console.log('Finished'));
};
