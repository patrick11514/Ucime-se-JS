//inicializace proměnné
//globální proměnná
var promena = 5
//scoped proměnná
let promena2 = 10
//konstanta
const promenna3 = 'pepa'

//datové typy
//number (cislo)
let cislo2 = 1
//string (text)
let b = 'Text'
//boolean (pravdivostní proměnná)
let c = true
//array (pole)
let d = [1]
//object (Key-Value Pair - Record)
let e = {
    jmeno: 'Pavel',
    vek: 10
}
//null (žádná hodnota)
let f = null
//undefined (nedefinovaná hodnota - nemá hodnotu)
let g = undefined

//operátory
//+, -, *, /, %
let cislo = 1 + 2
// or
let or = cislo || b
// and
let and = cislo && b
// ??
let promenna = g ?? 5

//podmínky
//if-else
if (cislo < 10) {
    console.log('a je mensi nez 10')
} else {
    console.log('a je 10 a vice')
}

//if-elseif-else
let ab = 5
let ac = 10

if (ab < 100) {
    console.log('ab je mensi nez 100')
} else if (ab < 150) {
    console.log('ab je vetsi a rovno 100 a mensi nez 150')
} else {
    console.log('ab je vetsi a rovno 150')
}

let aa = 10
if (aa == 1 || aa == 2 || aa == 3) {
    console.log('promenna je jedna')
} else if (aa == 10) {
    console.log('promenna je 10')
} else if ((aa = 20)) {
    console.log('promenna je 20')
} else {
    console.log('promena je neco jineho')
}

//switch
switch (aa) {
    case 1:
    case 2:
    case 3:
        console.log('promenna je jedna')
        break
    case 10:
        console.log('promenna je 10')
        break
    case 20:
        console.log('promena je 20')
        break
    default:
        console.log('promena je neco jineho')
        break
}

//cykly
//for
for (let i = 0; i < 10; i++) {
    console.log(i)
}
//foreach
for (let i of [1, 5, 6, 6, 4]) {
    console.log(i)
}

let text = 'Je to hard jak cyp'
let pole = text.split(' ')
for (let i of pole) {
    console.log(i)
}

for (let i in pole) {
    console.log(i)
}

//for
for (let i = 0; i < 10; i++) {
    console.log(i)
}

//while
let i = 0
while (i < 10) {
    console.log(i)
    i++
}

//do while
i = 0
do {
    console.log(i)
    i++
} while (i > 10)

let fgsdgfs = []

fgsdgfs.toReversed()
