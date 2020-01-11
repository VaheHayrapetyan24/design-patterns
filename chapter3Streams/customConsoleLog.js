const Readable = require('stream').Readable;

class CustomConsole extends Readable {
  constructor() {
    super({ encoding: 'utf8' });
    this.text = '';
  }

  _read(size) {
    this.push(this.text + '\n');
    this.push(null);
  }

  log(text) {
    this.text = text;
    this.pipe(process.stdout);
  }
}

module.exports = new CustomConsole();
