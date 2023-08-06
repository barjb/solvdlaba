// Task 7: Object Property Validation

// Implement a function called validateObject that takes an object
// and a validation schema as arguments. The schema should define the required properties,
// their types, and any additional validation rules. The function should return true
// if the object matches the schema, and false otherwise. You can choose any schema you want

// Example schema
// const objectSchema = {
//      propname: {
//          [configurable,writable,enumerable,]: [true,false],
//          type: ["number","string","boolean","bigint","object","null","undefined"], (arrays and objects are supported)
//          value: [functor(), 'value'],
//      },
//      propname2: {
//          value: true,
//      },
// }

// Validation checks only descriptors defined in schema for each property.
// Value can validated either by:
// 1. Functor defined in schema, which must return boolean.
// 2. Direct comparison of values.
// It's not required to define schema for each property.
// Object must define every property defined in schema.
function isObjectEqual(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) return false;
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}
function isArrayEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] !== typeof arr2[i]) return false;
        if (typeof arr1[i] === "object") {
            if (!isObjectEqual(arr1[i], arr2[i])) return false;
        }
        if (Array.isArray(arr1[i])) {
            if (!isArrayEqual(arr1[i], arr2[i])) return false;
        }
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function isValidSchemaProperty(propertyschema) {
    const flags = new Set(["configurable", "writable", "enumerable"]);
    const types = new Set([
        "number",
        "string",
        "boolean",
        "bigint",
        "object",
        "null",
        "undefined",
    ]);
    for (const flag of flags.values()) {
        if (propertyschema.hasOwnProperty(flag)) {
            if (propertyschema[flag] !== true && propertyschema[flag] !== false)
                return false;
        }
    }
    if (propertyschema.hasOwnProperty("type")) {
        if (!types.has(propertyschema["type"])) return false;
    }
    if (propertyschema.hasOwnProperty("value")) {
        if (typeof propertyschema["value"] === "function") {
            const result = propertyschema["value"](true);
            if (result !== true && result !== false) return false;
            return true;
        }
        if (!types.has(typeof propertyschema["value"])) return false;
        if (
            propertyschema.hasOwnProperty("type") &&
            typeof propertyschema["value"] !== propertyschema["type"]
        )
            return false;
    }
    return true;
}

function isValidObjectProperty(obj, propname, propschema) {
    const flags = new Set(["configurable", "writable", "enumerable"]);
    const objdescriptor = Object.getOwnPropertyDescriptor(obj, propname);

    for (const flag of flags) {
        if (!propschema.hasOwnProperty(flag)) continue;
        if (propschema[flag] != objdescriptor[flag]) {
            return false;
        }
    }
    if (propschema.hasOwnProperty("type")) {
        if (propschema["type"] !== typeof objdescriptor["value"]) return false;
    }
    if (propschema.hasOwnProperty("value")) {
        if (typeof propschema["value"] === "function") {
            return propschema["value"](objdescriptor["value"]);
        }
        if (Array.isArray(propschema["value"]))
            return isArrayEqual(propschema["value"], objdescriptor["value"]);
        if (
            typeof propschema["value"] === "object" &&
            propschema["value"] !== null
        )
            return isObjectEqual(propschema["value"], objdescriptor["value"]);
        return propschema["value"] === objdescriptor["value"];
    }
    return true;
}

function validateObject(obj, validationschema) {
    for (const propschema in validationschema) {
        if (!isValidSchemaProperty(validationschema[propschema]))
            throw SyntaxError(`schema is invalid for property ${propschema}`);
    }
    for (const propschema in validationschema) {
        if (!obj.hasOwnProperty(propschema))
            throw SyntaxError(`Object does not have '${propschema}' property`);
        if (
            !isValidObjectProperty(
                obj,
                propschema,
                validationschema[propschema]
            )
        )
            return false;
    }
    return true;
}

const schema = {
    name: {
        configurable: true,
        writable: true,
        enumerable: true,
        value: (v) => v === "Albert",
    },
    surname: {
        value: (v) => v === "Einstein",
        enumerable: true,
    },
    age: {
        type: "number",
        enumerable: true,
        value: 76,
    },
    nobelprizes: {
        value: (v) => {
            return v > 0;
        },
    },
};
let obj = Object.create(Object.prototype, {
    name: {
        value: "Albert",
        configurable: true,
        writable: true,
        enumerable: true,
    },
    surname: {
        value: "Einstein",
        enumerable: true,
    },
    age: {
        enumerable: true,
        value: 76,
    },
    nobelprizes: {
        value: 1,
    },
});
console.log(validateObject(obj, schema));
