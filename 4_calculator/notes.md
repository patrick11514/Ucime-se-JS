# Opakování ???

# Mapování pomocí Objectu

-   Ukázka máme nákupní seznam a chceme vypočítat cenu

```JS
//Normální přístup přes if
const list = ["jahody", "brambory", "banány", "jablka"]

let price = 0
for (const item of list) {
    if (item === "jahody") {
        price += 50
    } else if (item === "brambory") {
        price += 30
    } else if (item === "banány") {
        price += 20
    } else if (item === "jablka") {
        price += 10
    }
}

console.log(price)
```

```JS
//Normální přístup přes switch
const list = ["jahody", "brambory", "banány", "jablka"]

let price = 0
for (const item of list) {
    switch(item) {
        case "jahody":
            price += 50
            break
        case "brambory":
            price += 30
            break
        case "banány":
            price += 20
            break
        case "jablka":
            price += 10
            break
    }
}

console.log(price)
```

```JS
//Mapování přes object
const list = ["jahody", "brambory", "banány", "jablka"]

const prices = {
    "jahody": 50,
    "brambory": 30,
    "banány": 20,
    "jablka": 10
}

let price = 0
for (const item of list) {
    const currentPrice = prices[item]
    if (currentPrice) {
        price += currentPrice
    }

    //kratší zápis
    //price += prices[item] || 0
}

console.log(price)
```

# Další object metody

-   Object.keys() - vrací pole klíčů
-   Object.values() - vrací pole hodnot
-   Object.entries() - vrací pole polí [klíč, hodnota]

```JS
const object = {
    a: 1,
    b: 2,
    c: 3
}

console.log(Object.keys(object)) // ["a", "b", "c"]
console.log(Object.values(object)) // [1, 2, 3]
console.log(Object.entries(object)) // [["a", 1], ["b", 2], ["c", 3]]
```

# Handlování chyb, pokud vyloženě nechceme kód zastavit a reagovat na to

-   try - blok kódu, kde může chyba nastat a chceme jí odchytit
-   catch - blok kódu, který se provede, pokud chyba nastane
-   finally - blok kódu, který se provede vždy

```JS
//normální kód
try {
    //kód...
    //tady může nastat chyba
    //kód... který se nevykoná, pokud nastane chyba
} catch (error) {
    //kód, který se provede, pokud nastane chyba
} finally {
    //kód, který se provede vždy
}
```

### Funkce které mohou selhat:

-   JSON.parse()
-   JSON.stringify()
-   fetch()
-   setTimeout()
-   setInterval()

```JS
//Validní
try {
    const json = '{"name": "John", "age": 30}'
    const user = JSON.parse(json)
    console.log(user)
} catch (error) {
    console.log(error)
} finally {
    console.log("Konec")
}
```

```JS
//Validní
try {
    const json = '{"name": "John",- "age": 30}'
    const user = JSON.parse(json)
    console.log(user)
} catch (error) {
    console.log(error)
} finally {
    console.log("Konec")
}
```
