const fs = require('fs');

module.exports = () => {
    function asyncFlow(generatorFunction) {
        let generator = generatorFunction(callback);

        function callback(err) {
            console.log('*****************', arguments);
            if (err) {
                return generator.throw(err);
            }
            const results = [].slice.call(arguments, 1);
            generator.next(results.length > 1 ? results : results[0]);
        }

        generator.next();
    }

    function* generatorFunction(callback) { // see asyncFlowWithThunks for a version without callback
        const myself = yield fs.readFile(__filename, 'utf8', callback);
        console.log(myself);
    }

    asyncFlow(generatorFunction);
};
