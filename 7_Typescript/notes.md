## Instalace

1. k Typescriptu je potřeba NodeJS

    #### Co je to NodeJS?

    - Jedná se o serverovou verzi JavaScriptu, která běží na V8 (engine, který je v Chromiiu)
    - Nemusí běžet v prohlížeči a tím, že se očekává, že poběží na serveru, tak má například:
        - Přístup k souborům
        - Dokáže komunikovat přes TCP/UDP nativně
        - Dokáže číst vstup z terminálu
        - Dokáže spouštět podprocesy
        - a mnoho dalšího
    - Společně s NodeJS přichází i balíčkovací manažer npm (Node Package Manager)
    - Podobně, jako u pythonu - pip dovoluje instalovat balíčky a ty využívat
    - Balíčky mohou být buď napsány v JavaScriptu, nebo C/C++, takže je možné pomocí balíčku komunikovat i s USB zařízeníma atd..

    - Instalace z https://nodejs.org
    - Doporučuji používat Linux, ale lze i na Windows
    - Na linuxu doporučuji NVM (Node Version Manager), dokáže instalovat různé verze NodeJS a přepínat mezi nima

    ```BASH
    # instalace NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    # instalace nejnovější verze NodeJS v LTS (Long-Term-Support)
    nvm install --lts
    ```

2. vytvoření projektu s typescriptem

    - Od verze NodeJS V22.6.0 lze spouštět typescript soubory nativně (EXPERIMENTAL!!!)

    ```BASH
    node --experimental-strip-types file.ts
    ```

    - Pro typescript je potřeba balíček typescript, který typescript soubor ztranspiluje do javascript souboru
    - Prohlížeče a NodeJS v základu podporují pouze JavaScript, takže zde probíhá toto:
        1. spustím tsc na projektu
        2. tsc provede typechecking, tedy projede celý soubor a knihovny, zda všude jsou správné typy atd..
        3. pokud provádíme transpilaci, tak tsc smaže kompletně všechny typy z našeho souboru
        4. pokud targetujeme nějakou starší verzi EcmaScriptu, tak předělá kód, tak aby byl kompatibilní
        5. vypilvne finální JS soubor
    - Jednoduše si můžeme projekt vytvořit přes můj create-app package

    ```BASH
    npm create @patrick115/app@latest JMENO_PROJEKTU
    ```

3. spuštění watch módu
    - Watch mód sleduje typescript soubory a při úpravě souboru provede transpilaci a spušténí npm run dev
    - Build mód zkompiluje projekt a výsledné JS soubory hodí do složky build npm run build
    - Spuštění buildnutého projektu npm run start

## Typování

-   Typescipt podporuje hodně typů, mezi ty základní patří:
    -   number - číselný typ
    -   string - textový řetězec
    -   object - jakýkoliv object (s tím že v JS je snad všechno object, takže v podstatě vše :D)
    -   boolean
    -   null
    -   undefined
    -   void - používá se u funkcí a říká, že funkce nevrací nic (prázný/žádný return)
    -   unknown - později
    -   any - později
-   Typování proměnných

    -   Implicitně, když do proménné rovnou něco přiřadíme, tak se nastaví na daný typ
    -   Explicitně : za jménem proměnné:

    ```ts
    let a = 10; //type: number implicitně
    let b: number = 5; //explicitní typ a přiřazení hodnoty
    let c: number; //explicitní typ, ale pozor v základu je v proměnné UNDEFINED, tedy teď říkáme že bude c mít typ number, ale má v sobě undefined. Typescript na to ale umí upozornit
    ```

-   Jak teda typovat náš object, když object = všechno?

    -   Jako u objectu použijeme složené závorky a v tom vyčteme, jaké klíče bude mít object a jakých typů:

    ```ts
    let obj: {
        name: string; // na konci řádku s typem se dává středník!! ne čárka
        age: number;
    };

    obj = {
        name: 'Patrik',
        age: 22
    };

    obj.name = 10; // ERROR
    ```

-   Type uion:

    -   Označuje se | mezi typy
    -   Říká, že proměnná může nabývat více typy:

    ```TS
    let a: number | string;
    a = 10; //OK
    a = "text"; //OK
    a = true; //ERROR
    ```

    -   Union se hlavně hodí u objektů, kdy můžeme říct, že bude mít více stavů:

    ```TS
    let status: {
        status: true // pokud status je true
        data: string // tak bude object obsahovat data typu string
    } | {
        status: false, // pokud je ale status false
        message: string // tak bude object obsahovat message typu string
    }

    status = {
        status: true,
        data: "Data"
    }

    status = {
        status: false,
        message: "Error"
    }

    status = {
        status: true,
        message: "AAA" // ERROR
    }
    ```

    -   Na základě union objectů umí i reagovat typescript, tak že když použijeme například porovnání v ifu, tak nám poté řekne, co za typ bude v ifu:

    ```TS
    if (status.status === true) {
        //tady to vstoupí pouze, když fakt property status na objektu status bude true,tedy typescript hned ví, že na objektu bude očekávat property data
        console.log(status.data) // OK
        console.log(status.message) // ERROR
    } else {
        console.log(status.data) // ERROR
    }
    ```

-   Typování funkcí:

    -   Zde natypujeme funkci něco, která dostane tři argumenty:
    -   argument1 typu string
    -   argument2 typu number
    -   argument3 který je optional, takže když tam něco předáme musíme tam dát boolean, jinak tam je undefined

    ```TS
    //normální funkce
    function neco(argument1: string, argument2: number, argument3?: boolean): string {
        return argument1;
    }

    //arrow funkce
    const neco2 = (argument1: string, argument2: number, argument3?: boolean): string => {
        return argument1;
    }
    ```

-   Vlastní typy:

    -   Vlastní typ déláme tak, že začneme klíčovím slovíčkem type Jméno = definice typu
    -   Typicky typy píšeme prvním velkým písmenem, protože by nám to mohlo v kódu splynout:

    ```TS
    const prom: mytype = "neco"
    //vs
    const prom: MyType = "neco" //přestože máme syntax highlighting, tak je lepší ten typ Velkým
    ```

    -   Ukázka základního custom typu

    ```TS
    type StringOrNumber = string | number;
    //použití typu
    let a: StringOrNumber = 10;
    a = "Ahoj";
    a = true; //ERROR
    ```

    -   String literal
    -   Jedná se o string, který má v sobě specifický text

    ```ts
    let superText: 'ahoj' | 'cau';
    superText = 'ahoj'; //OK
    superText = 'cau'; //OK
    superText = 'neco jinyho'; //ERROR
    ```

-   typeof proměnná - vrátí typ proměnné:

```ts
const a = {
    name: 'Patrik',
    age: 22
};

type TypeOfA = typeof a;
```

-   as/satisfies:

    -   Nachvíli si odběhneme od custom typů a rychle si řekneme něco k přetypovávání

    -   as:

        -   násilnější typ přetypovávání, dovolí nám z jednoho typu udělat jiný

        ```TS
        const a: number = "Ahoj" as number //říkáme, že string "Ahoj" je number a vše proběhne v pohodě
        ```

        -   S as se také pojí mírně any a unknown
        -   Typicky any nepoužíváme !! max využíváme na přetypování tříd, kde as samo o sobě nefunguje

        ```TS
        XMLSerializer as XMLHttpRequest; // ERROR
        ```

        -   Proto tady musíme provést double přetypování:

        ```TS
        XMLSerializer as any as XMLHttpRequest // OK, ale není to dobrý nápad :D
        ```

        -   Za to unknown se bere takže my ten typ neznáme a je vhodné na něho použít as, pokud máme ověřeno, že se jedná o náš typ
        -   Na nic je, že většina standartních funkcí vrací any, když neví o co se jedná, poté uživatel se toho zbaví přes as MujTyp a když náhodou příjde něco nečekaného, tak appka spadne.
        -   unknown takhle vyhodí chypu a nedovolí na typu nic volat, dokud ho nepřetypujeme, nebo například přes podmínky neupřesníme:

        ```TS
        let aa: any;
        aa.ahoj; // OK
        let bb: unknown;
        bb.ahoj; // ERROR: bb is type unknown, tedy nás varuje, že nevíme co tam bude a proto není dobré šahat na .ahoj

        if (typeof bb === "string") {
            bb; // tady typescript ví, že bb je string, takže můžeme používat bb.substring() atd...
        }
        ```

    -   satisfies:

        -   satisfies je super pro objekty, kde když my máme například union object z předtím:

        ```ts
        type Status =
            | {
                  ///union začínající na novém řádku, typicky nepíšeme, ale formatter za nás udělá, tedy je to validní kód
                  status: true; // pokud status je true
                  data: string; // tak bude object obsahovat data typu string
              }
            | {
                  status: false; // pokud je ale status false
                  message: string; // tak bude object obsahovat message typu string
              };
        const correctStatus = {
            status: true,
            data: 'Ahoj'
        } as Status;

        correctStatus.data; //Error, protože typescript neví, jestli je status true/false
        ```

        -   Jak můžeme vidět, tak tady jsme přetypovali náš object na typ Status, ale teď typescript neví, že status je true, proto nám nedovolí šahat na property data
        -   Když ale použijeme satisfies, tak se typescript podívá na daný object, porovná, jestli je OK z hlediska typu a zůží ho na co nejmenší typ

        ```TS
        const correctStatus2 = {
            status: true,
            data: 'Ahoj'
        } satisfies Status; // tady se typ zůží na:
                            /*
                            {
                                status: true; //tady status bude vždy jen true
                                data: string;
                            }
                            */

        correctStatus2.data; //OK
        ```

-   Zpátky k vlastním typům:

    -   Můžeme vytvářet speciální typy, které obsahují více již známých typů
    -   Například si řekneme, že náš typ musí mít string a pak na konci nějaké číslo:

    ```ts
    type StringNumber = `${string}-${number}`; // tady pracujeme na typové úrovni, takže do ${} dáváme typy
    // taky není úplně ideální dávat něco jako ${string}${number}, protože pak TS neví, kde končí ten string a má začínat number

    'ahoj' satisfies StringNumber; ///Error
    'ahoj-123' satisfies StringNumber; //Ok
    '456' satisfies StringNumber; //Error
    ```

    -   V ${} můžeme ale používat i svoje typy
    -   Například chceme udělat typ, který bude mít v sobě typescript barvu na text
    -   Ten se skládá z text-barva-číslo:

        1. si uděláme typ na barvy

        ```ts
        type Color = 'orange' | 'yellow' | 'purple' | 'gray' | 'red'; //stačí nám takto
        ```

        2. Uděláme si typ, který bude mít v sobě čísla (intenzity barvy)

        ```ts
        type Intensity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
        ```

        3. Nyní to spojíme do jedné barvy v daném formátu

        ```ts
        type TextColor = `text-${Color}-${Intensity}`; // tento typ nyní má všechny kombinace text-orange-50 text-orange-100, text-yellow-950....
        let color: TextColor = 'text-red-500'; //OK, viz výše, při použití satisfies, tak tady typescript nemá moc na so zůžit, protože by muselo vzniknout něco jako `${string}-${string}-${number}`, ale to není moc přesné, proto to prostě zůží na string a poté bych mohl do proměnné uloži jakýkoliv string
        color = 'text-gray-50'; // Dokonce máme syntax highligting :)
        ```

-   Generické typy:

    -   Například u typu array, bychom s aktuálníma typama museli buď:
        1. mít něco jako StringArray, NumberArray, UnefinedArray atd... + neměli bychom jak mít array unionuů
        2. array, který bude mít any
    -   Ani jeden z těchto řešení není optimální a proto existují generické typy
    -   Řekneme, že máme nový typ, který ale nepřiřadíme a ten pak používáme:

    ```ts
    type MyCoolType<T> = T;
    ```

    -   Tímto říkáme, že mám typ MyCoolType, který dostane nějaký typ T a tím ho definuje, takže:

    ```ts
    let string = 'Ahoj' satisfies MyCoolType<string>; // nyní se stane toto:
    // type MycoolType = string jakoby a TS nám to satifiene a nastaví
    let string2: MyCoolType<string> = 'Ahoj'; // funguje taky a teď bude typ proměnné string2 MyCoolType<string>, který ale v podstatě je teď string
    let number: MyCoolType<number> = 10; // Tady teď říkáme, že budeme mít číslo
    ```

    -   Například u ukázky nahoře pro typ Status, bychom nechtěli mít property data jako string, ale něco co my si zvolíme, to co příjde ze serveru
    -   Typ tedy upravíme na:

    ```ts
    type GenericStatus<T> =
        | {
              status: true;
              data: T;
          }
        | {
              status: false;
              message: string;
          };

    //Nyní ho použijeme

    GenericStatus<string>; /*
    {
        status: true;
        data: string;
    } | {
        status: false;
        message: string;
    }
    */

    GenericStatus<{
        name: string;
        age: number;
    }>; /*
     {
        status: true;
        data: {
            name: string;
            age: number;
        };
    } | {
        status: false;
        message: string;
    }
    
    */
    ```

    -   Jinak array je teda implementován genericky:

        -   Array<T> - generický array
        -   Proměnná teda bude vypadat takto:

        ```ts
        const array: Array<string> = ['ahoj', 'jak', 'se', 'mas'];
        ```

        -   Stím že je i kratší zápis T[]:

        ```ts
        const array: string[] = ['ahoj', 'jak', 'se', 'mas'];
        ```

    -   To stejný například Promise:

        -   Promise<T> - generický promise

        ```ts
        const promise = new Promise<string>((resolve, reject) => {
            resolve(10); //Error, očekáváme string;
            resolve('OK'); //OK
        });
        ```

    -   extends:

        -   Extends nám dokáže zůžit náš typ T například jen na nějaký array:

        ```ts
        type Wrapper<T extends string | number> = T;
        Wrapper<string>; //OK
        Wrapper<number>; //OK
        Wrapper<boolean>; //ERROR
        ```

        -   Podmínky přes extends:

        ```ts
        type NumberForType<T> = T extends string ? 69 : 123;
        NumberForType<'ahoj'>; // typ 69
        NumberForType<number>; // typ 123
        ```

    -   never:

        -   Typ, který říká, že to nikdy nic nebude
        -   Většinou se nepoužívá na proměnné, ale napříkla v typech, když něco je blbě
        -   Například:

        ```ts
        type OnlyString<T> = T extends string ? T : never;

        let onlyString: OnlyString<string>; //string
        let onlyNumber: OnlyString<number>; //never
        ```

        -   Typicky se používá při filtrování unionů:

        ```ts
        type RandomUnion = string | number;

        type RandomUnion2 = boolean | undefined;
        type RandomNonUnion = string;

        type FilterString<T> = T extends string ? T : never; //když to je string, vrať T, jinak never

        type Filtered = FilterString<RandomUnion>; //string
        type Filtered2 = FilterString<RandomUnion2>; //never
        type Filtered3 = FilterString<RandomNonUnion>; //string
        ```

-   as const:

    -   Není jako JavaScript const, ale řekne nám, že daný typ je konstatní a nelze ho měnit, tedy

    ```ts
    const obj = {
        name: 'Patrik',
        age: 22
    } as const;

    obj.name = 'Idk'; //Error property is readonly
    ```

-   Složitější ukázka:

```TS
const persons = [
    {
        name: 'Patrik',
        age: 22
    },
    {
        name: 'Elon',
        age: 52
    },
    {
        name: 'Joseph',
        age: 12
    }
] as const;

//Create arrays of same properties
//for this case:
//1. with all names
//2. with all ages

type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P]; // Handles arrays and objects
};

type MutableObject<T> = {
    -readonly [K in keyof T]: T[K] extends readonly [infer U, ...infer Rest] // Check if it's a readonly tuple
        ? [U, ...Rest] // Keep the tuple type intact but remove readonly
        : T[K] extends ReadonlyArray<infer U> // Check if it's a readonly array (not tuple)
          ? U[] // Convert to a mutable array
          : T[K]; // Keep other types as they are
};

type MakeTuples<T extends readonly Record<string, any>[]> = MutableObject<{
    [K in keyof T[number]]: Mutable<{ [I in keyof T]: T[I][K] }>;
}>;

type AA = MakeTuples<typeof persons>;
```

-   is:

    -   Pokud chceme returnovat boolean, na základě nějakého typu
    -   Tak tady využijeme this
    -   Že když tam předáme string, vrátí true, jinak false

    ```ts
    const isString = (value: unknown): value is string => {
        /// Tady říkáme, že to vrátí true, pokud T je string, ale jen na typové úrovni
        return typeof value === 'string'; /// tady to kontrolujeme již na úrovní kódu
    };
    const result1 = isString('Ahoj'); /// true - boolean typ
    const result2 = isString(10); /// false - boolean typ

    //pokud to ale použijeme v ifu, například:
    let unknown: unknown = 10;
    if (isString(unknown)) {
        console.log(unknown); // tady je typ string
    }
    ```

    -   Na takhle triviální věc rovnou do ifu můžeme dát typeof....
    -   Ale na složitější kontrolu, například z await response.json() dostaneme any a kontrolujeme zda se jedná o náš special typ/object pokud ano, tak to máme již natypované a můžeme bezpečně používat

### Úkol

vezměme si API z úkolu 5. Síťová komunikace a

1. zadejte jméno do konstatní proměnné
2. vytvořte generickou funkci, která dostane url, metodu a data.
    - Parameter url bude string
    - Parameter method bude typu Method, která bude povolovat pouze literaly: "GET", "POST" | "PUT" | "PATCH" | "DELETE" a defaultně bude mít nastavenou hodnotu na "GET"
    - Parameter data bude optional a bude příjmat any
    - V této funkci poté zavoláte fetch na danou URL. Pokud metodu fetche berte z parametru a pokud parametr data není undefined, tak jej převeďte na string pomocí JSON.stringify (to funuje na stringy, čísla, objekty i arraye)
    - Poté result z funkce fetch parsněte na json .json()
    - Vraťte data zpátky
    - Pokud nastane chyba vraťte undefined
    - Funkce bude async, takže vrací Promise\<T>!!!
3. nyní vaši vytvořenou funkci použijte a získejte data z API /getHash, zkontrolujte return type!
4. nyní spočitejte váš hash
5. opět použijte vaši funkci na poslání dat do API /checkHash a return type zkontrolujte a napište něco jako "Hash byl správně vypočítán"/"Nebyl správně vypočítán"....
