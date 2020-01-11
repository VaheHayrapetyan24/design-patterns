function createImage(name) {
  switch (true) {
    case /\.jpeg$/.test(name):
      // return new JpegImage(name);
      break;
    case /\.gif$/.test(name):
      // return new GifImage(name);
      break;
    case /\.png$/.test(name):
      // return new PngImage(name);
      break;
    default:
      throw new Error('File type not supported');
  }
}
