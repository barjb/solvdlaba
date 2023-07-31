/*
Task 1: Immutability and Pure Functions
1. Implement a pure function called `calculateDiscountedPrice` 
that takes an array of products and a discount percentage as arguments.
The function should return a new array of products with discounted prices
based on the given percentage, without modifying the original products.
2. Create a pure function called `calculateTotalPrice` 
that takes an array of products as an argument. 
The function should return the total price of all products,
without modifying the original array or its items.
*/
function calculateDiscountedPrice(products, discount) {
    if (!Array.isArray(products))
        throw TypeError(`Argument producss is not an instance of an Array`);
    if (discount < 0 || discount > 100)
        throw `Argument discount is not in range <0,100>`;
    return products.map((elem) => (elem * (100 - discount)) / 100);
}
function calculateTotalPrice(products) {
    if (!Array.isArray(products))
        throw TypeError(`Argument producss is not an instance of an Array`);
    return products.reduce((accumulator, current) => accumulator + current, 0);
}
/*
Task 2: Function Composition and Point-Free Style
1. Implement a function called `getFullName` that takes a person object
with `firstName` and `lastName` properties. The function should return
the person's full name in the format "FirstName LastName".
2. Create a function called `filterUniqueWords` that takes a string of text
and returns an array of unique words, sorted in alphabetical order,
without using explicit loops. Use function composition and point-free style.
3. Implement a function called `getAverageGrade` that takes an array of student objects,
each containing a `name` and `grades` property.
The function should return the average grade of all students,
without modifying the original array or its items. Use function composition and point-free style.
*/
function getFullName(person) {
    return person.firstName.concat(" ").concat(person.lastName);
}
function filterUniqueWords(text) {
    return text
        .split(" ")
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => a.localeCompare(b));
}
function getAverageGrade(students) {
    if (!Array.isArray(students))
        throw TypeError(`Argument students is not an instance of an Array`);
    return (
        students.reduce(
            (accumulator, current) => accumulator + current.grades,
            0
        ) / students.length
    );
}
/*
Task 3: Closures and Higher-Order Functions
1. Create a function called `createCounter` that returns a closure. 
The closure should be a counter function that increments the count on each call and returns the updated count.
Each closure should have its own independent count.
2. Implement a higher-order function called `repeatFunction` that takes a function and a number as arguments.
The function should return a new function that invokes the original function multiple times based on the provided number.
If the number is negative, the new function should invoke the original function indefinitely until stopped.
*/
function createCounter() {
    let count = 0;
    return () => {
        return count++;
    };
}
function repeatFunction(fn, times) {
    return () => {
        if (times < 0) {
            while (true) {
                fn();
            }
        } else {
            while (times != 0) {
                fn();
                --times;
            }
        }
    };
}
/* 
Task 4: Recursion and Tail Call Optimization
1. Implement a recursive function called `calculateFactorial`
that calculates the factorial of a given number.
Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
2. Create a recursive function called `power` that takes a base and an exponent as arguments.
The function should calculate the power of the base to the exponent using recursion.
*/
function calculateFactorial(n, accumulator) {
    if (n == 0) return accumulator;
    return n - 1 * calculateFactorial(n - 1, n * accumulator);
}
function power(n, exp) {
    if (exp == 1) return n;
    return n * power(n, exp - 1);
}
/*
Task 5: Lazy Evaluation and Generators
1. Implement a lazy evaluation function called `lazyMap`
that takes an array and a mapping function.
The function should return a lazy generator that applies the mapping function
to each element of the array one at a time.
2. Create a lazy generator function called `fibonacciGenerator`
that generates Fibonacci numbers one at a time using lazy evaluation.
*/
function lazyMap(arr, fn) {
    let index = 0;
    return () => {
        if (index < arr.length) {
            const elem = arr[index];
            fn(elem);
            ++index;
            return lazyMap(arr.slice(index, -1), fn);
        } else return;
    };
}
function fibonacciGenerator() {
    let first = 1;
    let second = 1;
    return () => {
        let temp = first + second;
        first = second;
        second = temp;
        return second;
    };
}

// const arr = [10, 20, 30, 40, 50];
// const discount = 5;
// try {
//     console.log(calculateDiscountedPrice(arr, discount));
//     console.log(calculateTotalPrice(arr));
// } catch (e) {
//     console.log(e);
// }

// const person = { firstName: "Albert", lastName: "Einstein" };
// console.log(getFullName(person));

// const text = "a ab abb abc abc abb hi hi hi hey hey he hello hel hel";
// console.log(filterUniqueWords(text));

// const students = [
//     { name: "a", grades: 1 },
//     { name: "b", grades: 2 },
//     { name: "c", grades: 3 },
//     { name: "d", grades: 4 },
// ];
// console.log(getAverageGrade(students));

// let cnter = createCounter();
// let cnter2 = createCounter();
// console.log(cnter());
// console.log(cnter());
// console.log(cnter2());
// console.log(cnter());
// console.log(cnter2());
// console.log(cnter());

// const fn = () => console.log("fn called");
// const newfn = repeatFunction(fn, 1);
// newfn();

// console.log(calculateFactorial(6, 0));
// console.log(power(2, 3));

// const lazyarray = [1, 2, 3, 4, 5];
// const powfn = (e) => {
//     console.log(e * e);
// };

// const fn2 = lazyMap(lazyarray, powfn)();
// console.log(lazyarray);
// console.log(fn2());
// console.log(fn2());
// console.log(fn2());
// console.log(fn2());
// console.log(fn2());
// console.log(lazyarray);

const fibgen = fibonacciGenerator();
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
console.log(fibgen());
