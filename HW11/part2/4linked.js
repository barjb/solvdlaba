class LinkedList {
    #startNode;
    #lastNode;
    constructor() {
        this.#startNode = null;
        this.#lastNode = null;
    }
    add(value) {
        const node = new Node(value);
        if (this.#startNode === null) {
            this.#startNode = node;
            this.#lastNode = node;
        } else {
            this.#lastNode.next = node;
            this.#lastNode = node;
        }
    }
    delete(value) {
        let previous = null;
        let current = this.#startNode;
        while (current.value !== value) {
            previous = current;
            current = current.next;
        }
        if (previous === null) {
            this.#startNode = this.#startNode.next;
            // GC should take care of deleting the node unless there are other references existing
        } else {
            previous.next = current.next;
            // GC should take care of deleting the node unless there are other references existing
        }
    }
    search(value) {
        let node = this.#startNode;
        while (node !== null) {
            if (node.value === value) return node;
            node = node.next;
        }
        return null;
    }
    print() {
        let current = this.#startNode;
        const result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result);
    }
    hasCycle() {
        if (!this.#startNode || !this.#startNode.next) return false;
        let slow = this.#startNode;
        let fast = this.#startNode;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }
    addCycle(value) {
        // links last to node having 'value'
        let node = this.search(value);
        this.#lastNode.next = node;
    }
}
class Node {
    #value;
    #next;
    constructor(value, next = null) {
        this.#value = value;
        this.#next = next;
    }
    get value() {
        return this.#value;
    }
    get next() {
        return this.#next;
    }
    set value(val) {
        this.#value = val;
    }
    set next(next) {
        if (!(next instanceof Node) || next !== null) this.#next = next;
        else
            throw new Error(
                `${next} is not of a type Node or is not equal to null`
            );
    }
}
const list = new LinkedList();
list.add(1);
list.add(3);
list.add(2);
list.add(5);
list.add(6);
list.print();
console.log(list.hasCycle());
list.addCycle(3);
console.log(list.hasCycle());
