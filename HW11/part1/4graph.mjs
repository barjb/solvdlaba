import Queue from "./2queue.mjs";

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
    BFS(startVertex) {
        if (startVertex === undefined)
            startVertex = this.adjacent.keys().next().value;
        const toVisit = new Queue();
        const visited = [startVertex];
        toVisit.enqueue(startVertex);
        while (!toVisit.isEmpty()) {
            const current = toVisit.dequeue();
            const neighbours = this.adjacent.get(current);
            neighbours.forEach((vertex) => {
                if (!visited.includes(vertex)) {
                    visited.push(vertex);
                    toVisit.enqueue(vertex);
                }
            });
        }
        return visited;
    }
    DFS(startVertex, visited = []) {
        if (startVertex === undefined)
            startVertex = this.adjacent.keys().next().value;
        visited.push(startVertex);
        const neighbours = this.adjacent.get(startVertex);
        neighbours.forEach((vertex) => {
            if (!visited.includes(vertex)) {
                visited = this.DFS(vertex, visited);
            }
        });
        return visited;
    }
    print() {
        this.adjacent.forEach((value, key, map) => {
            console.log(`m[${key}] = ${value}`);
        });
    }
}

const g = new Graph();
g.addVertex("A", ["B", "C", "D"]);
g.addVertex("B", ["A", "D"]);
g.addVertex("C", ["A", "D"]);
g.addVertex("D", ["A", "B", "C", "E"]);
g.addVertex("E", ["D", "F"]);
g.addVertex("F", ["E"]);
const dfs = g.DFS("A");
const bfs = g.BFS("A");
console.log(dfs);
console.log(bfs);
g.print();
