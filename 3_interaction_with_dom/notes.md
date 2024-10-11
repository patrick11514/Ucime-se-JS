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
-   window.history - historie prohlížeče // .forward() .backward() // TODO: do research
-   milion dalších featur (navigator, localstorage, ...)

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

### Moderní:

-   Dovoluje regustrovat více listenerů na jeden event
-   Odebírat je a přidávat
-   element.addEventListener(event, callback, options)
-   např.: element.addEventListener("click", console.log);
-   options: {once: true} - listener se odstraní po prvním spuštění
-   element.removeEventListener(event, callback) //odstraňuje podle callbacku, tedy nemůžu odstranit anonymní funkci
