const co = require('co');

// Usage
/*
  const taskQueueObject = new TaskQueue(3);


  taskQueueObject.pushTask(function () {
    return setTimeout(() => console.log('aaa'), 3000)
  });
*/

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.taskQueue = [];
    this.consumerQueue = [];
    this.spawnWorkers(concurrency);
  }

  spawnWorkers(concurrency) {
    const self = this;
    for (let i = 0; i < concurrency; ++i) {
      co.wrap(function* () {
        while (true) {
          const task = yield self.nextTask();
          yield task;
        }
      })();
    }
  }

  nextTask() {
    const self = this;
    return function(callback) {
      if (self.taskQueue.length !== 0) {
        callback(null, self.taskQueue.shift());
      } else {
        self.consumerQueue.push(callback);
      }
    }
  }

  pushTask(task) {
    if (this.consumerQueue.length !== 0) {
      this.consumerQueue.shift()(null, task);
    } else {
      this.taskQueue.push(task);
    }
  }
}

module.exports = TaskQueue;
