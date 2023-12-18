/*function recursion(index) {
    console.log(index)
    if (index > 0) {
        recursion(index - 1) //too much recursion
    }
}

recursion(18389 /*18388*/ //)*/

//zápis funkce
function jmeno(parametr1, parametr2) {
    //tělo funkce
    return //data
}
//arrow funkce
const jmeno2 = (parametr1, parametr2) => {
    //tělo funkce
    return //data
}

//Například chceme vypočítat obsah trojíuhelníku
//normálně
//
let c = 10
let vc = 5
let vysledek = (c * vc) / 2

console.log(vysledek)

//pro každá dvě čísla pořád musíme volat vzoreček
c = 20
vc = 10
vysledek = (c * vc) / 2

console.log(vysledek)
//atd opakujeme kod

//pomocí funkce, kód zkopírujeme a c a vc dáme jako parametr

function obsahTrojiuhelniku(c, vc) {
    let vysledek = (c * vc) / 2
    //podle konzole s Console Ninja, tady vidíme, že reálně kód skočí tady
    console.log(vysledek)
}

//nyní můžeme funkci zavolat
obsahTrojiuhelniku(10, 5)
obsahTrojiuhelniku(20, 10)

//lepší funkce, s return

function obsahTrojiuhelniku2(c, vc) {
    let vysledek = (c * vc) / 2
    return vysledek
    //return (c * vc) / 2
}

//nyní se nic nestane, protože musíme výsledek někam uložit
obsahTrojiuhelniku2(10, 5)

let novyVysledek = obsahTrojiuhelniku2(10, 5)
//vypis
console.log(novyVysledek)
//zkraceny
console.log(obsahTrojiuhelniku2(20, 10))

//co se stane, když vypíšeme výstup funkce obsahTojiuhelniku(10,5)?
console.log(obsahTrojiuhelniku(10, 5))
//proč? Protože když máme v kódu return, tak se nic nereturnuje, tedy funkce nám nevrátí nic, tedy undefined, například u Cčka by nám to spadlo na chybě, protože zde není instrukce, která předá výstup do Akumulátoru, tedy není poté co z daného registru číst a aní se neví z jakého

//metody nad stringy
//délka
console.log('ahoj'.length)
//znak na určité pozici
console.log('ahoj'[0])
console.log('ahoj'.charAt(0))
console.log('Ahoj Světe'.replace('Světe', 'Pepo'))
console.log('Ahoj Ahoj Světe'.replace('Ahoj', 'Čau'))
console.log('Ahoj Ahoj Světe'.replaceAll('Ahoj', 'Čau'))
console.log('Ahoj, jak se máš PETŘE?'.toLowerCase())
console.log('Ahoj, jak se máš PETŘE?'.toUpperCase())
console.log('      Prostě text, kde jsou mezery před a za     '.trim())
console.log('      Prostě text, kde jsou mezery před a za     '.trimStart())
console.log('      Prostě text, kde jsou mezery před a za     '.trimEnd())
console.log('Jahody, Mrkve, Řeřicha, Jogurt'.split(', '))
console.log('Jahody, Mrkve, Řeřicha, Jogurt'.split(', ', 2))
console.log('gasgAhoj, jak se máš?'.substring(4))
console.log('gasgAhoj, jak se máš?'.substring(4, 8))
console.log('gasgAhoj, jak se máš?'.substring(-5))
console.log('gasgAhoj, jak se máš?'.substr(-5))
console.log('gasgAhoj, jak se máš?'.substr(4, 8))
console.log('gasgAhoj, jak se máš?'.slice(4, 8))
console.log('gasgAhoj, jak se máš?'.slice(-5))
console.log('<!DOCTYPE HTML><html><body><p>Ahoj</p></body></html>'.startsWith('<!DOCTYPE HTML>'))
console.log('<html><body><p>Ahoj</p></body></html>'.startsWith('<!DOCTYPE HTML>'))
console.log('<!DOCTYPE HTML><html><body><p>Ahoj</p></body></html>'.endsWith('</html>'))

//metody nad polem
console.log([1, 2, 3].length)
//push
let pole1 = [1, 2, 3]
console.log(pole1)
console.log(pole1.push(4))
console.log(pole1)
//pop
let pole2 = [1, 2, 3]
console.log(pole2)
console.log(pole2.pop())
console.log(pole2)
//shift
let pole3 = [1, 2, 3]
console.log(pole3)
console.log(pole3.unshift(4))
console.log(pole3)
//slice
let pole4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole4)
console.log(pole4.slice(1))
console.log(pole4)
console.log(pole4.slice(1, 4))
console.log(pole4)
//splice
let pole5 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole5)
console.log(pole5.splice(1, 3))
console.log(pole5)
console.log(pole5.splice(1))
console.log(pole5)
console.log(pole5.splice(0, 1, 2, 3, 4))
console.log(pole5)
//problém je, že nám to odebírá z původního pole, proto je dobré si vytvořit kopii
//to spliced
let pole6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole6)
console.log(pole6.toSpliced(1, 3))
console.log(pole6)
console.log(pole6.toSpliced(1))
console.log(pole6)
console.log(pole6.toSpliced(0, 1, 2, 3, 4))
console.log(pole6)
//reverse
let pole7 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole7)
console.log(pole7.reverse())
console.log(pole7)
//opět nám to modifikuje původní pole, proto je dobré si vytvořit kopii
//to reversed
let pole8 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole8)
console.log(pole8.toReversed())
console.log(pole8)
//flat
let pole9 = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]
console.log(pole9)
console.log(pole9.flat())
console.log(pole9)
console.log(pole9.flat(2))
console.log(pole9)
//find
let pole10 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole10)
console.log(pole10.find((item) => item > 5))
console.log(pole10)
//findIndex
let pole11 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole11)
console.log(pole11.findIndex((item) => item > 5))
console.log(pole11)
//filter
let pole12 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole12)
console.log(pole12.filter((item) => item > 5))
console.log(pole12)
//map
let pole13 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole13)
console.log(pole13.map((item) => item * 2))
console.log(pole13)
//includes
let pole14 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole14)
console.log(pole14.includes(5))
console.log(pole14)
console.log(pole14.includes(10))
console.log(pole14)
//join
let pole15 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole15)
console.log(pole15.join(', '))
console.log(pole15)
//concat
let pole16 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let pole17 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
console.log(pole16)
console.log(pole17)
console.log(pole16.concat(pole17))
console.log(pole16)
console.log(pole17)
//some
let pole18 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole18)
console.log(pole18.some((item) => item > 5))
console.log(pole18)
//every
let pole19 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole19)
console.log(pole19.every((item) => item > 5))
console.log(pole19)
//reduce
let pole20 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole20)
console.log(pole20.reduce((akumulator, item) => akumulator + item))
console.log(pole20)
//reduceRight
let pole21 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(pole21)
console.log(pole21.reduceRight((akumulator, item) => akumulator + item))
console.log(pole21)
