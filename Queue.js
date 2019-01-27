function Queue(){
    this.queue = [];
}

Queue.prototype.enqueue = function(val){
    this.queue.unshift(val);
}

Queue.prototype.dequeue = function(){
    return this.queue.pop();
}

Queue.prototype.size = function(){
    return this.queue.length;
}

Queue.prototype.isEmpty = function(){
    return this.queue.length === 0;
}

module.exports = Queue;