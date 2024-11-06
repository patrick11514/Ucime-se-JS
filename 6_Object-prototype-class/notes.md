## Object jako třída

-   Prvním konceptem, který můžeme využít je prostý Object
-   Object dokáže uchovávat i funkce

```JS
const Cat = {
    name: "Snowflake",
    print() {
        console.log("My cat's name is " + this.name);
    }
}

Cat.print() /// My cat's name is Snowflake
```

-   Také můžeme atributy modifikovat

```JS
const Cube = {
    side: 10,
    getVolume() {
        return Math.pow(this.side, 3);
    }
}

console.log(Cube.getVolume()) // 1000
Cube.side = 1
console.log(Cube.getVolume()) // 1
```

-   Vytváření nových instancí

```JS
const cube1 = Object.create(Cube)
console.log(cube1.getVolume()) // 1, protože nahoře bylo modifikováno
const cube2 = Object.create(Cube)
cube1.side = 5; // tady ale modifikujeme jen naši cube1, ne celou Cube
console.log(cube1.getVolume(), cube2.getVolume()) //125, 1
```

## Konstruktor

-   Určitě chceme nějakým způsobem objekt zkonstruovat na například v něm něco rovnou uložit
-   První věc, která nás napadne, která může dostávat parametry je funkce

```JS
function Car(model) {
    this.model = model;
}
```

-   Na funkci poté můžeme zavolat new pro vytvoření nové instance

```JS
const car = new Car("Super Cool Model");
console.log(car.model); //Super Cool Model
```

-   Teď chceme na naši "třídu" přidat nějaké metody
-   To funguje přes "prototype", který mají funkce na sobě
-   Tím dokážeme na našit "třídu" přidat metody

```JS
const methods = {
    getModel() {
        return this.model;
    }
}

//Assign
Object.assign(Car.prototype, methods)
//Nebo ručně
Car.prototype.getModel = function() {
    return this.model;
}

console.log(car.getModel()) //Super Cool Model
```

-   Nyní máme "třídu" Car, která má na sobě metodu getModel()
-   Můžeme se podívat na instanci této "třídy" co vlastní:

```JS
console.log(Object.hasOwn(car, 'getModel')) //false
console.log(Object.hasOwn(car, 'model')) //true
```

-   Jak vidíme, tak model je přímo na našem car (ukládáme ho do this), ale metoda getModel není námi vlastněna
-   To řeší i problém, co jsme viděli nahoře a to, že jsme si vytvořili instanci "třídy" Car a až poté na Car přidali metodu getModel() a i tak šlo na našem car zavolat getModel()

## Dědění

-   Dědění probíhá tak, že na existující objekt navážeme další prototype, tedy prototype na prototypu

```JS
const Animal = {
    type: "unknown",
    getType() {
        return this.type
    }
}

console.log(Animal.getType()) // unknown

const Dog = {
    __proto__: Animal,
    type:"Dog",
}

console.log(Dog.getType()) // Dog

class Cat = {
    __proto__: Animal,
    type: "Cat"
}

console.log(Cat.getType()) // Cat
```

-   Ukázna komplexnějšího případu

```JS
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
```

## Klíčové slovíčko Class

-   Aby bylo vytvářet "třídy" příjemnější

```JS
class Car {
    constructor(model) {
        this.model = model;
    }
}

const car = new Car("AnotherCar");
console.log(car.model); //AnotherCar
```

-   Dědění

```JS
class Animal {
    type = "unknown"

    print() {
        console.log(this.type);
    }
}

class Dog extends Animal {
    type = "Dog"
}

new Animal().print()
new Dog().print()
```

-   Typescript feature!!!
-   Převedení parametrů na atribut
-   Místo:

```JS
class Something {
    constructor(some, random, parameters) {
        this.some = some
        this.random = random
        this.parameters = parametery
    }
}
```

-   Napíšu toto:

```TS
class Something {
    constructor(public some, public random, public parameters) {
    }
}
```

-   Privatate:
-   V JS nemáme žádné klíčové slova jako private/public, ale metody/funkce, které začínají # jsou private přímo ze strany JS a nemůžeme k nim mimo třídu přistupovat
-   Typescript poté přidává klíčová slova: public/private/protected, ale ty kontroluje pouze typescript a po compilu jsou všechny věci public, pokud neoznačíme #, aby to bylo striktně private

-   Složitější ukázka:

```JS
class Employee {
    tier = "employee"
    constructor(name) {
        this.name = name
    }

    print() {
        console.log(`${this.tier}: I am ${this.name}`)
    }
}

class Management extends Employee {
    tier = "management"

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
```
