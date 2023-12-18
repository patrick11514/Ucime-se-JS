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
