function isString(s) {
    return typeof s === "string" || s instanceof String;
}

function isPositive(s) {
    if (s[0] === "-") return false;
    if (s.length > 1) return true;
    if (+s > 0) return true;
    return false;
}

function isDigitsOnly(s) {
    return [...s].every((c) => "0123456789".includes(c));
}

function isNotSmaller(s1, s2) {
    if (s1.length > s2.length) return true;
    if (s1.length < s2.length) return false;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] > s2[i]) return true;
        if (s2[i] > s1[i]) return false;
    }
    return true;
}

function stringToReversedArray(e) {
    return e.split("").reverse();
}

function orderNumbers(s1, s2) {
    if (isNotSmaller(s1, s2)) {
        return [s1, s2];
    } else {
        return [s2, s1];
    }
}

function plus(s1, s2) {
    if (!isString(s1) || !isString(s2)) return "";
    if (!isDigitsOnly(s1) || !isDigitsOnly(s2)) return "";

    let carry = 0;
    let [bigger, smaller] = orderNumbers(s1, s2).map(stringToReversedArray);

    let result = bigger.map((value, index) => {
        let elemSum = +value + (+smaller[index] || 0) + carry;
        carry = Math.floor(elemSum / 10);
        return elemSum % 10;
    });
    if (carry === 1) result.push(1);
    return result.reverse().join("");
}

function minus(s1, s2) {
    if (!isString(s1) || !isString(s2)) return "";
    if (!isDigitsOnly(s1) || !isDigitsOnly(s2)) return "";
    if (s1 === "0") return "-1";

    let carry = 0;
    let [bigger, smaller] = orderNumbers(s1, s2).map(stringToReversedArray);

    let result = bigger.map((value, index) => {
        let elemSum = +value - (+smaller[index] || 0) - carry;
        if (elemSum < 0) {
            elemSum += 10;
            carry = 1;
        } else {
            carry = 0;
        }
        return elemSum;
    });
    while (result[result.length - 1] === 0) {
        result.pop();
    }
    return result.reverse().join("");
}

function multiply(s1, s2) {
    if (!isString(s1) || !isString(s2)) return "";
    if (!isDigitsOnly(s1) || !isDigitsOnly(s2)) return "";
    let result = "0";

    while (isPositive(s2)) {
        result = plus(s1, result);
        s2 = minus(s2, "1");
    }
    return result;
}

function divide(s1, s2) {
    if (!isString(s1) || !isString(s2)) return "";
    if (!isDigitsOnly(s1) || !isDigitsOnly(s2)) return "";

    let result = "0";

    while (isNotSmaller(s1, s2)) {
        s1 = minus(s1, s2);
        result = plus(result, "1");
    }
    return result;
}

let n1 = "4545454545454545";
let n2 = "159159357357258456";

console.log(plus(n1, n2));
//expected  163 704 811 902 713 001
//got       163 704 811 902 713 001

console.log(minus(n1, n2));
//expected  154 613 902 811 803 911
//got       154 613 902 811 803 911

console.log(multiply(n1, "1234"));
//expected  5609090909090908530
//got       5609090909090908530

console.log(divide(n2, n1));
//expected  35
//got       35

console.log(divide(n2, n2));
// expected 1
// got      1
