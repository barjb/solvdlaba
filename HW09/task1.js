function promiseAll(array) {
    let result = [];
    let finished = 0;
    return new Promise((resolve, reject) => {
        for (const [index, promise] of array.entries()) {
            Promise.resolve(promise)
                .then((value) => {
                    result[index] = value;
                    finished++;
                    if (finished === array.length) resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises)
    .then((results) => {
        console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch((error) => {
        console.error("At least one promise rejected:", error);
    });
