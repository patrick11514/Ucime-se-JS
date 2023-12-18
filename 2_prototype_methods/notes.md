## Funkce

-   funkce je nějaký způsob pojmenování nějaké části kódu, kterou chceme použít vícekrát
-   funkce může mít parametry, které jí předáme při jejím volání
-   funkce může vracet nějakou hodnotu
-   funkce může být anonymní (lambda)
-   funkce může být rekurzivní (u mě max 18389 volání)

![Vypočet obsahu čtverce](https://upload.patrick115.eu/screenshot/ksnip_tmp_ZgxQTt.png)

## Úkol 1

Vymyslet funkci na výpočet obsahu obdelníku.

```JS
function obsahObdelnika(a, b) {
    return a * b;
}

const obsahObdelnika2 = (a, b) => {
    return a * b;
}
```

```TS
function obsahObdelnika(a: number, b: number): number {
    return a * b;
}

const obsahObdelnika2 = (a: number, b: number): number => {
    return a * b;
}
```

## funkce nad stringy:

-   string.length - vrátí délku stringu
-   string[n] - vrátí n-tý znak stringu
-   string.charAt(n) - vrátí n-tý znak stringu
-   string.replace(needle, replacer) - nahradí všechny výskyty `needle` za `replacer`
-   string.replaceAll(needle, replacer) - nahradí všechny výskyty `needle` za `replacer`
-   string.toLowerCase() - převede všechny znaky na malá písmena
-   string.toUpperCase() - převede všechny znaky na velká písmena
-   string.trim() - odstraní všechny bílé znaky na začátku a na konci stringu
-   string.trimStart() // .trimLeft() - odstraní všechny bílé znaky na začátku stringu
-   string.trimEnd() // .trimRight() - odstraní všechny bílé znaky na konci stringu
-   string.split(separator) - rozdělí string na pole podle `separator`
-   string.split(separator, limit) - rozdělí string na pole podle `separator` a omezí počet prvků na `limit`
-   string.substring(start) - vrátí podřetězec od `start` do konce stringu (včetně startu)
-   string.substring(start, end) - vrátí podřetězec od `start` do `end` ( včetně startu, bez endu)
-   string.substr(start) - vrátí podřetězec od `start` do konce stringu (včetně startu) - DEPRECATED
-   string.substr(start, length) - vrátí podřetězec od `start` o délce `length` (včetně startu, včetně endu - length) - DEPRECATED
-   string.slice(start) - vrátí podřetězec od `start` do konce stringu (včetně startu)
-   string.slice(start, end) - vrátí podřetězec od `start` do `end` (včetně startu, bez endu)
-   string.startsWith(needle) - vrátí true, pokud string začíná na `needle`
-   string.endsWith(needle) - vrátí true, pokud string končí na `needle`

## funkce nad poli:

-   array.length - vrátí délku pole
-   array.push(item) - přidá `item` na konec pole
-   array.pop() - odstraní poslední prvek z pole a vrátí ho
-   array.shift() - odstraní první prvek z pole a vrátí ho
-   array.unshift(item) - přidá `item` na začátek pole
-   array.slice(start) - vrátí podpole od `start` do konce pole (včetně startu)
-   array.slice(start, end) - vrátí podpole od `start` do `end` (včetně startu, bez endu)
-   array.splice(start) - odstraní prvek od `start` do konce pole (včetně startu) - modifikuje původní pole
-   array.splice(start, deleteCount) - odstraní `deleteCount` prvků od `start` do konce pole (včetně startu) - modifikuje původní pole
-   array.splice(start, deleteCount, item) - odstraní `deleteCount` prvků od `start` do konce pole (včetně startu) a přidá `item` na jejich místo
-   array.splice(start, deleteCount, item[]) - odstraní `deleteCount` prvků od `start` do konce pole (včetně startu) a přidá `item[]` na jejich místo
-   array.splice(start, deleteCount, item1, item2, ...) - odstraní `deleteCount` prvků od `start` do konce pole (včetně startu) a přidá `item1`, `item2`, ... na jejich místo
-   array.toSpliced(start) - odstraní prvek od `start` do konce pole (včetně startu) - nemodefikuje původní pole
-   array.toSpliced(start, deleteCount) - odstraní `deleteCount` prvků od `start` do konce pole (včetně startu) - nemodifikuje původní pole
-   array.reverse() - obrátí pořadí prvků v poli - modifikuje původní pole
-   array.toReversed() - obrátí pořadí prvků v poli - nemodifikuje původní pole
-   array.flat() - zploští pole o jednu úroveň (nemodifikuje původní pole)
-   array.find(callback) - vrátí první prvek, pro který callback vrátí true
-   array.findIndex(callback) - vrátí index prvního prvku, pro který callback vrátí true
-   array.filter(callback) - vrátí pole prvků, pro které callback vrátí true
-   array.map(callback) - vrátí pole prvků, které vzniknou zavoláním callback na každém prvku
-   array.includes(item) - vrátí true, pokud pole obsahuje `item`
-   array.join(separator) - vrátí string, který vznikne spojením všech prvků pole pomocí `separator`

## Úkol 2

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

Výsledek:

```JS
let čtverce = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const vypocet = (a) => {
    return a * a
}

čtverce = čtverce.map(vypocet);

const soucet = čtverce.reduce((a, b) => {
    return a + b;
});

console.log(`Obsah čtverců čísel ${čtverce.join(', ')} je ${soucet}.`);
```

## Úkol 3 (na doma XD)

Máme následující text:

```
Hra1: 1:0
Hra2: 0:1
Hra3: 1:1
Hra4: 1:0
Hra5: 0:1
Hra6: 1:1
Hra7: 1:0
Hra8: 1:0
```

1. Text si uložte do proměnné, pomocí `` uvozovek, aby byly zachovány odřádkování.
2. Text si rozdělte na řádky (řádek = \n)
3. Každý řádek si rozdělte pomocí `:` na název hry a skóre
4. Pro každou hru vždy vypište do konzole: "Hra číslo X skončila výhrou týmu Y nad týmem Z."
5. Vypočítejte výsledky pro Team1 a Team2 a ty vypište do konzole. (Formát: Team1: 6, Team2: 4)

Poznámky:

-   Výhra = 1 bod pro daný tým
-   Remíza = 1 bod pro oba týmy
-   Prohra = 0 bodů pro daný tým

-   Pokud v kroku 4 nastane remíza, tak vypište: "Hra číslo X skončila remízou."

Ukázkový výstup:

```
Hra číslo 1 skončila výhrou týmu 1 nad týmem 2.
Hra číslo 2 skončila výhrou týmu 2 nad týmem 1.
Hra číslo 3 skončila remízou.
Hra číslo 4 skončila výhrou týmu 1 nad týmem 2.
Hra číslo 5 skončila výhrou týmu 2 nad týmem 1.
Hra číslo 6 skončila remízou.
Hra číslo 7 skončila výhrou týmu 1 nad týmem 2.
Hra číslo 8 skončila výhrou týmu 1 nad týmem 2.
Team1: 6, Team2: 4
```
