// Task 5: Object Observation

// Implement a function called observeObject that takes an object and a callback function as arguments.
// The function should return a proxy object that wraps the original object and invokes the callback function
// whenever any property of the object is accessed or modified.

// Use the observeObject function to create a proxy for the person object from Task 1.
//  The callback function should log the property name and the action (get or set) performed on the object.

let obj = Object.create(Object.prototype, {
    firstName: { value: "John", enumerable: true, writable: false },
    lastName: { value: "Doe", enumerable: true, writable: false },
    age: { value: 30, enumerable: true, writable: false },
    email: {
        value: "john.doe@example.com",
        enumerable: true,
        writable: false,
    },
});
Object.defineProperty(obj, "updateInfo", {
    value: (newInfo) => {
        Object.defineProperty(obj, "newInfo", {
            value: newInfo,
            enumerable: true,
            writable: false,
        });
    },
});

Object.defineProperty(obj, "address", {
    value: undefined,
    enumerable: false,
    configurable: false,
});

function observeObject(obj, cb) {
    let descriptors = Object.getOwnPropertyDescriptors(obj);
    for (const descr in descriptors) {
        const newName = "_" + descr;
        descriptors[newName] = { value: descriptors[descr].value };
        delete descriptors[descr].value;
        delete descriptors[descr].writable;
        descriptors[descr].get = function () {
            cb("get", newName, this.newName);
            return this.newName;
        };
        descriptors[descr].set = function (value) {
            this.newName = value;
            cb("set", newName, this.newName);
        };
    }
    return Object.defineProperties({}, descriptors);
}

const proxyObj = observeObject(obj, (accesor, property, propertyValue) => {
    console.log(
        `called ${accesor} on a property ${property}, property value: ${propertyValue}`
    );
});

proxyObj.firstName = "other";
console.log(proxyObj.firstName);
proxyObj.firstName = "Johnny";
console.log(proxyObj.firstName);
