function chainPromises(array) {
    return new Promise((resolve, reject) => {
        let result = "";
        for (const [index, promise] of array.entries()) {
            promise(result)
                .then((value) => {
                    result = result.concat(value);
                    if (index === array.length - 1) resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
    .then((result) => {
        console.log("Chained promise result:", result);
        // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch((error) => {
        console.error("Chained promise error:", error);
    });
