//Proměnné

{
    let cislo = -10.1

    cislo

    let text = `Ahoj`
    //let text2 = "Ahoj"
    //let text3 = 'Ahoj'

    text

    let pravda = true
    pravda

    let nepravda = false
    nepravda

    let array = [10, 'Ahoj', true, []]

    array

    let prvnihodnota = array[0]
    prvnihodnota

    let object = { jmeno: 'Patrik', vek: 10, zije: true, konicky: ['programovani', 'hrani her'], 'ma se dobre': true, '😄': '🤣' }

    //"Patrik ma vek 10, zije a jeho konicky jsou: programovani, hrani her"

    let jmeno = object['jmeno'] // object.jmeno

    jmeno

    let nic = null
    let nedefinovany = undefined

    //////

    let auto = 'Audi'

    let auta = { [auto]: true }

    auta

    ///////
    //Ukázka toho že array je jen odkaz do poměti
    //////

    let a = 5
    let b = a

    b = 10

    a
    b

    let array1 = [1, 2, 3, 4]
    let array2 = array1

    array2

    array2.push(10)

    array2

    array1
}
/// Operátory

let a = 5
let b = 10
let c = a + b
c
c = a - b
c
c = a / b
c
c = a * b
c
c = 15 % 10
c

let pozdrav = 'Ahoj '
let jmeno = 'Patriku'

let cele = pozdrav + jmeno
cele

let cislo1 = '5'
let cislo2 = 10
let vysledek = cislo1 + cislo2
vysledek

let cislo3 = '10'
let cislo4 = 5
let vysledek2 = cislo3 - cislo4
vysledek2

//Porovnávací operátory
let result = '10' === '10'
result

result = 10 !== '10'
result

result = 10 >= 10 // < > <= >=
result

let cislo = 0

result = false == cislo
result

//Logické operátory
let vek = 18
let mamObcanku = true

result = vek >= 18 && mamObcanku
result

let udelalJsemUkoly = false
let pomohlJsemMamceSUklizenim = false

result = udelalJsemUkoly || pomohlJsemMamceSUklizenim
result

let cisloOdUzivatele = null

let uzivatelZadalCislo = !cisloOdUzivatele
uzivatelZadalCislo

//Pravdivostní hodnoty: cisla != 0, stringy != "", true
//Nepravdivostní hodnoty: 0, "", false, undefined, null

///Podminky

//IF

vek = 100

let typOsobyNazakladeVeku //"dospely", "teenager", "dite"

if (vek >= 18) {
    typOsobyNazakladeVeku = 'dospely'
} else if (vek >= 15) {
    typOsobyNazakladeVeku = 'teenager'
} else {
    typOsobyNazakladeVeku = 'dite'
}

typOsobyNazakladeVeku

let superCislo = 14

if (superCislo > 10) {
    superCislo
} else if (superCislo > 5) {
    superCislo
} else {
    superCislo
}

//switch

let coolCislo = 30 //1-5

if (coolCislo == 1 && coolCislo == 2 && coolCislo == 3) {
    //nec 1,2,3
} else if (coolCislo == 4) {
    //dalsi 4
} else {
    //5
}

switch (coolCislo) {
    case 1:
        console.log('coolCislo je 1')
    case 2:
        console.log('coolCislo je 2')
    case 3:
        console.log('coolCislo je 3')
        break
    case 4:
        console.log('coolCislo je 4')
        break
    case 5:
        console.log('coolCislo je 5')
        break
    default:
        console.log('neco jineho')
}

// ternární operátor

vek = 17

let text = vek >= 18 ? 'Jsi plnolety' : 'Zde nemáš přístup'

text

//cykly

const superArray = [1, 'Pepa', 3, 4, 5, true, 7, 8, false]

console.log(superArray.length)

for (let i = 0; i < 10; i++) {
    console.log(i)
    ///
}

for (let item of superArray) {
    console.log(item)
}

for (let index in superArray) {
    console.log(superArray[index])
}

//
let i = 0
while (i < 10) {
    console.log(i)

    i++
}

let x = 100

while (x < 10) {
    console.log(x)

    x++
}

do {
    console.log(x)

    x++
} while (x < 10)
