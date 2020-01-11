module.exports = {
    version1: () => {
        function* createGenerator() {
            for (let i = 0; i < 5; ++i) {
                yield i; // { value: ... , done: false }
            }
            return 5; // { value: 5, done: true }
        }

        const iterator = createGenerator();
        let currentIterator = iterator.next();
        while (!currentIterator.done) {
            console.log(currentIterator.value);
            currentIterator = iterator.next();
        }
    },
    version2: () => { // passing argument to generator
        function* twoWayGenerator() {
            let shit = yield 'first';
            let anotherShit = yield shit;
            yield anotherShit;
        }

        const iterator = twoWayGenerator();
        console.log(iterator.next());
        console.log(iterator.next('second'));
        console.log(iterator.next('second'));
    },
    version3: () => { // throwing error inside the generator
        function* twoWayGenerator() {
            try {
                yield 'first';
            } catch (e) {
                console.log(e);
            }
            yield 'second';
        }

        const iterator = twoWayGenerator();
        iterator.next();
        iterator.throw(new Error('fuck you'));
    }

};
