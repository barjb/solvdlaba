// Task 5: Array Performance Analysis

// 1. Implement a function called `measureArrayPerformance` that takes a function
// and an array as arguments. The `measureArrayPerformance` function should execute
//  the provided function with the given array as input and measure the execution time.

// 2. Use the `measureArrayPerformance` function to compare the performance
//  of built-in array methods (`map`, `filter`, `reduce`, etc.) against your custom array manipulation functions.

import customFilterUnique from "./task1.mjs";

function measureArrayPerformance(fn, arr, cb) {
    const start = new Date();
    const x = fn(arr, cb);
    const end = new Date();
    return (end - start) / 1000;
}

const arrayOfObjects = [];
for (let i = 0; i < 5000; i++) {
    const obj = { a: i };
    const obj2 = { b: i };
    const obj3 = { a: i, b: i };
    const obj4 = { c: "a", a: 4999 };
    const obj5 = { a: 4999 };
    arrayOfObjects.push(obj, obj2, obj3, obj4, obj5);
}

const objcb = (elem) => {
    if (elem.hasOwnProperty("a")) return true;
    return false;
};
const time = measureArrayPerformance(customFilterUnique, arrayOfObjects, objcb);
console.log(`${time}s`);

// const start = new Date();
// const x = arrayOfObjects.filter(objcb);
// const end = new Date();
// console.log(`${(end - start) / 1000}s`);

// console.log(x);

// customFilterUnique

// ===== TEST 1 =====
// for (let i = 0; i < 5000; i++) { ... }
// time achieved 1.42s

// ===== TEST 2 =====
// for (let i = 0; i < 10000; i++) { ... }
// time achieved 5.424s
// items:  ~19901 more items

// Array.prototype.filter

// ===== TEST 1 =====
// for (let i = 0; i < 5000; i++) { ... }
// time achieved 0.001s

// ===== TEST 2 =====
// for (let i = 0; i < 10000; i++) { ... }
// time achieved 0.005s
// items: ~39900 more items

// NOTE
// Array.prototype.filter doesn't filter out objects having identical properties.
// In my current solution time taken to check if object is proportional to the amount of unique elements in the set.
// ATM customFilterUnique achieves O(N*M) time complexity, where N = amount of objects in the initial array, M = amount of unique objects in the resulting array.
// Whereas Array.prototype.filter is O(N).
