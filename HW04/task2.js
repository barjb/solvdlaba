// Task 2: Object Property Enumeration and Deletion

// Create a new object called product with the following properties and values:name: "Laptop"
// price: 1000
// quantity: 5
// Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

// Implement a function called getTotalPrice that takes the product object as an argument
// and returns the total price (calculated as price \* quantity).
//  Ensure that the function accesses the non-enumerable properties directly
//  using the Object.getOwnPropertyDescriptor method.

// Implement a function called deleteNonConfigurable that takes an object
// and a property name as arguments. The function should delete the specified property
// from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

let obj = { name: "Laptop", price: 1000, quantity: 5 };

Object.defineProperties(obj, {
    name: {
        value: obj.name,
        enumerable: false,
        writable: false,
    },
    price: {
        value: obj.price,
        enumerable: false,
        writable: false,
    },
    quantity: {
        value: obj.quantity,
        enumerable: false,
        writable: false,
        configurable: false,
    },
});

console.log(obj);
obj.name = "name";
obj.price = 1;
obj.quantity = 1;

console.log(obj.name);
console.log(obj.price);
console.log(obj.quantity);

function getTotalPrice(obj) {
    return (
        +Object.getOwnPropertyDescriptor(obj, "price").value *
        +Object.getOwnPropertyDescriptor(obj, "quantity").value
    );
}

function deleteNonConfigurable(object, propertyName) {
    const descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
    if (!descriptor) return;
    if (descriptor.configurable) {
        delete object[propertyName];
    } else {
        throw Error(`Can't delete non-configurable property "${propertyName}"`);
    }
}

console.log("getTotalPrice(), ", getTotalPrice(obj));

deleteNonConfigurable(obj, "name");
deleteNonConfigurable(obj, "nam1e");
deleteNonConfigurable(obj, "price");
// deleteNonConfigurable(obj, "quantity");
console.log(obj.name);
console.log(obj.price);
console.log(obj.quantity);
