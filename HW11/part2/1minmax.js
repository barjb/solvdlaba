class MinMax {
    #min;
    #max;
    #stack;
    constructor() {
        this.#min = [];
        this.#max = [];
        this.#stack = [];
    }
    push(value) {
        this.#stack.push(value);
        if (this.#min.length === 0 || value < this.#min[this.#min.length - 1])
            this.#min.push(value);
        if (this.#max.length === 0 || value > this.#max[this.#max.length - 1])
            this.#max.push(value);
    }
    pop() {
        if (!this.#stack.length) return null;
        const value = this.#stack.pop();
        if (value === this.#min[this.#min.length - 1]) this.#min.pop();
        if (value === this.#max[this.#max.length - 1]) this.#max.pop();
        return value;
    }
    peek() {
        if (!this.#stack.length) return null;
        return this.#stack[this.#stack.length - 1];
    }
    min() {
        if (!this.#min.length) return null;
        return this.#min[this.#min.length - 1];
    }
    max() {
        if (!this.#max.length) return null;
        return this.#max[this.#max.length - 1];
    }
}
const minmax = new MinMax();
minmax.push(1);
minmax.push(3);
minmax.push(2);
minmax.push(0);

console.log(minmax.peek());
console.log(minmax.min());
console.log(minmax.max());
minmax.pop();
console.log(minmax.peek());
console.log(minmax.min());
console.log(minmax.max());
