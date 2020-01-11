const sequentialIteration = require('./chapter2/sequentialItaration');
const generators = require('./chapter2/generators/generators');
const asyncFlow = require('./chapter2/generators/asyncFlowWithGenerator');
const thunkedAsyncFlow = require('./chapter2/generators/asyncFlowWithThunks');
const TaskQueue = require('./chapter2/generators/producerConsumerPattern');

// streams

const zippingServer = require('./chapter3/fileStreamsWIthCipher').cipherServer; // doesn't work
const decipher = require('./chapter3/fileStreamsWIthCipher').decipher; // doesn't work
const nonFlowing = require('./chapter3/nonFlowingStdin');
const flowing = require('./chapter3/flowingStdin');
const randomStream = require('./chapter3/streamImplementations/randomStreamImplementation');
const randomWriteStream = require('./chapter3/randomWriteStream');
const backPressure = require('./chapter3/writeableStreamBackpressureHandling');
const tfs = require('./chapter3/streamImplementations/writeableStreamImplementation');
const transformStream = require('./chapter3/streamImplementations/transformStreamsImplementation');

const concatFiles = require('./chapter3/asyncControlFlow/sequentialExecution');
const parallelStream = require('./chapter3/asyncControlFlow/unorderedParallelStream');

const customConsole = require('./chapter3/customConsoleLog');

const forkStreams = require('./chapter3/forkingReadableStreams');

console.log(process.argv);
forkStreams();
