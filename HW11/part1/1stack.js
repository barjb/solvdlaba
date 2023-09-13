class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (!this.items.length)
            throw new Error("Pop() called on an empty stack");
        return this.items.pop();
    }
    peek() {
        if (!this.items.length)
            throw new Error("Peek() called on an empty stack");
        return this.items[this.items.length - 1];
    }
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(2);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());
