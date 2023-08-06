// Task 1: Object Property Manipulation

// Create an object called person with the following properties and values:firstName: "John"
// lastName: "Doe"
// age: 30
// email: "john.doe@example.com"Use property descriptors to make all properties of the person object
//read-only and non-writable, so their values cannot be changed directly.

// Implement a method called updateInfo on the person object that takes a new info object as an argument.
// The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }).
// Ensure that this method adheres to the read-only property descriptor set earlier.

// Create a new property called address on the person object with an initial value of an empty object.
// Make this property non-enumerable and non-configurable.

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
    age: { value: 30, enumerable: true, writable: false, configurable: true },
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
    value: undefined,
    enumerable: false,
    configurable: false,
    writable: true,
});

obj.firstName = "";
obj.updateInfo({ firstName: "Jane", lastName: "Doee" });
console.log(obj);
obj.firstName = "";

console.log(obj.address);
obj.address = { city: "warsaw" };
console.log(obj, obj.address);
