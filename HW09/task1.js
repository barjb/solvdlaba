function promiseAll(array) {
    let result = [];
    return new Promise((resolve, reject) => {
        array.forEach((promise) => {
            promise
                .then((value) => {
                    result.push(value);
                })
                .catch((error) => {
                    reject(error);
                });
        });
        resolve(result);
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
