function promiseAllSettled(array) {
    let result = [];
    let finished = 0;
    return new Promise((resolve, reject) => {
        for (const [index, promise] of array.entries()) {
            Promise.resolve(promise)
                .then((value) => {
                    finished++;
                    result[index] = {
                        status: "fulfilled",
                        value: value,
                    };
                    if (finished === array.length) resolve(result);
                })
                .catch((error) => {
                    finished++;
                    result[index] = {
                        status: "rejected",
                        reason: error,
                    };
                    if (finished === array.length) resolve(result);
                });
        }
    });
}

const promises = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3),
];

promiseAllSettled(promises)
    .then((results) => {
        console.log("All promises settled:", results);
        // Expected: [{ status: 'fulfilled', value: 1 },
        //            { status: 'rejected', reason: 'Error occurred' },
        //            { status: 'fulfilled', value: 3 }]
    })
    .catch((err) => console.log(err));
