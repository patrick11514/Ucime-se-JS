## Opakovaní

-   Délka stringu

```JS
const string = 'Ahoj';
console.log(string.length); // 4
```

-   Získání n-tého znaku

```JS
const string = 'Ahoj';
console.log(string[1]); // h
```

-   Všechny znaky na uppercase, ale přes map

```JS
const string = "Ahoj kamaráde."
console.log(string.split("").map((c) => c.toUpperCase()).join("")) // AHOJ KAMARÁDE.
```

-   Máme text "Ahoj kamarádi"
-   Reverzni tento text
-   Pomocí reverse

```JS
const string = "Ahoj kamarádi";
console.log(string.split("").reverse().join("")); // idáramak johA
```

-   Pomocí for cyklu

```JS
let string = "Ahoj kamarádi";

const splited = string.split("")
for (let i = 0; i < splited.length / 2; i++) {
    const lastIndex = splited.length - i - 1;
    let temp = splited[i];
    splited[i] = splited[lastIndex];
    splited[lastIndex] = temp;
}

console.log(splited.join(""));
```

-   Pomocí reduce

```JS
const string = "Ahoj kamarádi";
console.log(string.split("").reduce((acc, c) => c + acc));
```

## DOM - Document Object Model

-   Jedná se o reprezentaci HTML stránky v prohlížeči
-   Je uložena v paměti a při prvním otevření stránky se vytvoří
-   Mohu ho modifikovat přes JS/DevTools (změny nejsou pernamentní, refresh změny zresetuje)

## Globální proménné

-   window - reprezentuje okno v prohlížeči
-   Jsou pod ním všechny globální proměnné (console, alert, prompt, ...)
-   Když voláme nějakou proměnnou/metodu, tak explicitně voláme window (window.console.log() == console.log())
-   Fun fact: window je taky pod window, tedy něco jako window.window.window.window.window.window.console.log() je validní

-   document - reprezentuje HTML stránku
-   Jsou pod ním všechny metody pro manipulaci s DOM (getElementById, querySelector, ...)
-   Dokáže modifikovat DOM a taky z něj číst

## Window

-   window.innerWidth a window.innerHeight - prerezeuntuje šířku a výšku okna (naší stránky v prohlížeči) - ukázat na devtoolsech, kterýma se dá měnit velikost okna // mobilní režim
-   window.location - reprezentuje URL adresu stránky

### window.location

-   hash - text za # v URL používá se pro navigaci na stránce
-   host - hostname a port
-   hostname - hostname
-   href - celá URL
-   origin - origin serveru - s protokolem a je to jakoby root URL
-   pathname - cesta za hostname
-   port - port
-   protocol - protokol
-   search - query string

-   Nastavením window.location proběhne přesměrování na novou stránku

## Window

-   window.fullscreen - zda je stránka v fullscreen módu
-   window.history - historie prohlížeče // .forward() .backward()
    -   window.history.back() - přesune se o stránku zpět
    -   window.history.forward() - přesune se o stránku vpřed
    -   window.history.go(index) - přesune se o index stránek
    -   Fun fact: window.history.go(0) / window.history.go() - refresh stránky
    -   window.history.length - délka historie
    -   window.history.pushState(state, title, url) - přidá nový stav do historie
    -   window.history.replaceState(state, title, url) - nahradí aktuální stav v historii
-   milion dalších featur (navigator, localstorage, sessionstorage, ...)

## Document

-   document.get**Element**ById() - Získá pouze jeden element podle jeho Id, očekává se, že Id je unikátní, proto vrací pouze jeden element
-   document.get**Elements**ByClassName() - Získá všechny elementy podle třídy, vrací HTMLCollection
-   Moderní: document.query**Selector**() - Vybere první element, který splňuje selektor (css selektor)
-   Moderní: document.query**SelectorAll**() - Vybere všechny elementy, které splňují selektor (css selektor)
-   document.documentElement - reprezentuje element `<html>`
-   document.head - reprezentuje element `<head>`
-   document.body - reprezentuje element `<body>`
-   document.title - reprezentuje title stránky a můžu ho tak dynamicky měnit

## Event system

### Po staru:

-   element.onclick = () => {}
-   element.onmouseover = () => {}
-   ....
-   případně přímo na html elementu: \<button onclick="funkce();">...\</button>

### Moderní:

-   Dovoluje regustrovat více listenerů na jeden event
-   Odebírat je a přidávat
-   element.addEventListener(event, callback, options)
-   např.: element.addEventListener("click", console.log);
-   options: {once: true} - listener se odstraní po prvním spuštění
-   element.removeEventListener(event, callback) //odstraňuje podle callbacku, tedy nemůžu odstranit anonymní funkci
-   https://chatgpt.com/share/67139655-88dc-8008-8803-f82e3e27cb79

-   Eventy běží nezávisle, my můžeme zaregistrovat event, ale může se klidně spustit zítra, nikdy, okamžitě atd...
-   Eventy stačí registrovat jednou, nemusíme tam nikde psát cykly atd...
-   Každý event předává jako první argument objekt s informacemi o eventu (taget, currentTaget, preventDefault, stopPropagation, ...)

## Vytváření nových elementů

-   document.createElement(tagName) - vytvoří nový element
-   element.appendChild(child) - přidá nový element jako potomka
-   element.removeChild(child) - odstraní element
-   element.remove() - odstraní element
-   element.innerHTML - obsahuje HTML obsah elementu
-   element.innerText - obsahuje textový obsah elementu
-   element.textContent - obsahuje textový obsah elementu
-   element.classList - obsahuje třídy elementu
-   element.classList.add(className) - přidá třídu
-   element.classList.remove(className) - odstraní třídu
-   element.classList.toggle(className) - přepne třídu
