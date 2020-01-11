const sequentialIteration = require('./chapter2AsyncControlFlow/sequentialItaration');
const generators = require('./chapter2AsyncControlFlow/generators/generators');
const asyncFlow = require('./chapter2AsyncControlFlow/generators/asyncFlowWithGenerator');
const thunkedAsyncFlow = require('./chapter2AsyncControlFlow/generators/asyncFlowWithThunks');
const TaskQueue = require('./chapter2AsyncControlFlow/generators/producerConsumerPattern');

// streams

const zippingServer = require('./chapter3Streams/fileStreamsWIthCipher').cipherServer; // doesn't work
const decipher = require('./chapter3Streams/fileStreamsWIthCipher').decipher; // doesn't work
const nonFlowing = require('./chapter3Streams/nonFlowingStdin');
const flowing = require('./chapter3Streams/flowingStdin');
const randomStream = require('./chapter3Streams/streamImplementations/randomStreamImplementation');
const randomWriteStream = require('./chapter3Streams/randomWriteStream');
const backPressure = require('./chapter3Streams/writeableStreamBackpressureHandling');
const tfs = require('./chapter3Streams/streamImplementations/writeableStreamImplementation');
const transformStream = require('./chapter3Streams/streamImplementations/transformStreamsImplementation');

const concatFiles = require('./chapter3Streams/asyncControlFlow/sequentialExecution');
const parallelStream = require('./chapter3Streams/asyncControlFlow/unorderedParallelStream');

const customConsole = require('./chapter3Streams/customConsoleLog');

const forkStreams = require('./chapter3Streams/forkingReadableStreams');

console.log(process.argv);
forkStreams();
