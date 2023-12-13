//Inicializace proměnných
//globální proměnná
var promena = 5
//lokální (scoped) proměnná
let promena2 = 10
//konstanta
const promena3 = 15

//datové typy
//number (číslo)
let cislo = 5
//string (řetězec)
//několik zápsů
//jednoduché uvozovky
let retezec = 'text'
//dvojité uvozovky
// prettier-ignore
let retezec1 = "text"
//"šimé" uvozovky
let retezec2 = `text`
//výraz v řetězci
let retezec3 = `text ${cislo}`
let retezec4 = `text ${cislo + 5}`

//boolean (logická hodnota)
let boolean = true
let boolean2 = false

//pole (array) - seznam hodnot => pole == []
let pole = [1, 2, 3, 4, 5]
//pole s různými datovými typy
let pole2 = [1, 'text', true, null, undefined, [1, 2, 3, 4, 5], { jmeno: 'Jan', prijmeni: 'Novák' }]
//indexování
console.log(pole2[0])
console.log(pole2[1])
console.log(pole2[2])
//...

//object (objekt) - HashMapa, Key-Value pairs (klíč-hodnota) => object == {}
let objekt = {
    jmeno: 'Jan',
    prijmeni: 'Novák',
    vek: 20,
    //metoda - zajímavost
    pozdrav() {
        console.log('Ahoj')
    }
}
//získání hodnoty z objektu
console.log(objekt.jmeno)

//null (prázdná hodnota)
let nullHodnota = null

//undefined (nedefinovaná hodnota)
let undefinedHodnota = undefined
//undefined hodnotu mají proměnné, které nebyly inicializovány
let undefinedHodnota2

//console - práce s konzolí
//.log() - vypíše hodnotu do konzole (Pokud máme ConsoleNinja, tak hodnotu vypíše rovnou do editoru vedle daného řádku)
console.log('Ahoj')
console.log(promena)
console.log(promena2)
console.log(promena3)
console.log(cislo)
console.log(retezec)
console.log(retezec1)
console.log(retezec2)
console.log(retezec3)
console.log(retezec4)
console.log(boolean)
console.log(boolean2)
console.log(pole)
console.log(objekt) //zajímavost, zde se nám nevypíše metoda pozdrav
console.log(nullHodnota)
console.log(undefinedHodnota)
console.log(undefinedHodnota2)

//operátory
//aritmetické operátory
//sčítání
console.log(5 + 5)
//odčítání
console.log(5 - 5)
//násobení
console.log(5 * 5)
//dělení
console.log(5 / 5)
//modulo (zbytek po dělení)
console.log(5 % 5)

//porovnávací operátory
//rovná se
console.log(5 == 5)
//nerovná se
console.log(5 != 5)
//větší než
console.log(5 > 5)
//větší nebo rovno
console.log(5 >= 5)
//menší než
console.log(5 < 5)
//menší nebo rovno
console.log(5 <= 5)
//rovná se a typem - u == probíhá implicitní konverze typů, u === se porovnává i typ
console.log(5 === 5)
console.log(5 === '5')

//logické operátory
//a (and)
console.log(true && true)
console.log(true && false)
console.log(false && true)
console.log(false && false)

//nebo (or)
console.log(true || true)
console.log(true || false)
console.log(false || true)
console.log(false || false)

//negace (not)
console.log(!true)
console.log(!false)

//hodnota or hodnota
console.log(5 || 10)
console.log(0 || 10)
console.log(undefined || 10)
console.log(null || 10)

//hodnota ?? hodnota
console.log(5 ?? 10)
console.log(0 ?? 10)
console.log(undefined ?? 10)
console.log(null ?? 10)

//operátory pro práci s řetězci
//spojení řetězců
console.log('Ahoj' + ' ' + 'Jan')
//spojení řetězců s proměnnou
console.log('Ahoj ' + objekt.jmeno)
//spojení řetězců s proměnnou a výrazem
console.log('Ahoj ' + objekt.jmeno + ' ' + (objekt.vek + 5))
//šablona
console.log(`Ahoj ${objekt.jmeno} ${objekt.vek + 5}`)

//podmínky
const vek = 18
//if
if (vek >= 18) {
    console.log('Je ti více než 18')
}

//if-else
if (vek >= 18) {
    console.log('Je ti více než 18')
} else {
    console.log('Je ti méně než 18')
}

//if-else if-else
if (vek >= 18) {
    console.log('Je ti více než 18')
} else if (vek >= 15) {
    console.log('Je ti více než 15')
} else {
    console.log('Je ti méně než 15')
}
//ekvivalentí zápis s vnořeným if-else
if (vek >= 18) {
    console.log('Je ti více než 18')
} else {
    if (vek >= 15) {
        console.log('Je ti více než 15')
    } else {
        console.log('Je ti méně než 15')
    }
}

//switch - zjednodušený zápis pro if-else
switch (vek) {
    case 18:
        console.log('Je ti více než 18')
        break //pokud není break, tak se vykonají všechny následující návěští
    case 15:
        console.log('Je ti více než 15')
        break
    default:
        console.log('Je ti méně než 15')
        break
}

//switch bez break
switch (vek) {
    case 18:
        console.log('Je ti více než 18')
    case 15:
        console.log('Je ti více než 15')
    default:
        console.log('Je ti méně než 15')
}
//všechny inicializované proměnné v návěštích switche jsou lokální, tedy nelze použít dvě proměnné se stejným názvem v různých návěštích
switch (vek) {
    case 18:
        //let promena = 5
        console.log(promena)
        break
    case 15:
        //let promena = 10
        console.log(promena)
        break
    default:
        console.log('Je ti méně než 15')
        break
}
// lze vyřešit pomocí blokových (scoped) proměnných
switch (vek) {
    case 18: {
        let promena = 5
        console.log(promena)
        break
    }
    case 15: {
        let promena = 10
        console.log(promena)
        break
    }
    default:
        console.log('Je ti méně než 15')
        break
}

// ternární operátor
//podmínka ? hodnota1 : hodnota2
//zde se například nevypíše nic pomocí Console Ninji v editoru, proto se musím kouknout do konzole v prohlížeči
vek >= 18 ? console.log('Je ti více než 18') : console.log('Je ti méně než 18')
const hodnota = vek >= 18 ? 'Je ti více než 18' : 'Je ti méně než 18'
console.log(hodnota)

//cykly
//for
for (let i = 0; i < 10; i++) {
    console.log(i)
}

//for each - pouze pro pole
const pole45 = [1, 2, 3, 4, 5]
for (let prvek of pole45) {
    console.log(prvek)
}

//for in - lze použít i na objektech a projdu tím klíče
for (let i in { jmeno: 'Jan', prijmeni: 'Novák' }) {
    console.log(i)
}

//while
let i = 0
while (i < 10) {
    console.log(i)
    i++
}

//do-while
let j = 0
do {
    console.log(j)
    j++
} while (j < 10)
