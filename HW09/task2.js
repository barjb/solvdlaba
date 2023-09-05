function promiseAllSettled(array) {
    let result = [];
    return new Promise((resolve, reject) => {
        array.forEach((promise) => {
            let current = {};
            promise.then(
                (value) => {
                    current.status = "fulfilled";
                    current.value = value;
                    result.push(current);
                },
                (error) => {
                    current.status = "rejected";
                    current.reason = error;
                    result.push(current);
                }
            );
        });
        resolve(result);
    });
}

const promises = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3),
];

promiseAllSettled(promises).then((results) => {
    console.log("All promises settled:", results);
    // Expected: [{ status: 'fulfilled', value: 1 },
    //            { status: 'rejected', reason: 'Error occurred' },
    //            { status: 'fulfilled', value: 3 }]
});
