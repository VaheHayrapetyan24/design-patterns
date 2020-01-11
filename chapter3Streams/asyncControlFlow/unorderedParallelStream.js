const stream = require('stream');

class ParallelStream extends stream.Transform {
  constructor(userTransform) {
    super({ objectMode: true });
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this._onComplete.bind(this));
    done();
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) return this.emit('error', err);

    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}

const fs = require('fs');
const split = require('split');
const request = require('request');



module.exports = () => {
  fs.createReadStream(process.argv[2])
    .pipe(split())
    .pipe(new ParallelStream(function (url, enc, done) {
      if (!url) return done();

      const self = this;
      request.head(url, (err, response) => {
        self.push(url + ' is ' + (err ? 'down' : 'up') + '\n');
        done();
      });
    }))
    .pipe(fs.createWriteStream('results.txt'))
    .on('finish', () => console.log('finished'));

};
