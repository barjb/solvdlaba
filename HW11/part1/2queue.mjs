class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        if (!this.items.length)
            throw new Error("Pop() called on an empty queue");
        return this.items.shift();
    }
    peek() {
        if (!this.items.length)
            throw new Error("Peek() called on an empty stack");
        return this.items[0];
    }
    isEmpty() {
        return Boolean(!this.items.length);
    }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(2);
console.log(queue.peek());
console.log(queue.dequeue());
console.log(queue.peek());

export default Queue;
