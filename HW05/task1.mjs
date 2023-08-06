// Task 1: Advanced Array Filtering

// 1. Create a function called `customFilterUnique` that takes an array
//  and a callback function as arguments. The `customFilterUnique` function
//  should filter the array using the callback function to determine uniqueness.
//  The resulting array should contain only unique elements based on the callback's logic.

// 2. Use the `customFilterUnique` function to filter an array of objects based on a specific property
//  and return only unique objects.

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

function customFilterUnique(arr, cb) {
    const uniqueSet = new Set();
    for (const elem of arr) {
        if (!cb(elem)) continue;
        if (typeof elem !== "object") {
            if (uniqueSet.has(elem)) continue;
            uniqueSet.add(elem);
        } else {
            let isunique = true;
            for (const uniqueElem of uniqueSet) {
                if (!isDuplicate(elem, uniqueElem)) continue;
                isunique = false;
                break;
            }
            if (isunique) uniqueSet.add(elem);
        }
    }
    return [...uniqueSet];
}

const intcb = (elem) => {
    if (elem > 10) return true;
    return false;
};

const integersArray = [1, 2, 3, 10, 11, 12, 3, 13];
console.log(customFilterUnique(integersArray, intcb));
console.log(integersArray);

const objectsArray = [
    { a: 1 },
    { a: 2 },
    { a: 1 },
    { a: "a" },
    { a: "a" },
    { a: "al" },
    { a: "a", b: 1 },
    { b: "a" },
    { b: "a" },
];
const objcb = (elem) => {
    if (elem.hasOwnProperty("a")) return true;
    return false;
};
console.log(customFilterUnique(objectsArray, objcb));

const objcb2 = (elem) => {
    if (elem.hasOwnProperty("b")) return true;
    return false;
};
console.log(customFilterUnique(objectsArray, objcb2));

export default customFilterUnique;
