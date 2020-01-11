const fs = require('fs');
const thunkify = require('../utils/thunkify');
const thunkifiedReadFile = thunkify(fs.readFile);

function asyncFlowWithThunks(generatorFunction) {
    let generator = generatorFunction();

    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        const thunk = generator.next(results.length > 1 ? results : results[0]).value;
        thunk && thunk(callback);
    }

    const thunk = generator.next().value;
    thunk && thunk(callback);
}

function* generatorFunction() {
    const myself = yield thunkifiedReadFile(__filename, 'utf8');
    console.log(myself);
    const miself = yield thunkifiedReadFile(__filename, 'utf8');
    console.log(miself);
}

module.exports = () => {
    asyncFlowWithThunks(generatorFunction);
};
