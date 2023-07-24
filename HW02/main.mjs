import {
    addValues,
    coerceToType,
    convertToNumber,
    invertBoolean,
    stringifyValue,
} from "./coercions/main.mjs";

//primitives
console.log(stringifyValue("hello"));
console.log(stringifyValue(1));
//special numbers
console.log(stringifyValue(NaN));
console.log(stringifyValue(Infinity));

console.log(stringifyValue(1n));
console.log(stringifyValue(true));
// absence of a type
console.log(stringifyValue(undefined));
// absence of a object
console.log(stringifyValue(null));
console.log(stringifyValue(Symbol(123)));

console.log(
    stringifyValue({
        a: "object",
    })
);
// array is a object
console.log(stringifyValue([1, 2, 3]));
// other keyed collection objects
console.log(stringifyValue(new Set([1, 2, 3, 2, 2, 1])));
const mymap = new Map();
mymap.set(1, "one");
mymap.set(2, "two");
mymap.set("c", "c");
mymap.set(3, "three");
mymap.set("b", "b");
console.log(stringifyValue(mymap));

invertBoolean(true);
invertBoolean(false);

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
