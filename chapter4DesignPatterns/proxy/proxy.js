// es6 has proxies built in

// composition approach
function createProxy(subject) { // maintains prototype chain
  const proto = Object.getPrototypeOf(subject);

  function Proxy(subject) {
    this.subject = subject;
  }

  Proxy.prototype = Object.create(proto);

  Proxy.prototype.hello = function() {
    return this.subject.hello() + 'world';
  };

  Proxy.prototype.goodbye = function() {
    return this.subject.goodbye.apply(this.subject, arguments);
  };

  return new Proxy(subject);
}
