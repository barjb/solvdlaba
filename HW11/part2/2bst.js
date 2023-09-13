class BinaryTree {
    #startNode;
    constructor() {
        this.#startNode = null;
    }
    add(val) {
        const node = new Node(val);
        if (this.#startNode === null) {
            this.#startNode = node;
        }
        this.insert(this.#startNode, node);
    }
    insert(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else this.insert(node.left, newNode);
        } else if (newNode.value > node.value) {
            if (node.right === null) {
                node.right = newNode;
            } else this.insert(node.right, newNode);
        }
    }
    search(value, node = this.#startNode) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            return this.search(value, node.left);
        } else if (value > node.value) {
            return this.search(value, node.right);
        } else if (value === node.value) return node;
    }
    inorder(node = this.#startNode) {
        const result = [];
        function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                result.push(node.value);
                traverse(node.right);
            }
        }
        traverse(node);
        return result;
    }
    preorder(node = this.#startNode) {
        const result = [];
        function traverse(node) {
            if (node !== null) {
                result.push(node.value);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(node);
        return result;
    }
    postorder(node = this.#startNode) {
        const result = [];
        function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                result.push(node.value);
            }
        }
        traverse(node);
        return result;
    }
    isBST() {
        // if (this.#startNode === null) return false;
        // function traverse(node) {
        //     if (node.left !== null && node.left.value >= node.value)
        //         return false;
        //     if (node.right !== null && node.right.value <= node.value)
        //         return false;
        //     if (node.left !== null) traverse(node.left);
        //     if (node.right !== null) traverse(node.right);
        //     return true;
        // }
        // traverse(this.#startNode) ===
        // return true;
    }
}

class Node {
    #value;
    #left;
    #right;
    constructor(value, left = null, right = null) {
        this.#value = value;
        this.#left = left;
        this.#right = right;
    }
    get value() {
        return this.#value;
    }
    get left() {
        return this.#left;
    }
    get right() {
        return this.#right;
    }
    set value(val) {
        this.#value = val;
    }
    set left(val) {
        if (!(val instanceof Node) || val !== null) this.#left = val;
        else
            throw new Error(
                `${next} is not of a type Node or is not equal to null`
            );
    }
    set right(val) {
        if (!(val instanceof Node) || val !== null) this.#right = val;
        else
            throw new Error(
                `${next} is not of a type Node or is not equal to null`
            );
    }
    toString() {
        return `${this.#value} L:${this.#left} R:${this.#right}`;
    }
}

const tree = new BinaryTree();
tree.add(4);
tree.add(2);
tree.add(6);
tree.add(1);
tree.add(3);
tree.add(5);
tree.add(7);
