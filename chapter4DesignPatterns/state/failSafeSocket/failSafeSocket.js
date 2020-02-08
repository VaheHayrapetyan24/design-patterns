const OfflineState = require('./offlineState');
const OnlineState = require('./onlineState');

class FailSafeSocket {
  constructor(options) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      online: new OnlineState(this),
      offline: new OfflineState(this),
    };
    this.changeState('offline');
  }

  changeState(state) {
    this._validateState(state);
    console.log(state);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send(data) {
    this.currentState.send(data);
  }

  _validateState(state) {
    const allowedStates = Object.keys(this.states);
    if (allowedStates.indexOf(state) === -1) {
      throw new Error('Invalid state');
    }
  }
}

module.exports = (options) => new FailSafeSocket(options);
