## CV3

### Úvod

window - globální proměnná v prohlížeči, která obsahuje praikticky všechny globální proměnné
tedy třeba console, samo sebe, nebo třeba crypto

window.window.window.window.console.log("ahoj") funguje, vypíše se v prohlížeči, ale Console Ninja to ignoruje

-   window.outerWidth - šířka okna prohlížeče včetně otevřených sidebarů atd.. // outerHeight
-   window.innerWidth - šířka pouze dané webové stránky // innerHeight
-   window.document - objekt, který reprezentuje celou stránku
-   window.alert - funkce, která zobrazí alert ( zamrazí celé okno, dokud uživatel nezavře alert)
-   window.prompt - funkce, která zobrazí prompt ( zamrazí celé okno, dokud uživatel nezavře prompt )

-   document.getElementById(id) - vrátí element s daným id
-   document.getElementsByClassName(className) - vrátí pole elementů s daným class
-   document.querySelector(selector) - vrátí první element, který odpovídá danému CSS selectoru
-   document.querySelectorAll(selector) - vrátí pole elementů, které odpovídají danému CSS selectoru

### form elementy

-   input - <input id="mojeSuperId" type="text" name="superNazev" value="Vychozí hodnota" />
-   button - <button type="button">Tlačítko</button>
-   textarea - <textarea name="superNazev" id="mojeSuperId">Vychozí hodnota</textarea>
-   select - <select name="superNazev" id="mojeSuperId"><option value="1">První</option><option value="2">Druhý</option></select>

#### Example kód se správným typem

```JS
/**
 * @type HTMLButtonElement | undefined
 */
const button = document.querySelector('#leftBracket')

button.addEventListener('click', (e) => {
    console.log(e)
})
```

## CV2

Funkce - posloupnost příkazů, které si můžu uložit pod nějakým aliasem a poté ho volat kdekoliv v kódu
Lze do funkce posílat parametry, případně z ní vracet nějakou hodnotu.

funkce nad stringy:

-   string[n] - vrátí n-tý znak stringu
-   string.charAt(n) - vrátí n-tý znak stringu
-   string.length - vrátí délku stringu
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

funkce nad poli:

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
