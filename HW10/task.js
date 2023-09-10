// To simplify application does not create deep copies of any objects.
// Each object is passed through a reference.

class Book {
    // private properties
    #title;
    #author;
    #ISBN;
    #price;
    #availability;
    // constructor setting properties values with primitive types
    constructor(title, author, ISBN, price, availability) {
        this.#title = title;
        this.#author = author;
        this.#ISBN = ISBN;
        this.#price = price;
        this.#availability = availability;
    }
    // getters, there are no setters
    // accessing properties is enabled
    // modifying properties is disabled
    get title() {
        return this.#title;
    }
    get author() {
        return this.#author;
    }
    get ISBN() {
        return this.#ISBN;
    }
    get price() {
        return this.#price;
    }
    get availability() {
        return this.#availability;
    }
    // order() and return() are used in processing of a order and modify instance's state.
    order() {
        if (!this.#availability)
            throw new Error(`Already ordered: {title=${this.#title}}`);
        this.#availability = false;
    }
    return() {
        if (this.#availability)
            throw new Error(`Already returned: {title=${this.#title}}`);
        this.#availability = true;
    }
    // method used to debug state at the end of a program
    toString() {
        return `available: ${this.#availability}\ttitle: ${this.#title}`;
    }
}

/*
Encapsulation is achieved through combination of getters and limited number of public setters (depending on requirement if property needs to be mutated).
It is impossible to modify object's state in a uncontrolled manner.

let book = new Book(
    "Alla vi barn i Bullerbyn",
    "Astrid Lindgren",
    "1-1-1-9900",
    10,
    true
);
book.author = "a";
book.ISBN = "0";
book.availability = false;
console.log(`${book}`);

Created instance book has unchanged properties.
*/

class NonFictionBook extends Book {
    // private property of NonFictionBook instances
    #facts;
    constructor(title, author, ISBN, price, availability, facts) {
        super(title, author, ISBN, price, availability);
        this.#facts = facts;
    }
    // methods available in NonFictionBook instances, but not Book instances
    get facts() {
        return this.#facts;
    }
    listFacts() {
        for (const [index, fact] of this.#facts.entries()) {
            console.log(`Fact number ${index + 1}: ${fact}`);
        }
    }
}
class FantasyBook extends Book {
    // private property of FantasyBook instances
    #description;
    constructor(title, author, ISBN, price, availability, description) {
        super(title, author, ISBN, price, availability);
        this.#description = description;
    }
    // methods available in FantasyBook instances, but not Book instances
    get description() {
        return this.#description;
    }
    describe() {
        console.log("This is the book for fantasy fans.", this.#description);
    }
}

class User {
    // private properties
    #name;
    #email;
    #id;
    static #userid = 0;
    // primitive types passed to the constructor
    constructor(name, email) {
        this.#name = name;
        this.#email = email;
        this.#id = User.#userid++;
    }
    // getters
    get name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get id() {
        return this.#id;
    }
}

class Cart {
    // private properties
    #cart;
    #user;
    constructor(user) {
        this.#user = user;
        this.#cart = [];
    }
    // getters
    get cart() {
        return this.#cart;
    }
    get user() {
        return this.#user;
    }
    // methods changing instance's state
    addBook(book) {
        if (!(book instanceof Book)) return;
        if (book.availability) this.#cart.push(book);
    }
    removeBook(book) {
        if (!(book instanceof Book)) return;
        this.#cart = this.#cart.filter((e) => e.ISBN !== book.ISBN);
    }
    // method returning sum of books in a cart
    totalPrice() {
        return this.#cart.reduce((prev, curr, _) => {
            return prev + curr.price;
        }, 0);
    }
}
class Order {
    // private properties
    #user;
    #cart;
    constructor(user, cart) {
        this.#user = user;
        this.#cart = cart;
    }
    // method processing order
    order() {
        // I'm comparing references as stated in the beginning.
        if (this.#user != this.#cart.user) return;
        const processed = [];
        try {
            this.#cart.cart.forEach((book) => {
                book.order();
                processed.push(book);
            });
        } catch (error) {
            processed.forEach((book) => {
                book.return();
            });
        }
    }
}

// Array 'books' contains instances of classes Book, NonFictionBook and FantasyBook. They are used interchangeably later, which presents polymorphism.
const books = [
    new Book(
        "Alla vi barn i Bullerbyn",
        "Astrid Lindgren",
        "1-1-1-9900",
        10,
        true
    ),
    new NonFictionBook(
        "O psie, który jeździł koleją",
        "Roman Pisarski",
        "1-1-2-9900",
        20,
        true,
        ["Traveling dog", "Train"]
    ),
    new Book(
        "Black Holes and Baby Universes and Other Essays",
        "Stephen William Hawking",
        "1-1-3-9900",
        30,
        true
    ),
    new Book(
        "JavaScript: The Definitive Guide",
        "David Flanagan",
        "1-1-4-9900",
        30,
        true
    ),
    new Book("Programming TypeScript", "Boris Cherny", "1-1-5-9900", 30, true),
    new FantasyBook(
        "Clean Code in PHP. Expert tips and best practices to write beautiful, human-friendly, and maintainable PHP",
        "Carsten Windler",
        "1-1-6-9900",
        30,
        true,
        "This PHP book is cleanly split to help you navigate through coding practices and theories to understand and adopt the nuances of the clean code paradigm. In addition to covering best practices, tooling for code quality, and PHP design patterns, this book also presents tips and techniques for working on large-scale PHP apps with a team and writing effective documentation for your PHP projects."
    ),
    new Book(
        "Eloquent JavaScript, 3rd Edition",
        "Marijn Haverbeke",
        "1-1-7-9900",
        30,
        true
    ),
];

// User objects are created from primitive types.
const john = new User("john", "john@gmail.com");
const kate = new User("kate", "kate@gmail.com");
const jane = new User("jane", "jane@gmail.com");

console.log(john.id, kate.id, jane.id);

// Each cart has assigned owner.
const cart1 = new Cart(john);
const cart2 = new Cart(kate);
const cart3 = new Cart(jane);

cart1.addBook(books[0]);
cart1.addBook(books[1]);
cart1.addBook(books[2]);

cart2.addBook(books[2]);
cart2.addBook(books[3]);
cart2.addBook(books[4]);

cart3.addBook(books[4]);
cart3.addBook(books[5]);

// Each order requires registered user and existing shopping cart.
const u1order = new Order(john, cart1);
// success
u1order.order();

const u2order = new Order(kate, cart2);
// failed
u2order.order();

const u3order = new Order(jane, cart3);
// success
u3order.order();

// removing unavailable books from a cart
cart2.removeBook(books[2]);
cart2.removeBook(books[4]);
// adding last available book
cart2.addBook(books[6]);

// success
u2order.order();

logbooks(books);
// all books are ordered

function logbooks(arr) {
    arr.forEach((e) => {
        console.log(`${e}`);
    });
}
