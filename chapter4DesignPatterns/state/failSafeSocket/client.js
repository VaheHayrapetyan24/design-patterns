const createFailSafeSocket = require('./failSafeSocket');

const failSafeSocket = createFailSafeSocket({ port: 5000 });
setInterval(function() {
  failSafeSocket.send(process.memoryUsage());
}, 1000);
