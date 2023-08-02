function calculateDiscountedPrice(products, discount) {
    if (!Array.isArray(products))
        throw TypeError(`Argument producss is not an instance of an Array`);
    if (discount < 0 || discount > 100)
        throw Error(`Argument discount is not in range <0,100>`);
    return products.map((elem) => {
        return {
            name: elem.name,
            price: (elem.price * (100 - discount)) / 100,
        };
    });
}
function calculateTotalPrice(products) {
    if (!Array.isArray(products))
        throw TypeError(`Argument producss is not an instance of an Array`);
    return products.reduce(
        (accumulator, current) => accumulator + current.price,
        0
    );
}

function getFullName(person) {
    return person.firstName.concat(" ").concat(person.lastName);
}
function filterUniqueWords(text) {
    return text
        .toLowerCase()
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

function createCounter() {
    let count = 0;
    return () => {
        return ++count;
    };
}
function repeatFunction(fn, times) {
    return () => {
        if (times < 0) {
            setInterval(fn, 0);
        } else {
            while (times != 0) {
                fn();
                --times;
            }
        }
    };
}

function calculateFactorial(n, accumulator = 1) {
    if (n === 0) return accumulator;
    return calculateFactorial(n - 1, n * accumulator);
}
function power(n, exp) {
    if (exp === 0) return 1;
    if (exp === 1) return n;
    if (exp < 0) {
        return 1 / power(n, -exp);
    } else return n * power(n, exp - 1);
}

function lazyMap(arr, fn) {
    let index = 0;
    return () => {
        if (index < arr.length) {
            fn(arr[index]);
            ++index;
            return lazyMap(arr.slice(index, -1), fn);
        } else return;
    };
}
function fibonacciGenerator() {
    let first = 0;
    let second = 1;
    return () => {
        [first, second] = [second, first + second];
        return first;
    };
}

// try {
//     console.log(
//         calculateTotalPrice([
//             { name: "potato", price: 100 },
//             { name: "potato", price: 100 },
//         ])
//     );
//     console.log(
//         calculateDiscountedPrice(
//             [
//                 { name: "potato", price: 100 },
//                 { name: "potato", price: 100 },
//             ],
//             15
//         )
//     );
// } catch (e) {
//     console.log(e);
// }

// const person = { firstName: "Albert", lastName: "Einstein" };
// console.log(getFullName(person));

// const text = "a ab abb abc abc abb hi hi hi hey hey he hello hel hel";
// console.log(filterUniqueWords(text));

// console.log(
//     filterUniqueWords(
//         "hOw How HOw hoW To to make MaKe my My SalaRy salary bigger bigGER ?"
//     )
// );

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
// const newfn0 = repeatFunction(fn, 10);
// newfn0();
// const newfn = repeatFunction(fn, -1);
// newfn();

// console.log(calculateFactorial(0));
// console.log(calculateFactorial(1));
// console.log(calculateFactorial(2));
// console.log(calculateFactorial(3));
// console.log(calculateFactorial(5));

// console.log(power(2, 0));
// console.log(power(2, 1));
// console.log(power(2, 2));
// console.log(power(2, 3));
// console.log(power(2, -2));
// console.log(power(2, -3));

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

// const fibgen = fibonacciGenerator();
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
// console.log(fibgen());
