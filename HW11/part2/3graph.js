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
class Graph {
    constructor() {
        this.adjacent = new Map();
    }
    addVertex(vertex, edges = []) {
        this.adjacent.set(vertex, edges);
    }
    addEdges(vertex, edges) {
        if (!edges.length) return;
        const vertexEdges = this.adjacent.get(vertex);
        edges.forEach((edge) => {
            if (!vertexEdges.includes(edge)) vertexEdges.push(edge);
        });
        this.adjacent.set(vertex, vertexEdges);
    }
    Dijkstra(start, end) {}
    BFS(start, end) {}
    print() {
        this.adjacent.forEach((value, key, map) => {
            console.log(`m[${key}] = ${value}`);
        });
    }
}
