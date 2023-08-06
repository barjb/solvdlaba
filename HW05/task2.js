// Task 2: Array Chunking

// 1. Create a function called `chunkArray` that takes an array and a chunk size as arguments.
// The `chunkArray` function should divide the array into smaller arrays,
// each containing elements of the specified chunk size. The function should return an array of arrays.

// 2. Optimize the `chunkArray` function to minimize memory usage while chunking the array.

function chunkArrayUnoptimized(arr, chunksize) {
    const chunkedArray = [];
    let currentIndex = 0;
    while (currentIndex < arr.length) {
        chunkedArray.push(arr.slice(currentIndex, currentIndex + chunksize));
        currentIndex += chunksize;
    }
    return chunkedArray;
}

function* chunkArrayOptimized(arr, chunksize) {
    // chunkArrayUnoptimized is optimized in two ways:
    // - linear execution
    // - chunks are pushed directly to a chunkedArray
    // In order to optimize memory usage I could append chunks in smaller chunks when function gets called with larger 'chunksize' paremeter.
    // for example chunkArrayOptimized(someBigArray,10000000000)
    // But I think this is not the crux of the problem.
    // I chose to optimize function using generators, please let me know if this thought process is correct.

    let currentIndex = 0;
    while (currentIndex < arr.length) {
        yield arr.slice(currentIndex, currentIndex + chunksize);
        currentIndex += chunksize;
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
console.log(chunkArrayUnoptimized(arr, 1));
console.log(chunkArrayUnoptimized(arr, 4));
console.log(chunkArrayUnoptimized(arr, 13));
console.log(chunkArrayUnoptimized(arr, 24));

const gen = chunkArrayOptimized(arr, 1);
for (const chunk of gen) {
    console.log(chunk);
}
