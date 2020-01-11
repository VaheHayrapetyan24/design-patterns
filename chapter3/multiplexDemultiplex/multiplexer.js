const child_process = require('child_process');
const net = require('net');
const path = require('path');

/**
 * pipes many streams into one stream
 * for each chunk we do
 * :1 byte for stream id :4 bytes for chunk length :data
 * @param {Array<ReadableStream>} sources
 * @param {WritableStream} destination
 * @return undefined
 */
function multiplexChannels(sources, destination) {
  let totalChannels = sources.length;

  for (let i = 0; i < sources.length; ++i) {
    sources[i]
      .on('readable', function (i) {
        let chunk;
        while ((chunk = this.read()) !== null) {
          const outBuffer = new Buffer.alloc(1 + 4 + chunk.length);
          outBuffer.writeUInt8(i, 0);
          outBuffer.writeUInt32BE(chunk.length, 1);
          chunk.copy(outBuffer, 5);
          console.log(`sending to channel ${i}`);
          destination.write(outBuffer);
        }
      }.bind(sources[i], i)) // todo might not need this. the callback function is a closure
      .on('end', () => {
        if (--totalChannels) {
          return null;
        }
        return destination.end();
      });
  }
}

const socket = net.connect(3000, function () {
  const child = child_process.fork(process.argv[2], process.argv.slice(3), { silent: true });
  multiplexChannels([child.stdout, child.stderr], socket);
});
