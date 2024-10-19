const ovoce = ['Jablko', 'Hruška', 'Třešeň']

for (let i = 0; i < ovoce.length; i++) {
    console.log(ovoce[i])
}

for (const item of ovoce) {
    console.log(item)
}

for (const item of ovoce) {
    console.log(item)
}

for (const index in ovoce) {
    console.log(ovoce[index])
}

//ctverec

function vypoctiObsah(a) {
    const vysledek = a * a
    return vysledek
}

function vypoctiObjem(podstava, vyska) {
    return podstava * vyska
}

const stranaA = 10

const objem = vypoctiObjem(vypoctiObsah(stranaA), 10)

console.log(objem)

const a = function () {
    console.log('Ahoj')
}

const b = () => {}

function pozdrav(slovo, jmeno) {
    console.log(`${slovo()} ${jmeno}`)
}

function Ahoj() {
    return 'Ahoj'
}

function Cau() {
    return 'Cau'
}

pozdrav(Cau, 'Patriku')

//function pocitejDoNuly(n) {
//    console.log(n)
//    pocitejDoNuly(n + 1)
//}
//
//pocitejDoNuly(1)

const text = 'Ahoj'

console.log(text.length)

console.log(text[0])

console.log(text.charAt(2))

///////////////0123456789
const text2 = 'Ahoj pepo pepo'

console.log(text2.replace('pepo', 'karle'))

console.log(text2.replaceAll('pepo', 'karle'))

console.log(text2.toLocaleLowerCase())
console.log(text2.toLocaleUpperCase())

const text3 = '       Ahoj      baf     lek    neco    '

console.log(text3.trim())
console.log(text3.trimStart())
console.log(text3.trimEnd())

console.log(text2.split(' '))
console.log(text2.split(' ', 2))

console.log(text2.substring(2))
console.log(text2.substring(2, 5))

console.log(text2.substr(2))
console.log(text2.substr(2, 5))

console.log(text2.slice(2))
console.log(text2.slice(2, 5))

console.log(text2.slice(-5))
console.log(text2.substring(-5))

console.log(text2.startsWith('Ahoj'))
console.log(text2.startsWith('pepo'))

console.log(text2.endsWith('Ahoj'))
console.log(text2.endsWith('pepo'))

let array = ['123456', 15641561, true, false]

console.log(array.length)

array.push(10)
console.log(array)

console.log(array.pop())
console.log(array)

array.unshift(10)
console.log(array)

console.log(array.shift())
console.log(array)

console.log(array.slice(1, 3))
console.log(array)

console.log(array.splice(1, 2))
console.log(array)

array = ['123456', 15641561, true, false]

console.log(array.splice(1, 2, 'Dalsi prvek'))
console.log(array)

array = ['123456', 15641561, true, false]

console.log(array.splice(1, 2, 'Pepa', 'Karel', 'Honza', 'Atd'))
console.log(array)

array = ['123456', 15641561, true, false]

console.log(array.toSpliced(1, 2))
console.log(array)

console.log(array.reverse())
console.log(array)

console.log(array.toReversed())
console.log(array)

const array2 = ['ahoj', 123, ['neco', true, ['bla'], false], 485456]

console.log(array2.flat(2))
console.log(array2)

const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function jeCisloSude(n) {
    return n % 2 == 0
}

console.log(array3.find(jeCisloSude))

console.log(
    array3.find(function (n) {
        return n % 2 == 0
    })
)

console.log(array3.find((n) => n % 2 == 0))

console.log(
    array3.find((n) => {
        return n % 2 == 0
    })
)

console.log(array3.findIndex(jeCisloSude))

console.log(array3.filter(jeCisloSude))
console.log(array3.filter(() => true))

function druhaMocnina(n) {
    return n * n
}

console.log(array3.map(druhaMocnina))

console.log(array3.includes(6))
console.log(array3.includes(666))

console.log(array3.join(' < '))

let čtverce = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function naDruhou(n) {
    return n * n
}

čtverce = čtverce.map(naDruhou)

console.log(čtverce) // [1, 4, 9, 16, 25, 36, 49, 64, 81]

let soucet = 0

for (const obsah of čtverce) {
    soucet += obsah
}

console.log(soucet)

console.log(
    čtverce.reduce((a, b) => {
        return a + b
    })
)

const array4 = ['Ahoj', 'pepo', 'dneska', 'do', 'skoly', 'neprijdu', 'protoze', 'me', 'boli', 'hlava']

console.log(
    array4.reduce((a, b) => {
        console.log(a)
        console.log(b)
        return a + ' ' + b
    })
)
