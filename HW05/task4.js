// Task 4: Array Intersection and Union

// 1. Create a function called `getArrayIntersection` that takes two arrays as arguments
//  and returns a new array containing the common elements between the two arrays.

// 2. Create a function called `getArrayUnion` that takes two arrays as arguments
// and returns a new array containing all unique elements from both arrays, without any duplicates.

function isDuplicate(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) return false;
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}
function isArrayDuplicate(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] !== typeof arr2[i]) return false;
        if (typeof arr1[i] === "object") {
            if (!isDuplicate(arr1[i], arr2[i])) return false;
        }
        if (Array.isArray(arr1[i])) {
            if (!isArrayDuplicate(arr1[i], arr2[i])) return false;
        }
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
function getArrayIntersection(arr1, arr2) {
    const intersection = [];
    if (arr2.length > arr1.length) {
        [arr1, arr2] = [arr2, arr1];
    }
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (typeof arr1[i] !== typeof arr2[j]) continue;
            if (typeof arr1[i] === "object" && typeof arr2[j] === "object") {
                if (isDuplicate(arr1[i], arr2[j])) {
                    intersection.push(arr1[i]);
                }
            } else if (Array.isArray(arr1[i]) && Array.isArray(arr2[j])) {
                if (isArrayDuplicate(arr1[i], arr2[j])) {
                    intersection.push(arr1[i]);
                }
            } else if (arr1[i] === arr2[j]) {
                intersection.push(arr1[i]);
            }
        }
    }
    return intersection;
}
function getArrayUnion(arr1, arr2) {
    if (arr2.length > arr1.length) {
        [arr1, arr2] = [arr2, arr1];
    }
    const union = [...arr1];
    for (let i = 0; i < arr2.length; i++) {
        let duplicates = 0;
        for (let j = 0; j < arr1.length; j++) {
            if (typeof arr2[i] !== typeof arr1[j]) continue;
            if (typeof arr2[i] === "object" && typeof arr1[j] === "object") {
                if (isDuplicate(arr2[i], arr1[j])) duplicates++;
            } else if (Array.isArray(arr2[i]) && Array.isArray(arr1[j])) {
                if (isArrayDuplicate(arr2[i], arr1[j])) duplicates++;
            } else if (arr2[i] === arr1[j]) duplicates++;
        }
        if (!duplicates) union.push(arr2[i]);
    }
    return union;
}

// I assume arr1 and arr2 don't have duplicates
const arr1 = [1, 2, 3, [1, 2], { a: 1 }, { b: 2 }];
const arr2 = [1, 2, [1, 2], [1], { a: 1 }, { a: 2 }, { b: 1 }];
console.log(getArrayIntersection(arr1, arr2));
console.log(getArrayUnion(arr1, arr2));
