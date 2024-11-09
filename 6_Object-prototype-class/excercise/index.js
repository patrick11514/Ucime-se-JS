const Cat = {
    name: 'Snowflake',
    print() {
        console.log("My cat's name is " + this.name);
    }
};

Cat.print();

const Cube = {
    side: 10,
    getVolume() {
        return Math.pow(this.side, 3);
    }
};

console.log(Cube.getVolume());
Cube.side = 1;
console.log(Cube.getVolume());

const cube1 = Object.create(Cube);
console.log('cube1:', cube1.getVolume());

const cube2 = Object.create(Cube);

cube1.side = 5;

console.log('cube1', cube1.getVolume(), 'cube2', cube2.getVolume());

///

function Car(model) {
    this.model = model;
}

const car = new Car('Super Cool Model');
console.log(car.model);

const methods = {
    getModel() {
        return this.model;
    }
};

/*Car.prototype.getModel = function () {
    return this.model;
};*/

/*Car.prototype.hello = function () {
    console.log('Hello');
};*/

Object.assign(Car.prototype, methods);

console.log('Auto: ', car.getModel());

console.log(Object.hasOwn(car, 'getModel'));
console.log(Object.hasOwn(car, 'model'));

Car.prototype.hello = function () {
    console.log('Hello ' + this.model);
};

car.hello();

//
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.updateAge = function () {
    this.age++;
};

const person = new Person('Lucka', 24);

person.updateAge();

console.log(person.age);

//

const Animal = {
    type: 'unknown',
    getType() {
        return this.type;
    },
    sayHello() {
        console.log('Hello, I am ' + this.type);
    }
};

console.log(Animal.getType());

const Dog = {
    type: 'dog',
    bark() {
        console.log('Bark, Bark');
    },
    __proto__: Animal
};

console.log(Dog.getType());

Dog.sayHello();

Dog.bark();

{
    const Cat = {
        type: 'cat',
        __proto__: Animal
    };

    Cat.sayHello();
}

///

function Employee(name) {
    this.tier = 'employee';
    this.name = name;
}

Employee.prototype.print = function () {
    console.log(`${this.tier}: I am ${this.name}`);
};

function Management(name) {
    this.tier = 'management';
    this.name = name;
}

Management.prototype.__proto__ = Employee.prototype;

function Company(name) {
    this.employees = [];
    this.name = name;
}

Company.prototype.addEmployee = function (employee) {
    this.employees.push(employee);
};

Company.prototype.print = function () {
    console.log(`Company ${this.name} has ${this.employees.length} employees`);

    for (const employee of this.employees) {
        employee.print();
    }
};

const company1 = new Company('Sony');
company1.addEmployee(new Employee('Peter'));
company1.addEmployee(new Management('Lucy'));
company1.addEmployee(new Employee('Josh'));

company1.print();

///
{
    class Car {
        constructor(model) {
            this.model = model;
        }

        getModel() {
            return this.model;
        }
    }

    const car = new Car('Another car');
    console.log(car.getModel());
}

{
    class Animal {
        type = 'unknown';

        print() {
            console.log(this.type);
        }
    }

    class Dog extends Animal {
        type = 'dog';
    }

    const animal = new Animal();
    animal.print();

    const dog = new Dog();
    dog.print();
}

{
    class Car {
        constructor(model, speed, horsePower) {
            this.model = model;
            this.speed = speed;
            this.horsePower = horsePower;
        }
    }
}

class Adventurer {
    health = 100;
    #name;

    constructor(name) {
        this.#name = name;
    }

    sayHello() {
        console.log('Hi I am ' + this.#name);
    }
}

const adventurer = new Adventurer('TomKaokeriTerminator19BigPepa');

adventurer.sayHello();
{
    class Employee {
        tier = 'employee';
        constructor(name) {
            this.name = name;
        }

        print() {
            console.log(`${this.tier}: I am ${this.name}`);
        }
    }

    class Management extends Employee {
        tier = 'management';

        constructor(name) {
            super(name); // voláme konstuktor rodiče
        }
    }

    class Company {
        constructor(name) {
            this.employees = [];
            this.name = name;
        }

        addEmployee(employee) {
            this.employees.push(employee);
        }

        print() {
            console.log(`Company ${this.name} has ${this.employees.length} employees`);

            for (const employee of this.employees) {
                employee.print();
            }
        }
    }

    const company1 = new Company('Sony');
    company1.addEmployee(new Employee('Peter'));
    company1.addEmployee(new Management('Lucy'));
    company1.addEmployee(new Employee('Josh'));

    company1.print();
}
