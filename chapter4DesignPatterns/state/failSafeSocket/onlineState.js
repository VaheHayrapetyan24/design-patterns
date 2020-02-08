class OnlineState {
  constructor(failSafeSocket) {
    this.failSafeSocket = failSafeSocket;
  }

  send(data) {
    this.failSafeSocket.socket.write(data);
  }

  activate() {
    const self = this;
    self.failSafeSocket.queue.forEach(data => {
      self.failSafeSocket.socket.write(data);
    });
    self.failSafeSocket.queue = [];
    self.failSafeSocket.socket.once('error', function() {
      self.failSafeSocket.changeState('offline');
    });
  }
}

module.exports = OnlineState;
