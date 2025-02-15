const net = require('net');
const fs = require('fs');

function demultiplexChannel(source, destinations) {
  let currentChannel = null;
  let currentLength = null;

  source.on('readable', function () {
    let chunk;
    if (currentChannel === null) {
      chunk = this.read(1);
      currentChannel = chunk && chunk.readUInt8(0);
    }

    if (currentLength === null) {
      chunk = this.read(4);
      currentLength = chunk && chunk.readUInt32BE(0);
      if (currentLength === null)
        return;
    }

    chunk = this.read(currentLength);
    if (chunk === null)
      return;

    console.log(`Received chunk from channel: ${currentChannel}`);
    destinations[currentChannel].write(chunk);
    currentChannel = null;
    currentLength = null;
  })
    .on('end', function () {
      destinations.forEach(destination => destination.end());
      console.log('Source channel closed');
    });
}

net.createServer(function(socket) {
  const stdoutStream = fs.createWriteStream('stdout.log');
  const stderrStream = fs.createWriteStream('stderr.log');

  demultiplexChannel(socket, [stdoutStream, stderrStream]);
}).listen(3000, () => console.log('started'));
