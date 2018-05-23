const Queue = function () {
  this.storage = {};
  this.start = 0;
  this.end = 0;
};

Queue.prototype.enqueue = function (item) {
  this.storage[this.end++] = item;
};

Queue.prototype.dequeue = function () {
  if (this.getSize()) {
    var item = this.storage[this.start];
    delete this.storage[this.start++];
    return item;
  }
};

Queue.prototype.getSize = function () {
  return this.end - this.start;
};

module.exports = Queue;