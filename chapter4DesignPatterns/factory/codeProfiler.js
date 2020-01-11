class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime();
  }

  end() {
    const diff = process.hrtime(this.lastTime);
    console.log(`${this.label}: ${diff[0]}s. ${diff[1]}ns.`);
  }
}

function createProfiler(label) {
  if (process.env.NODE_ENV === 'production') {
    return { // this is called duck typing
      start: () => {},
      end: () => {},
    }
  }

  return new Profiler(label);
}

function shit() {
  const profiler = createProfiler('Shit');

  profiler.start();
  for (let i = 0; i < 4000000000; ++i) {
  }
  profiler.end();
}

shit();
