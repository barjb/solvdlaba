// Task 3: Array Shuffling

// 1. Create a function called `customShuffle` that takes an array as an argument and returns
// a new array with its elements randomly shuffled.

// 2. Implement the `customShuffle` function using an efficient shuffling algorithm to achieve uniform randomness.
function customShuffleUnoptimized(arr) {
    let arrcopy = arr.slice();
    const randomIndex = () => Math.floor(Math.random() * arrcopy.length);
    for (let i = 0; i < arrcopy.length; i++) {
        let newIndex = randomIndex();
        while (newIndex === i) newIndex = randomIndex();
        [arrcopy[i], arrcopy[newIndex]] = [arrcopy[newIndex], arrcopy[i]];
    }
    return arrcopy;
}

function customShuffle(arr) {
    // Fisher-Yates (Knuth) Shuffle
    let arrcopy = arr.slice();
    for (let i = arrcopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrcopy[i], arrcopy[j]] = [arrcopy[j], arrcopy[i]];
    }
    return arrcopy;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("unoptimized:", customShuffleUnoptimized(arr));
console.log("optimized:", customShuffle(arr));
console.log("original array:", arr);
