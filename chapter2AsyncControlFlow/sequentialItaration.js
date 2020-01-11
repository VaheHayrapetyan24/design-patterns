module.exports = () => {
    let promise = Promise.resolve();

    const tasks = [];

    for (let i = 0; i < 10; ++i) {
        tasks.push(() => new Promise(resolve => {
            setTimeout(() => {
                console.log(i);
                resolve();
            }, 200);
        }));
    }

    tasks.forEach(task => {
        promise = promise.then(() => task());
    });

    promise.then(() => console.log('all done'));

};
