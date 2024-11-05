const list = ['jahody', 'brambory', 'olivy', 'banány', 'jablka']

//Jahody = 50
//Brambory = 30
//Banány = 20
//Jablka = 10

const prices = {
    jahody: 50,
    brambory: 30,
    banány: 20,
    jablka: 10
}

let price = 0

for (const item of list) {
    price += prices[item] ?? 0
}

console.log(price)

//////////////////

const keys = []

for (const key in prices) {
    keys.push(key)
}

console.log(keys)

console.log(Object.keys(prices))
console.log(Object.values(prices))
console.log(Object.entries(prices))

let totalPrice = 0

for (const item in prices) {
    console.log('Nakupuju: 1x ' + item)
    totalPrice += prices[item]
}

for (const entry of Object.entries(prices)) {
    console.log('Nakupuju: 1x ' + entry[0])
    totalPrice += entry[1]
}

console.log(totalPrice)

///
///
///

const Osoba = {
    jmeno: 'Patrik',
    vek: 100,
    zije: true
}

function jeOsobaPlnoleta({ vek }) {
    return vek >= 18
}

function dejMiJmenoOsoby({ jmeno, zije }) {
    return jmeno + zije
}

console.log(jeOsobaPlnoleta(Osoba))
console.log(dejMiJmenoOsoby(Osoba))

///

{
    let totalPrice = 0
    for (const [item, price] of Object.entries(prices)) {
        console.log('Nakupuju: 1x ' + item)
        totalPrice += price
    }

    console.log(totalPrice)
}

///

let obj = {}
obj['obj'] = obj

try {
    console.log('Ahoj')

    JSON.stringify(obj)

    console.log('Ahoj2')
} catch (error) {
    console.log(error)
} finally {
    console.log('Toto se stane na konci')
}

////

const CODE = '10 + 2'

console.log(eval(CODE))
