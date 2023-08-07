// Task 4: Advanced Property Descriptors

// Implement a function called createImmutableObject that takes an object as an argument
// and returns a new object with all its properties made read-only and non-writable using property descriptors.
// The function should handle nested objects and arrays recursively.

// Use the createImmutableObject function to create an immutable version of the person object from Task 1.

function createImmutableObject(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    let immutable;
    if (Array.isArray(obj)) {
        immutable = [];
        for (const elem of obj) {
            immutable.push(createImmutableObject(elem));
        }
    } else if (typeof obj === "object") {
        immutable = {};
        for (const property in obj) {
            const descriptors = Object.getOwnPropertyDescriptor(obj, property);
            if (descriptors) {
                descriptors.writable = false;
                descriptors.configurable = false;
                descriptors.enumerable = descriptors.enumerable;
                descriptors.value = createImmutableObject(descriptors.value);
                Object.defineProperty(immutable, property, descriptors);
            }
        }
    }
    return immutable;
}

function printDescriptors(obj) {
    if (obj === null || typeof obj !== "object") console.log(obj);
    if (Array.isArray(obj)) {
        for (const elem in obj) {
            printDescriptors(elem);
        }
    } else if (typeof obj === "object") {
        for (const property in obj) {
            const descriptors = Object.getOwnPropertyDescriptor(obj, property);
            console.log(
                property,
                descriptors.writable,
                descriptors.enumerable,
                descriptors.configurable
            );
            printDescriptors(descriptors.value);
        }
    }
}

let obj = Object.create(Object.prototype, {
    firstName: {
        value: "John",
        enumerable: true,
        writable: false,
        configurable: true,
    },
    lastName: {
        value: "Doe",
        enumerable: true,
        writable: false,
        configurable: true,
    },
    age: { value: 30, enumerable: true, writable: false, configurable: false },
    email: {
        value: "john.doe@example.com",
        enumerable: true,
        writable: false,
        configurable: true,
    },
});
Object.defineProperty(obj, "updateInfo", {
    value: (info) => {
        for (property in info) {
            if (obj.hasOwnProperty(property)) {
                Object.defineProperty(obj, property, { writable: true });
                obj[property] = info[property];
                Object.defineProperty(obj, property, { writable: false });
            }
        }
    },
});

Object.defineProperty(obj, "address", {
    value: null,
    enumerable: false,
    configurable: false,
    writable: true,
});

let immutableObj = createImmutableObject(obj);

printDescriptors(immutableObj);
