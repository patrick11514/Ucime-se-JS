const Cat = {
    name: 'Snowflake',
    print() {
        console.log("My cat's name is " + this.name)
    }
}

Cat.print() /// My cat's name is Snowflake

const Cube = {
    side: 10,
    getVolume() {
        return Math.pow(this.side, 3)
    }
}

console.log(Cube.getVolume()) // 1000
Cube.side = 1
console.log(Cube.getVolume()) // 1

const cube1 = Object.create(Cube)
console.log(cube1.getVolume()) // 1000
const cube2 = Object.create(Cube)
cube1.side = 5
console.log(cube1.getVolume(), cube2.getVolume())

function Car(model) {
    this.model = model
}

const car = new Car('Super Cool Model')
console.log(car.model)

const methods = {
    getModel() {
        return this.model
    }
}

//Assign
Object.assign(Car.prototype, methods)
//Nebo ručně
/*Car.prototype.getModel = function() {
    return this.model;
}*/

console.log(car.getModel())

console.log(Object.hasOwn(car, 'getModel'))
console.log(Object.hasOwn(car, 'model'))

{
    const Animal = {
        type: 'unknown',
        getType() {
            return this.type
        }
    }

    console.log(Animal.getType()) // unknown

    const Dog = {
        __proto__: Animal,
        type: 'Dog'
    }

    console.log(Dog.getType()) // Dog

    const Cat = {
        __proto__: Animal,
        type: 'Cat'
    }

    console.log(Cat.getType()) // Cat
}

function Employee(name) {
    this.tier = 'employee'
    this.name = name
}

Employee.prototype.print = function() {
    console.log(`${this.tier}: I am ${this.name}`)
}

function Management(name) {
    this.tier = 'management'
    this.name = name
}

Management.prototype.__proto__ = Employee.prototype

function Company(name) {
    this.employees = []
    this.name = name
}

Company.prototype.addEmployee = function(employee) {
    this.employees.push(employee)
}

Company.prototype.print = function() {
    console.log(`Company ${this.name} has ${this.employees.length} employees`)

    for (const employee of this.employees) {
        employee.print()
    }
}

const company1 = new Company('Sony')
company1.addEmployee(new Employee('Peter'))
company1.addEmployee(new Management('Lucy'))
company1.addEmployee(new Employee('Josh'))

company1.print()

//

{
    class Car {
        constructor(model) {
            this.model = model
        }
    }

    const car = new Car('AnotherCar')
    console.log(car.model) //AnotherCar
}

//

{
    class Animal {
        type = 'unknown'

        print() {
            console.log(this.type)
        }
    }

    class Dog extends Animal {
        type = 'Dog'
    }

    new Animal().print()
    new Dog().print()
}

{
    class Employee {
        tier = 'employee'
        constructor(name) {
            this.name = name
        }

        print() {
            console.log(`${this.tier}: I am ${this.name}`)
        }
    }

    class Management extends Employee {
        tier = 'management'

        constructor(name) {
            super(name) // voláme konstuktor rodiče
        }
    }

    class Company {
        constructor(name) {
            this.employees = []
            this.name = name
        }

        addEmployee(employee) {
            this.employees.push(employee)
        }

        print() {
            console.log(`Company ${this.name} has ${this.employees.length} employees`)

            for (const employee of this.employees) {
                employee.print()
            }
        }
    }

    const company1 = new Company('Sony')
    company1.addEmployee(new Employee('Peter'))
    company1.addEmployee(new Management('Lucy'))
    company1.addEmployee(new Employee('Josh'))

    company1.print()
}
