// Task 3: Object Property Getters and Setters

// Create an object called bankAccount with the following properties and values:
// balance: 1000 (default value)
// Use a getter to define a property called formattedBalance,
//  which returns the balance with a currency symbol (e.g., "$1000").

// Use a setter to define a property called balance,
//  which updates the account balance and automatically updates the corresponding formattedBalance value.

// Implement a method called transfer on the bankAccount object
// that takes two bankAccount objects and an amount as arguments.
// The method should transfer the specified amount from the current account to the target account.
// Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

let obj = Object.create(Object.prototype, {
    _balance: {
        value: 1000,
        writable: true,
    },
    balance: {
        set: function (v) {
            this._balance = v;
        },
    },
    formattedBalance: {
        get: function () {
            return `$${this._balance}`;
        },
    },
    transfer: {
        value: function (obj, amount) {
            if (amount <= this._balance) {
                this._balance -= amount;
                obj.balance = obj.balance + amount;
            }
        },
    },
});

let obj2 = Object.create(Object.prototype, {
    _balance: {
        value: 1000,
        writable: true,
    },
    balance: {
        set: function (v) {
            this._balance = v;
        },
        get: function () {
            return this._balance;
        },
    },
    formattedBalance: {
        get: function () {
            return `$${this._balance}`;
        },
    },
    transfer: {
        value: function (obj, amount) {
            if (amount <= this._balance) {
                this.balance = this.balance - amount;
                obj.balance = obj.balance - amount;
            }
        },
    },
});

console.log(`obj1 ${obj.formattedBalance}`);
console.log(`obj2 ${obj2.formattedBalance}`);
obj.transfer(obj2, 500);
console.log(`obj1 ${obj.formattedBalance} obj2 ${obj2.formattedBalance}`);
