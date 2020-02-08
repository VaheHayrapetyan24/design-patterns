const jot = require('json-over-tcp');

const server = jot.createServer();
server.on('connection', function(socket) {
  socket.on('data', function(data) {
    console.log('Received data: ', data);
  });
});

server.listen(5000, () => console.log('Started'));
