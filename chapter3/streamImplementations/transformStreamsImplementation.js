const stream = require('stream');

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super({ decodeStrings: false, encoding: 'utf8' });
    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = '';
  }

  _transform(chunk, encoding, callback) {
    let pieces = (this.tailPiece + chunk).split(this.searchString);

    const lastPiece = pieces[pieces.length - 1];
    const tailPieceLength = this.tailPiece.length - 1;

    this.tailPiece = lastPiece.slice(-tailPieceLength);
    pieces[pieces.length -1] = lastPiece.slice(0, -tailPieceLength);

    this.push(pieces.join(this.replaceString));
    callback();
  }

  _flush(callback) {
    this.push(this.tailPiece);
    callback();
  }
}

// process.stdin // pipe this with echo and see some amazing shit
//   .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
//   .pipe(process.stdout);

module.exports = () => {
  const rs = new ReplaceStream('funk', 'fuck');

  rs.on('data', console.log); // works the same way when using the read()

  rs.write('Hello fu');
  rs.write('nking piec');
  rs.write('e of shit');
  rs.end();
};
