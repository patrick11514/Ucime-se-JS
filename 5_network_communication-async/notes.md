## XMLHttpRequest

-   Zastaralý způsob
-   Přes callbacky

```JS
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "filename", true);
xhttp.send();
```

## Fetch

-   Nový způsob, hezčí na používání
-   Nativní support Promisů (async/await)

-   Ukázka přes then/catch

```JS
fetch("url")
    .then((res) => res.text())
    .then((json) => console.log(json))
    .catch((err) => console.error(err))
```

-   Ukázka přes await

```JS
const res = await fetch("url")
const json = await res.json();
console.log(json)
```

-   fetch i res.json můžou vyhodit vyjímku

## Promise

-   Objekt, který nám zastřešuje hodnotu, kterou získáme někdy v budoucnu (příslib)
-   Konstruktor bere funkci, která dostane až dva parametry, resolve a reject
-   resolve, funkce, kterou když zavoláme, tak se promise vyhodnotí (then)
-   reject, funkce, kterou když zavoláme, tak se promise vyhodnotí jako neúspěšný (catch)

```JS
const promise = new Promise((resolve, reject) => {
    console.log("Promise vytvořen");
    setTimeout(resolve, 5 * 1000);
})

promise.then(() => console.log("Toto se ukáže za 5s")).catch(() => console.log("Toto se ukáže při chybě"));
```

```JS
const promise = new Promise((resolve, reject) => {
    console.log("Promise vytvořen");
    setTimeout(reject, 5 * 1000);
})

promise.then(() => console.log("Toto se ukáže za 5s")).catch(() => console.log("Toto se ukáže při chybě"));
```

### Zpromisení XMLHttpRequestu

```JS
function getData(url) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
                resolve(xhttp.responseText);
            }
        };
        xhttp.ontimeout = function() {
            reject();
        }

        xhttp.open("GET", url, true);
        xhttp.send();
    })
}

getData("url").then((text) => console.log(text)).catch((err) => console.error(err))
```

## Async/await

-   Hezčí řešení promisů, než .then() a .catch()
-   async funkce

    -   Automaticky returne Promise a zavolá resolve při našem returnu:

    ```JS
    function resolvePromiseWithNumber(n) {
        return new Promise((resolve) => resolve(n))
    }

    resolvePromiseWithNumber(5).then(console.log);

    async function resolvePromiseWithNumber2(n) {
        return n
    }

    resolvePromiseWithNumber2(5).then(console.log)
    ```

-   await

    -   lze používat pouze v async funkcích
    -   pozastaví kód, dokuď se promise nevykoná
    -   nepozastaví kompletní kód, během toho můžeme dělat něco jiného (u network requestu, přečtení z klávesnice etc..)

    ```JS
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function returnAfterXS(n, s) {
        await sleep(s)
        return n
    }

    returnAfterXS(5, 2 * 1000).then(console.log)
    ```

    -   Await se dá přepsat eklvivalentně na:

    ```JS
    async function foo() {
        await 1;
    }

    function foo1() {
        return Promise.resolve(1).then(() => undefined);
    }
    ```

    -   tedy náš předchozí příklad:

    ```JS
    function returnAfterXS(n, s) {
        return sleep(s).then(() => n);
    }
    ```

## Promise a heavy CPU kód

-   Co se stane tady? bude probíhat funkce computation společně s for loopem mimo?

```JS
await sleep(10 * 1000)

console.log('Computation started')

async function computation() {
    let sum = 0
    for (let i = 0; i < Math.pow(2, 33); ++i) {
        sum += i
    }
    return sum
}

computation().then(console.log)

for (let i = 0; i < Math.pow(2, 5); ++i) console.log(i)

console.log('Main done')
```

-   Jak vidíme, tak ne, to je protože v podstatě ostatní promisy/kód se vykonává, když aktuální kód nemá co dělat, tím že funkce computation zatíží CPU (tedy jedno jádro, kde běží JS) na max, tak zbytek kódu se vykonávat nemůže, proto je dobré používat Promise pouze na věci, co nezatěžují CPU (komunikace po síti, vstup od uživatele - Node, ...)

## Zpátky k promisování věcí

-   V blízké minulosti jsme si zpromisovali XMLHttpRequest, ten nyní můžeme využít hezčeji:

    ```JS
    const data = await getData("url");
    console.log(data)
    ```

-   Pozor, jak jsem již říkal, tak .catch se poté převede na reálný throw, tedy musíme await kód obalit try/catch

## Metody na objektu Promise

-   Již jsme se v ukázkách setkali s: Promise.resolve(hodnota), to vrátí již resolvnutý promise s návratovou hodnotou
-   Nečekaně je i Promise.reject(err)
-   Promise.all(Promise[]) dostatne array promisů a všechny spustí najednou a čeká až všechny úspěšně doběhnou

```JS
async function slowFetch(ret = false) {
    const urls = Array.from({length: 5}).map((_, i) => `http://localhost:5555/name/Karel-${i + 1}`)

    const start = Date.now()

    for (const url of urls) {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text)
    }

    if (ret) return Date.now() - start;
    else console.log(`Trvalo to Slower: ${Date.now() - start}ms`);
}

async function fasterFetch(ret = false) {
    const urls = Array.from({length: 5}).map((_, i) => `http://localhost:5555/name/Karel-${i + 1}`)

    const promises = urls.map(async (url) => {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text)
    })

    const start = Date.now()

    await Promise.all(promises)

    if (ret) return Date.now() - start;
    else console.log(`Trvalo to Faster: ${Date.now() - start}ms`);
}
```

-   Hodí se hlavně při získání dat z více endpointů, protože pošle requesty na jednou a pak jen čeká, až dojdou.
-   Nevýhoda: Pokud jediný failne, tak failne všechno:

```JS
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.reject(3)])
    .then(console.log)
    .catch(console.error)
```

-   Řešení Promise.allSettled(promise[]) - Vrátí Array objektů
    -   Každý objekt vypadá takto:
    -   Úspěšný Promise:
    ```JS
    {
        status: "fullfilled",
        value: 99
    }
    ```
    -   Neúspěšný promise
    ```JS
    {
        status: "rejected",
        reason: "Idk"
    }
    ```
-   Promise.any(promise[]) - Vrátí první promise, který se fullfilne, jinak pokud všechny rejectnou, vrátí reject listem všech rejectionů
-   Promise.race(promise[]) - Vrátí stav prvního promisu, když první (nejrychlejší) se resolve, tak se celý race resolvne, jinak se rejectne
-   Promise.withResolvers() vrátí object:

```JS
{
    promise: Promise<any>,
    resolve: Promise<any>.resolve,
    reject: Promise<any>.reject
}
```

-   Jedná se o ekvivalen new Promise s tím, že resolve a reject dostaneme mimo funkci v konstruktoru

## Zpátky k fetch

-   Je super, že můžeme ze serveru získat data, ale bylo by super je tam umět i poslat
-   Query Params

    -   Jedná se o posílání dat v URL za ?
    -   tedy například http://localhost:5555/query?key=value&jmeno=Patrik
    -   posílá se typicky přes metodu GET
    -   v JS máme přímo URLSearchParams, kterýma dokážu sestavit string s klíč a hodnot

    ```JS
    const params = new URLSearchParams()
    params.append("key", "value")
    params.append("jmeno", "Patrik")
    console.log(params.toString()); // key=value&jmeno=Patrik // Otazník si musíme do URL přidat sami
    ```

    -   Použití ve fetch:

    ```JS
    const response = await fetch(`https://localhost:5555/query?${params.toString()}`)
    const json = await response.json();
    console.log(json)
    ```

    -   Nevýhody: kdokoliv může vidět URL, na kterou jdeme, tedy není dobré zde posílat citlivé údaje
    -   Dokonce jsem viděl pizzerku, která právě login údaje posílala takhle v QueryParams :D

-   Post

    -   HTTP metoda POST dovoluje posílat data
    -   Data mohou být textová (json, FormData), případně binární (taky FormData)
    -   u HTTPS je zašifrováno společně s požadavkem, narozdíl od URL
    -   Použití ve fetch:
    -   FormData (stejný pattern jako u QueryParams, ale bez ?):

    ```JS
    const response = await fetch("http://localhost:5555/post", { ///options
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    })
    const json = await response.json();
    console.log(json);
    ```

    -   Json:

    ```JS
    const response = await fetch("http://localhost:5555/post", { ///options
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            key: "value",
            jmeno: "Patrik"
        })
    })
    const json = await response.json();
    console.log(json);
    ```

    -   FormData:

    ```JS
    const formData = new FormData()
    formData.append("key", "value")
    formData.append("jmeno", "Patrik")

    const response = await fetch("http://localhost:5555/post", { ///options
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    })
    const json = await response.json();
    console.log(json);
    ```

# Websocket

-   Na webových stránkách nemáme jak navázat komunikaci přímo na se serverem (TCP)
-   Proto vznikl Websocket, který je postavený na HTTP
-   Při pokusu o navázání, dojde k 101 Switching Protocols a připojení se Upgraduje
-   Nyní je připojení se serverem navázané a může probíhat komunikace oběma směry
-   Komunikace může probíhat jak binárně, tak i textově
-   Api podobně zastaralé na principech nastavení metod pro .onmessage = () => {} atd..

```JS
const ws = new WebSocket('ws://localhost:5556')

ws.onmessage = (ev) => {
    console.log(ev.data)
}

ws.onopen = () => {
    console.log('Connected to websocket')
}

ws.onclose = () => {
    console.log('Connection closed')
}
```

## Zadání DU

# Úkol 5 - Network Communication

## 1. Fetch

### Užitečné odkazy:

-   [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
-   [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
-   [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
-   [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa)

Vytvořte jednoduchou web stránku, kde budou 3 inputy, 3 tlačítka a 1 textarea. Ukázka zde:

```HTML
<input id="name" type="text" placeholder="Enter your name">
<button id="getHash">Get Hash</button>
<input id="hash" readonly="" type="text" placeholder="Here will be hash from server">
<button id="calculate">Calculate code</button>
<input id="code" readonly="" type="text" placeholder="Here will appear out calculated code">
<button id="check">Check with server</button>
<textarea id="result"</textarea>
```

Jak bude tato stránka fungovat:
Nachystal jsem pro vás API na odkazu https://learn.patrick115.eu/api. Tato API má dva endpointy, které budete používat. Oba tyto endpointy supportí, jak JSON, tak FormData (v klasické podobně, tedy key=value&key=value...). API odpovědi jsou ve formátu JSON a jsou následující:
Pokud vše proběhné správně:

```JSON
{
    "status": true,
    "data": 123 //nějaké data, nemusí být vyplněno
}
```

Pokud se něco nepovede:

```JSON
{
    "status": false,
    "message": "Error message" //Ta tady bude vždy, můžete jí vypisovat třeba přes alert/console.error/někam do stránky
}
```

1. Endpoint, který vás bude zajímat je https://learn.patrick115.eu/api/getHash
   Tento endpoint očekává name: string a code: string. Name dostanete z inputu na stránce (viz HTML nahoře input#name) po kliknutí na první tlačítko (viz HTML button#getHash) za ním se vygeneruje random string/číslo přes Math.random převedené na string a poté se pošle POST request na tuto API s name z inputu a code tím, který jsme si vygenerovali. Code si uložte někam globálně, budete ho potom potřebovat.
   Pokud API vše uděláte dobře, dostanete:
    ```JSON
    {
        "success": true,
        "data": "xyzgdfgdfgdfg181gsdgsgdsdg"
    }
    ```
    Tento kód, co jste dostali, si uložte do dalšího inputu (viz HTML nahoře input#hash)
2. Po kliknutí na druhé tlačítko (viz HTML nahoře button#calculate) vypočítejte kód, který pošlete v 3. kroku na server.
   Tento kód se skládá z name, code (který je naopak/pozadu/reversnutý), kód co jsme dostali v předchozím requestu.
   Tyto proměnné spojíte do jednoho stringu a mezi každou proměnnou dáte ':', tedy name:reversedCode:hash
   Nyní si tento string převedete do base64 pomocí [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa)
   Tento string si následně uložíte do dalšího inputu (viz HTML nahoře input#code)
3. Nyní po kliknutí na třetí tlačítko (viz HTML button#check) pošlete na další endpoint https://learn.patrick115.eu/api/checkHash požadavek, který očekává name: string a hash: string Name použijeme opět to co je v inputu a hash, který jsme vypočítali v kroku 2. Poté výsledek z API hodíme na string a vložíme do textarea (viz HTML textare#result). Pokud vše teda fungovalo správně, měli bychom dostat:
    ```JSON
    {
        "success": true,
    }
    ```

## 2. Jednoduchý "chat"

### Užitečné odkazy:

-   [Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

Dalším úkolem je naimplementovat jednoduchý "chat", který se bude chovat jako ozvěna. Na stránce (klidně té stejné, kde jste dělali úkol 1 přidejte input, do kterého budeme psát a tlačítko odeslat. Poté se připojíme na websocket wss://learn.patrick115/ws ten nám na začátku pošle néjaké základní info.
Info:

-   Jedná se o echo (ozvěna) server, tedy co do něho pošleme, to dostaneme od serveru zpět
-   Pro odpojení serveru stačí napsat /end

Na stránku přidejte div/textarea, do které budete vypisovat celou komunikaci.
Při připojení ws.onopen / ws.addEventListener("open", ...) vypište do divu/textarea info o tom, že jsme se připojili.
\*\*Před každou zprávu dejte aktuální timestamp: Date.now() třeba do závorek: [176151561561] Connected to server
Nyní udělejte to, že po kliknutí na tlačítko se zpráva/slovo z inputu odešle na websocket server a my přečteme zprávu z něco: ws.onmessage/ws.addEventListener("message", ...) a tu vypíšeme opět s timestamp do divu/textarea.
Pro ukončení stačí napsat /end a opět do divu/textarea vypíšeme že jsme se odpojili, opět s timestamp: [1748518561] Connection to server lost/Disconnected from server
