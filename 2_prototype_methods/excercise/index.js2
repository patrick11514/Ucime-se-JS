//opakovani
{
    let pepa = 10

    console.log(pepa)
    const pole = ['Patrik', 'Honza', 'Karel', 'Pepík']

    const obj = { jmeno: 'Patrik', vyska: 193, vek: 20 }

    console.log(obj.jmeno)
    console.log(obj['jmeno'])

    for (let i = 0; i < pole.length; i++) {
        console.log(pole[i])
    }

    for (let index in obj) {
        console.log(obj[index])
    }

    for (let jmeno of pole) {
        console.log(jmeno)
    }

    for (let i = 0; i < pole.length; i++) {
        let jmeno = pole[i]
        console.log(jmeno)
    }
}

let c = 10
let vc = 5
let vysledek = (c * vc) / 2

console.log(vysledek)

c = 20
vc = 10
vysledek = (c * vc) / 2

console.log(vysledek)

c = 30
vc = 15
vysledek = (c * vc) / 2

console.log(vysledek)

function obsahTrojiuhelniku(c, vc) {
    return (c * vc) / 2
}

const obsahTrojiuhelniku2 = (c, vc) => {
    return (c * vc) / 2
}

let obsah1 = obsahTrojiuhelniku(10, 5)
let obsah2 = obsahTrojiuhelniku2(20, 10)
let obsah3 = obsahTrojiuhelniku2(30, 15)

console.log(obsah1, obsah2, obsah3)

function vypocetObdelniku(a, b) {
    return a * b
}

let novaFunkce = vypocetObdelniku

let vys = novaFunkce(10, 20)
console.log(vys)

function sectiCisla(a, b) {
    return a + b
}

function odectiCisla(a, b) {
    return a - b
}

function provedOperaci(funkce, a, b) {
    return funkce(a, b)
}

console.log(provedOperaci(sectiCisla, 10, 5))

function RekniAhoj(jmeno) {
    console.log(`Ahoj ${jmeno}`)
}

function RekniCau(jmeno) {
    console.log(`Cau ${jmeno}`)
}

const nejakaFunkce = function () {
    console.log('aaaa')
}

nejakaFunkce()

function Pozdrav(pozdravovaciFunkce, jmeno) {
    pozdravovaciFunkce(jmeno)
}

Pozdrav(function (jmeno) {
    console.log(`Dobrý den, ${jmeno}`)
}, 'Pepo')

Pozdrav((jmeno) => {
    console.log(`Dobrý den, ${jmeno}`)
}, 'Pepo')

//metody
const text = 'Kráva dělá bů'
let delka = text.length
console.log(delka)

//indexováni
console.log(text[1])
console.log(text.charAt(1))
console.log(text.replace('Kráva', 'Koza').replace('bů', 'méé'))

console.log('Ahoj Ahoj, Pepo'.replace('Ahoj', 'Čau'))
console.log('Ahoj Ahoj, Pepo'.replaceAll('Ahoj', 'Čau'))

console.log(text.toLowerCase())
console.log(text.toUpperCase())

const zadanyText = '        PIN KE KARTĚ     '
console.log(zadanyText.trim())
console.log(zadanyText.trimStart())
console.log(zadanyText.trimEnd())

{
    const nákupníSeznam = 'Jahody, Mrvke, Jogurt'
    let pole = nákupníSeznam.split(', ', 2)
    console.log(pole)
}
const viceRadkovyText = `Prvni radek
Druhy Radek
Treti Radek`

console.log(viceRadkovyText.split('\n'))

const nejakyText = 'Toto je nejaky text'

console.log(nejakyText.substring(2))
console.log(nejakyText.substring(2, 4))
console.log(nejakyText.substring(-5))
console.log(nejakyText.substr(2, 4))
console.log(nejakyText.substr(3, 4))
console.log(nejakyText.slice(2))
console.log(nejakyText.slice(2, 4))
console.log(nejakyText.slice(-5))
console.log('Ahoj, jak se mas'.startsWith('Ahoj'))
console.log('Cau, jak se mas'.startsWith('Ahoj'))
console.log('Ahoj, jak se mas'.endsWith('mas'))
console.log('Cau, jak se mam'.endsWith('mas'))

//metody nad polem
let pole1 = [1, 2, 3]
console.log(pole1.length)
console.log(pole1.push(4))
console.log(pole1)

let pole2 = [1, 2, 66666]
console.log(pole2)
console.log(pole2.pop())
console.log(pole2)

const names = ['Honza', 'Pepa', 'Karel']
const stack = []

for (const name of names) {
    stack.push(name)
}

console.log(stack)

const length = stack.length

for (let i = 0; i < length; i++) {
    console.log(stack.pop())
}

let pole3 = [1, 2, 3]
console.log(pole3)
console.log(pole3.unshift(4))
console.log(pole3)

let pole4 = [1, 2, 3]
console.log(pole4)
console.log(pole4.shift())
console.log(pole4)

let pole5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(pole5)
console.log(pole5.slice(-5))
console.log(pole5)

let pole6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(pole6)
console.log(pole6.splice(6, 2))
console.log(pole6)

let pole7 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(pole7)
console.log(pole7.splice(6, 2, 66, 12, 44))
console.log(pole7)

let pole8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(pole8)
let poleBez56 = pole8.toSpliced(4, 2)
console.log(poleBez56)
console.log(pole8)
console.log(pole8.toSpliced(6, 2))
console.log(pole8)

let pole9 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole9)
pole9.reverse()
console.log(pole9)

let pole10 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole10)
console.log(pole10.toReversed())
console.log(pole10)

let pole11 = [1, 2, [3, 4, 5], [6, [7, 8, 9]], 10]
console.log(pole11)
console.log(pole11.flat())
console.log(pole11.flat(2))
console.log(pole11)

function findStringWithLength5(current) {
    if (current.length == '5') {
        return true
    } else {
        return false
    }
}

let pole12 = ['Pepa', 'Honza', 'Karel', 'Kyblík']
console.log(
    pole12.find((current) => {
        return current.length == 5
    })
)

function find(searchFunction) {
    for (const current of pole12) {
        if (searchFunction(current)) {
            return current
        }
    }

    return undefined
}

console.log(find(findStringWithLength5))

console.log(
    pole12.findIndex((current) => {
        return current.length == 5
    })
)

console.log(
    pole12.filter((current) => {
        return current.length == 5
    })
)

let pole13 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(
    pole13.map((cislo) => {
        return cislo * 2
    })
)

console.log(pole13)

console.log(pole12.includes('Honza'))

console.log(pole13.join(', '))

{
    const endWord = 'superman'
    const text = 'Pepa je super ' + endWord
    const delka = text.length
    const text2 = text.replace('Pepa', 'Karel')
    console.log(text2)
    console.log(text2.substring(0, 5))
    console.log(text2.substring(15, text2.length))
    console.log(text2.slice(-1 * endWord.length))
}

//basic info

let cislo = 10
cislo = cislo * 2
console.log(cislo)

let pozdrav = 'Ahoj'
let jmeno = 'Pepo'
let celyPozdrav = pozdrav + ' ' + jmeno
celyPozdrav = `${pozdrav} ${jmeno}`

console.log(celyPozdrav)

let pole = [
    1,
    2,
    3,
    4,
    'Pepa',
    'karel',
    {
        nick: 'patrick115',
        health: 20
    }
]

{
    let pole = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    for (let i = 0; i < pole.length; i++) {
        const cislo = pole[i]
        console.log(cislo)
    }

    for (const cislo of pole) {
        console.log(cislo)
    }

    for (let i = 0; i < pole.length; i++) {
        const cislo = pole[i]

        console.log(cislo)
    }

    let i = 0

    while (i < pole.length) {
        const cislo = pole[i]

        console.log(cislo)

        i++
    }
}

//Úkol 1
/**
 * 
1. Vymyslet funkci, která vypočítá obsah čtverců v poli

Jak budou čtverce zapsané?

```JS
let čtverce = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//výpočet ....

console.log(čtverce); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
```

2. Nyní všechny součty čtverců vypočítat dohromady a uložit do nějaké konstatní proměnné.

2.2. Pomocí cyklu
2.3. Pomocí funkce `reduce()`

3. Poté vypsat obsah čtverců pomocí funkce `console.log()` do stringu, který bude vypadat takto:

```
Obsah čtverců čísel 1, 2, 3, 4, 5, 6, 7, 8, 9 je 285.
```
 */

let čtverce = [1, 2, 3, 4, 5, 6, 7, 8, 9]

čtverce = čtverce.map((a) => {
    return a * a
})

const soucet = čtverce.reduce((prev, curr) => prev + curr)

console.log(`Obsah čtverů čísel ${čtverce.join(', ')} je ${soucet}`)
