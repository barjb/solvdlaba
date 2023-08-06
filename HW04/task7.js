// Task 7: Object Property Validation

// Implement a function called validateObject that takes an object
// and a validation schema as arguments. The schema should define the required properties,
// their types, and any additional validation rules. The function should return true
// if the object matches the schema, and false otherwise. You can choose any schema you want

// schema
// const vs = {
//      propname: {
//      [configurable,writable,enumerable,]: true,false
//      type: [object,number,...],
//      value: functor() returning boolean,
// }
// }
function isValidSchemaProperty(propertyschema) {
    const flags = new Set(["configurable", "writable", "enumerable"]);
    console.log(propertyschema);
    for (const flag of flags.values()) {
        if (propertyschema.hasOwnProperty(flag)) {
            if (propertyschema[flag] !== true && propertyschema[flag] !== false)
                return false;
        }
    }
    if (propertyschema.hasOwnProperty("value")) {
        if (typeof propertyschema["value"] !== "function") return false;
    }
    return true;
}

function isValidObjectProperty(obj, propname, p) {
    console.log(obj, propname, p);
    return true;
}

function validateObject(obj, validationschema) {
    for (const propschema in validationschema) {
        if (!isValidSchemaProperty(validationschema[propschema]))
            throw Error(`schema is invalid for property ${propschema}`);
    }
    for (const propschema in validationschema) {
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
        value: (v) => v === "Albert",
    },
    surname: {
        value: (v) => v === "Einstein",
    },
    age: {
        value: (v) => v === 11,
    },
};

console.log(validateObject({}, schema));
