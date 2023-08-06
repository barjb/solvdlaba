// Task 6: Object Deep Cloning

// Implement a function called deepCloneObject that takes an object as an argument
// and returns a deep copy of the object. The function should handle circular references
// and complex nested structures. Do not use JSON methods.
function deepCloneObject(obj, clones = new WeakMap()) {
    if (obj === null || typeof obj !== "object") return obj;
    if (clones.has(obj)) return obj;
    let deepCopy;
    if (Array.isArray(obj)) {
        deepCopy = [];
        for (elem of obj) {
            deepCopy.push(deepCloneObject(elem));
        }
    } else if (typeof obj === "object") {
        deepCopy = {};
        clones.set(obj, deepCopy);
        for (const key in obj) {
            deepCopy[key] = deepCloneObject(obj[key], clones);
        }
    }
    return deepCopy;
}

const obj = {
    a: 1,
    b: true,
    c: 1n,
    d: "string",
    e: [
        1,
        true,
        1n,
        "string",
        [1, 2],
        { a: 1, b: true, c: 1n, d: "string", e: [1, 2], f: { a: 1 } },
    ],
    f: { a: "a", b: [1], c: { a: "1" } },
};

const clonedObj = deepCloneObject(obj);
console.log(clonedObj);
