export function addValues(arg1, arg2) {
    const convertible = new Set(["boolean", "string", "number", "object"]);
    let result = 0;

    if (typeof arg1 === "symbol" || typeof arg2 === "symbol") {
        throw TypeError("One of the arguments is 'symbol' type.");
    }
    if (!convertible.has(typeof arg1) && arg1 !== null) {
        throw TypeError(
            `Argument '${arg1}' of type '${typeof arg1}' is not convertible to number.`
        );
    }
    if (!convertible.has(typeof arg2) && arg2 !== null) {
        throw TypeError(
            `Argument '${arg2}' of type '${typeof arg2}' is not convertible to number.`
        );
    }

    result += Number(arg1);
    result += Number(arg2);

    if (result !== result) {
        throw TypeError(
            `Convertion of arguments '${arg1}' and '${arg2}' has failed.`
        );
    }
    return result;
}

function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: [...value],
        };
    }
    if (value instanceof Set) {
        return {
            dataType: "Set",
            value: [...value],
        };
    } else {
        return value;
    }
}

export function stringifyValue(arg) {
    const convertible = new Set([
        "string",
        "number",
        "bigint",
        "undefined",
        "boolean",
        "symbol",
    ]);

    if (convertible.has(typeof arg)) {
        return String(arg);
    }
    if (arg === null) {
        return String(arg);
    }
    if (typeof arg === "object" && arg !== null) {
        if (arg instanceof Map || Set) {
            return JSON.stringify(arg, replacer);
        } else {
            return JSON.stringify(arg);
        }
    }
}

export function invertBoolean(arg) {
    if (typeof arg === "boolean") {
        return !arg;
    } else {
        throw TypeError(`Argument type '${typeof arg}', expected: boolean.`);
    }
}

export function convertToNumber(arg) {
    const convertible = new Set(["boolean", "string", "number", "object"]);
    let result = 0;

    if (typeof arg === "symbol") {
        throw TypeError("'Symbol' type is not convertible to number.");
    }
    if (!convertible.has(typeof arg) && arg !== null) {
        throw TypeError(`Argument '${arg}' is not convertible to number.`);
    }
    if (typeof arg === "string") {
        result = parseFloat(arg);
    } else {
        result = Number(arg);
    }
    if (result !== result) {
        throw TypeError(
            `Convertion of argument '${arg}' to number has failed.`
        );
    }
    return result;
}

export function coerceToType(value, type) {
    if (type === "boolean") {
        return Boolean(value);
    }
    if (type === "string") {
        return stringifyValue(value);
    }
    if (type === "number") {
        return convertToNumber(value);
    }
}
