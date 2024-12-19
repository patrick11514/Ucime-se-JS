# Forum #2

- Minule jsme si udělali na našem fórum udělali registraci a nyní budeme pokračovat s loginem a logoutem
- K tomu abychom si mohli uchovat status o přihlášení budeme potřebovat cookies
- V těchto budeme mít uložený nějaký stav

## Typicky se přihlášení děla věma způsoby

1. Session Token

    - Tento token je pouze random vygenerovaný string a jen reprezentuje kdo jste, například: "ead19ebf488bf650125e57f72f2e1024ed6ed294"
    - Tento token poté vždy přečte server, podívá se do nějaké svoje databáze a najde si naše data pod tímto tokenem
    - Například v JSONu by to vypadalo takto:

    ```JSON
    {
        "ead19ebf488bf650125e57f72f2e1024ed6ed294": {
            "id": 20,
            "username": "patrick115",
            "permissions": ["forum.thread.create", "forum.user.ban"],
            "dalsi": "data",
            "toto_jsou_dalsi": "data ktere muse mit uzivatel ulozen atd.."
        }
    }
    ```

    - Pojďme si k tomu říct nějaké výhody/Nevýhody
    - Výhody:
        - Uživatel se identifikuje pouze tokenem
        - Data jsou uložena na serveru, takže si uživatel nemůže přečíst, co u něho máme uloženo
    - Nevýhody:
        - Data jsou uložena na serveru, takže ke každému uživateli musíme mít něco uloženo (zabírá to místo na serveru)
        - Musíme někam šahat na disk pro data, takže možné zdržení

2. JWT (Json Web Token):
    - Tento princip funguje tak, že v tokenu je uložen JSON s daty uživatele
    - https://jwt.io/
    - Typicky se skládá ze tří částí oddělené tečkou:
        1. Informace o hashovacím algoritmu
        2. Data
        3. Podpis dat
    - Data tím pádem neukládáme na serveru, ale rovnou v daném tokenu
    - Určitě si ale říkáte, však si uživatel může tento token upravit/přečíst informace
    - Tak s přečtením informací, by neměl být problém, protože zde neukládáme nic tajného
    - Sice jsem jednou na jedných stránkách viděl, že mělo autologin udělaný způsobem, že vaše heslo uložilo v plaintextu do cookie a poté si to systém přečetl a když jste byli odhlášení, tak vás přihlásil XD
    - Typicky co všechno máme v cookies vypisujeme na web: username, id
    - Můžeme tam mít například i permisse
    - A teď se dostáváme k druhé části a to co když si to uživatel upraví
    - Díky použití algorimu, typicky algoricky HMAC, které k hashování používají ještě klíč, ten typicky máme uložený na serveru v .env
    - Když si někdo proto změní tyto cookies, nemá jak data zahashovat správně a potom náš server při validaci hodí chybu a typicky bere uživatele jako nepřihlášeného
    - Pojďme se podívat na výhody/nevýhody
    - Výhody:
        - Data jsou rovnou uložena u uživatele, tedy nepotřebujeme na serveru nic ukládat
    - Nevýhody:
        - Uživatel si dokáže data přečist (ale neměl by to být problém, nemáme zde schovávat tajná data)

My budeme volit volbu s JWT, ať nemusíme řešit nějaké ukládání
Fun fact: PHP využívat první možnost a session tokeny uchovává do souboru:
![STORAGE INFO](https://upload.patrick115.eu/screenshot/dfe08d7689.png)

## Setup

- Pro tuto práci budeme využivat package:
  https://www.npmjs.com/package/jsonwebtoken
- Pro tento package mám i nachystanout třídu
- Soubor dám pak na stažení/dá se sehnat z mého instalátoru packagů při zakliknutí (cookies)

```BASH
npm create @patrick115/app@latest
```

- V tomto souboru jsou pak exportnuté dvě třídy:

    1. SessionCookies:

    ```ts
    const cookie = new SessionCookies('/path/to/cookies.json');

    const AGE = 1000 * 60 * 60; // 60 minues

    let token = cookie.setCookie(
        {
            username: '...',
            another: 'data'
        },
        AGE
    );

    //get data by id
    let data = cookie.getCookie(token);
    (data.username = data.username + '_123'),
        //update
        cookie.updateCookie(token, data, AGE);

    //remove
    cookie.deleteCookie(token);
    ```

    2. JWTCookies:

    ```ts
    const SECRET_KEY = 'Gulas';
    const jwt = new JWTCookies(SECRET_KEY);
    const cookie = jwt.setCookie({
        username: '...',
        another: 'data'
    });

    //now get the value
    const data = jwt.getCookie(cookie);

    //We don't need to remove it, since its nowhere stored
    ```

- Použití bude pak následovné:

```ts
export const jwt = new JWTCookies(SOME_ENV_VAR);

//kdekoliv jinde
const cookie = jwt.setCookie(data_to_cookieaize);
cookies.set('session', cookie, {
    path: '/',
    maxAge: parseInt(EXPIRE_IN_SECONDS) * 1000
});

//Poté když chceme ověřit zda je přihlášený
const cookie = cookies.get('session'); //string | null
if (!cookies) {
    //není přihlášen
    return;
}

const data = jwt.getCookie<T>(cookie); // T | null
if (!data) {
    //pravděpodobně nevalidní data - změna SECRET_KEY za běhu/snažil se upravit svoje data
    return;
}

//tady víme, že je přihlášen a můžeme využívat proměnnou data
```

Tak jako první si setupneme cookiesky:

- zkopírujeme teda soubor
- nyní si do .env.example přidáme:
    - COOKIE_EXPIRE - expirace cookies v sekundách
    - JWT_TOKEN - Secret pro JWT
- Nyní si ideálně uděláme typ, který bude popivovat stav uživatele:

```ts
export type UserState =
    | {
          logged: false;
      }
    | {
          logged: true;
          data: Omit<User, 'password'>; //User z databáze, ale bez hesla, to tam nechceme
      };
```

- Nyní musíme upravit context, abychom v naši api automaticky získavali info o tom, zda je přihlášen
- Ideálně si uděláme funkci, která dostane cookies a vytáhne z toho náš typ UserState {logged:....}
- Tak nyní v contextu naši API máme data o tom, zda je přihlášen/není
- Uděláme si teď middleware

```ts
export const loggedProcedure = procedure.use(async ({ ctx, next }) => {
    if (!ctx.logged) {
        throw new MiddleWareError({
            status: false,
            code: 401,
            message: 'Unauthorized'
        });
    }

    return next(ctx.data);
});
```

- Tady jsme teď udělali to, že jsme naši procedure rozšířili o funkci mezi a to tu, že dostane ctx, podívá se, jestli je uživatel logged, když ne, vyhodí error, ten se vnitřně catchne a returne to jako chybu z API uživateli
- Pokud je lognutý, tak vrátíme next, next, protože bude volat další funkci za sebou, buď další middleware, nebo rovno funkci z API a do té funkce předáváme dál nový context a ten je teď už jen data, protože teď víme, že user je na 100% lognutý, v pozdější funiconalitě, tedy můžeme o něm vědět i jeho data
- Rozhodně bych si začal rozdělovat routy do složek, ať v tom není bordel a nemáme to v jednom souboru: přesun.....
- Nyní si uděláme nový endpoint /auth/login a na něm checkneme, jestli udaje jsou ok a nastavime cookie
- Super, ale nyní potřebujeme nějak na frontendu ukládat naše data
- To uděláme přes setContext a getContext
- Context je nějaký context naší appky a v podstatě se tahá ke všem dětem, kde jsme ho nastavili a tím že chceme, aby byl všude, tak to uděláme v main layoutu
- Tím že cookiesky můžeme extrahovat jen z backendu, tak si vedle funkce Server.hydrateToClient vytáhneme i data z cookies z předem udělané funkce a pošleme na frontend UserState
- Ten si nyní uložíme do UserStatu a použijeme
- Teď si ten state můžeme vytáhnout v Navigation (je child) a podle toho vypisovat data
- Super, ale teď když se přihlásíme, tak vidíme, že jsme se přihlásili, ale nic se nezměnilo po F5 je to ok
- Protože data se tahají z backendu (+layout.server.ts) a nedali jsme F5, tak se ty data nenatáhly, takže je musíme ideálně po loginu nastavit
- Takže si do naší funkce z /auth/login dáme return našich dat a rovnou si je pošleme zpátky
- Teď ale nastavá problém, jak upravit context, my jsme si řekli že context jede ve stromu dětí jen dolů, ne nahoru hmm

- No můžeme použít typ Writable, co to je?
- Writable je nějakým způsobem typ (store), který umí být reaktivní a umí měnit svoje interní data a říct o tom
- Tedy my uložime do contextu, ne čistě object, ale Writable<object>, tím uděláme to, že můŽeme použit userData.set(newData);
- Problém je teď, data vytáhou, ve sveltu naštěstí je $store -> $userData pro accesnutí k datům napřímo
- Bohužel se od storů odchází, protože třeba page object byl kdysi store a ten je již deprecated

Nově by se to dalo dělat přes funkce, ale s těma to není tak jednoduché a elegantní, pokud ale si ale rádi ubližujete a chceme si implementovat hromadu nehezkých věci, tak zde :) :
Ref: https://svelte.dev/docs/svelte/$state#Passing-state-into-functions https://svelte.dev/docs/kit/state-management#Using-state-and-stores-with-context

- Dalo by se to ještě řešit přes globální staty (již není v docs, takže idk)

- Nyní dokážeme dynamicky aktualizovat naše data hned po loginu
- Pojďme si udělat logout:

    1. si uděláme api, použijeme náš middleware, protože je blbost odhlašovat někoho, kdo není přihlášen
    2. zavoláme logout api a pokud se to provede dobře, zase aktualizujeme náš store
    3. hotovo, máme logout :)

- Ještě si můžeme naimplementovat to, že když klikneme na login, tak nás to po loginu přesměruje zpátky na danou stránku
- A také si můžeme udělat to, že na login/register stránku nás to nepustí, když jsme již přihlášení, taky že proč :D
