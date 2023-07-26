import {
    addValues,
    coerceToType,
    convertToNumber,
    invertBoolean,
    stringifyValue,
} from "./coercions/main.mjs";

console.log(stringifyValue("hello"));
console.log(stringifyValue(1));
console.log(stringifyValue(NaN));
console.log(stringifyValue(Infinity));
console.log(stringifyValue(1n));
console.log(stringifyValue(true));
console.log(stringifyValue(undefined));
console.log(stringifyValue(null));
console.log(stringifyValue(Symbol(123)));
console.log(
    stringifyValue({
        a: "object",
    })
);
console.log(stringifyValue([1, 2, 3]));

console.log(invertBoolean(true));
console.log(invertBoolean(false));
try {
    console.log(invertBoolean(3));
} catch (e) {
    console.log(e);
}

console.log(convertToNumber("3"));
console.log(convertToNumber("3.14"));
try {
    console.log(convertToNumber("d"));
} catch (e) {
    console.log(e);
}

console.log(addValues(1, 1));
console.log(addValues(null, 1));
console.log(addValues(null, "33"));
try {
    console.log(addValues(undefined, "33"));
} catch (e) {
    console.log(e);
}

console.log(coerceToType([1, 2], "boolean"));
console.log(coerceToType([1, 2], "string"));
try {
    console.log(coerceToType([1], "number"));
} catch (e) {}

console.log("Done.");
