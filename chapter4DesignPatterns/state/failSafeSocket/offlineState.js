const jot = require('json-over-tcp');

class OfflineState {
  constructor(failSafeSocket) {
    this.failSafeSocket = failSafeSocket;
  }

  send(data) {
    this.failSafeSocket.queue.push(data);
  }

  activate() {
    const self = this;
    function retry() {
      setTimeout(self.activate.bind(self), 500);
    }

    self.failSafeSocket.socket = jot.connect(
      self.failSafeSocket.options,
      function () {
        self.failSafeSocket.socket.removeListener('error', retry);
        self.failSafeSocket.changeState('online');
      }
    );
    self.failSafeSocket.socket.once('error', retry);
  }
}

module.exports = OfflineState;
