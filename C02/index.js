//normální funkce
function napisAhoj() {
    console.log('Ahoj')
}

//volání funkce, pomocí jména()
napisAhoj()
napisAhoj()
napisAhoj()
napisAhoj()
napisAhoj()
napisAhoj()
napisAhoj()
napisAhoj()

//parameter funkce
function pozdravJmeno(jmeno) {
    console.log('Ahoj ' + jmeno)
}

//volání funkce, pomocí jména(parametr1, parametr2, ...)
pozdravJmeno('Petr')
pozdravJmeno('Jana')
pozdravJmeno('Karel')
pozdravJmeno('Marie')

//funkce s návratovou hodnotou
function secti(a, b) {
    return a + b
}

//volání funkce, pomocí jména(parametr1, parametr2, ...)
//výsledek funkce se uloží do proměnné, případně zahodí, pokud není použit
let vysledek = secti(1, 2)
console.log(vysledek)

console.log(secti(1, 2))

console.log(secti(secti(1, 2), 3))

//zahozeni
secti(69, 444)

function odectiAVratPouzeKladneCislo(a, b) {
    if (a > b) {
        return a - b
    } else {
        return b - a
    }
}

console.log(odectiAVratPouzeKladneCislo(5, 10))

function deleni(delenec, delitel) {
    if (delitel == 0) {
        return 'Chyba'
    }

    if (delenec <= 0) {
        return 'Chyba 2'
    }

    return delenec / delitel
}
//
//
//
//
//
//
//
//
//
//
//
let text = 'Ahoj honzo, jak se máš?'
console.log(text[0])
console.log(text.charAt(0))
//
let delka = text.length
console.log(delka)
console.log(text.replace('ho', 'ne'))
console.log(text.replaceAll('ho', 'ne'))
console.log(text.toLowerCase())
console.log(text.toUpperCase())
console.log(text.trim())
console.log(text.trimStart())
console.log(text.trimEnd())
console.log(text.split(' '))
console.log(text.split(' ', 2))
console.log(text.substring(3))
console.log(text.substring(10, 11))
console.log(text.slice(10, 11))
console.log(text.substring(-1, 0))
console.log(text.substring(text.length - 3))
console.log(text.slice(3))
let nazevSouboru = 'obrazek.exe'

console.log(text.startsWith('Ahoj'))
console.log(nazevSouboru.endsWith('png'))
//

const pole = [1, 2, 3, 4, 5, 6]
console.log(pole.length)
console.log(pole.push(7))
console.log(pole)
console.log(pole.pop())
console.log(pole)
console.log(pole.shift())
console.log(pole)
console.log(pole.unshift(5))
console.log(pole)
console.log(pole.slice(3, 1))
console.log(pole)
console.log(pole.toSpliced(3, 1))
console.log(pole)

let jmena = [2, 'Robin', 'Honza', 'Viki']

console.log(jmena.join(', ').split(', '))
