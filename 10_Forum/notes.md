# Forum

- Dohodli jsme se, že budeme společně dělat na jednoduchém fóru, jakožto projekt ve SvelteKit
- Postupně si ukážeme všechno od základů
- Jediné co budu kopírovat je design, ať ho nemusím dělat, ale záznamy s dělání designu budou

## Login/register

- Potřebujeme databázi, osobně si tady nebudeme řikat, jak funguje databáze + SQL, ale nějaké základy snad zvládneme
- Není to úplně kurz SQL, takže se když tak podívejte na to mimo
- Budeme používát Kysely, což je type-safe prontend pro dělání sql příkazů, tedy místo:

```SQL
SELECT * FROM projects WHERE id > 10;
```

Napíšeme:

```ts
await conn.selectFrom('projects').selectAll().where('id', '>', 10).execute();
```

- Hlavně, jak jsem psal je to type-safe
- Nevýhodou je, že si typy musíme udělat sami, nebo použít nějaký tool,
- My budeme používat `kysely-codegen`, který se připojí na databázi, prozkoumá její schéma (jak vypadá) a vygeneruje nám podle toho typy
- Jako první věc je potřeba přidat tyto balíčky do našeho projektu:

```BASH
npm i kysely mysql2
npm i -D kysely-codegen
```

- Možná vás může zajímat, co znamená -D to instaluje package pouze do development prostředí, protože tento package v releasu používat nebudeme.
- Nyní je potřeba do .env souboru doplnit připojivací údaje k databázi, typicky:

```ENV
DATABASE_IP=10.10.10.223
DATABASE_PORT=3306
DATABASE_USER=superclovek
DATABASE_PASSWORD=tajnyheslo123456
DATABASE_NAME=db
DATABASE_URL=mysql://superclovek:tajnyheslo123456@10.10.10.223:3306/db
```

- Typické údaje jso IP, port, user, password a name databáze, kterou budeme používat.
- Typicky totiž Databázové systémy (Mariadb, Mysql, PostgreSQL...) mají v sobě N databází a typicky se používá databáze na jeden systém, ať je to oddělené
- DATABASE_URL je poté pro kysely-codegen, který se pomocí této "url" připojí na databázi a vygeneruje právé typy:

```
Databázový Systém (my používáme mariadb (mysql))  jmeno databáze
  v                                                    v
mysql://superclovek:tajnyheslo123456@10.10.10.223:3306/db
         ^             ^                 ^        ^
   username          password            ip      port
```

- Nyní potřebujeme nachystat pár věci.

    1. Je potřeba udělat nějakým způsobem spouštění příkadu kysely-codegen, to můžeme přidat do package.json, jako script:

    ```json
        "genDatabaseSchema": "kysely-codegen --out-file ./src/types/database.ts",
    ```

                                              - Tento script nám uděla to, že když zavoláme `npm run genDatabaseSchema`, tak se spustí kysely-codegen a vygeneruje nám typy do složky ./src/types/database.ts

    2. Teď jsme udělali vytváření typů. Dále potřebujeme nějak se připojit k databázi, k tomu použijeme package mysql2, co jsme instalovali nahoře. Já typicky mám udělaný soubor varaibles.ts v src/lib/server, kde si vytvářím exportované proměnné (variables) a ty si poté importuju do různých souborů:

    ```ts
    import { DATABASE_NAME, DATABASE_IP, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '$env/static/private';
    import { MysqlDialect } from 'kysely';
    import { createPool } from 'mysql2';

    const dialect = new MysqlDialect({
        pool: createPool({
            host: DATABASE_IP,
            port: parseInt(DATABASE_PORT),
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        })
    });
    ```

                                            - Tímto jsme si udělali proměnnou dialect (takto nazývá Kysely různé typy připojení), a jak můžeme vidět, do něho ukládáme nový MysqlDialect a v něm vytváříme pool (bazén), do které ukládáme výstup funkce createPool právě z mysql2. Pool je v podstatě nějaký "bazén" připojení, které jsou dopředu navázané a my když chceme se připojit k databázi, tak se nevude dělat nové, ale z poolu se nějaké vytáhne a přes něho se rovnou komunikuje z DB.

    3. Teď potřebujeme udělat novou instanci kysely s daným dialectem a typama, co jsme obdrželi od kysely-codegen:

    ```ts
    import type { DB } from '$/types/database';

    export const conn = new Kysely<DB>({
        dialect
    });
    ```

                                            - Zde používáme ten náš předtím vytvořený dialect, importujeme typ DB ze souboru co vytvořil codegen a exportujeme proměnnou conn, kterou budeme používat na komunikaci s DB

- Tak když máme nachystané připojení k databázi, tak si řekneme, jak systém bude probíhat:

    1. Uživatel přejde na registrační formulář
    2. Zadá username, email a heslo + zopakuje heslo
    3. Frontend checkne, jestli se hesla rovnají, pokud ano, pošle request na API
    4. API zkontroluje, jestli username/email již nebyly použity
    5. Když se vše povede, zahashuje se heslo pomocí Bcrypt
    6. Uloží se údaje do databáze a uživatele to přihlásí

- Nyní by bylo dobré teda pořešit logiku API
- Jak bylo zmiňováno v úvodu, k tomu slouží soubor +server.(js|ts), který se vykonává pouze na serveru a lze na něm definovat metody zvlášť pro GET, POST...

```ts
export const GET = ...;
export const POST = ...;
```

- Pro náš případ bychom mohli udělat něco takového:

```ts
import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
    const json = await request.json();
    console.log(json);
    return new Response('hello');
}) satisfies RequestHandler;
```

- Toto je teď post endpoint, který dostane request, v něm si z requestu vytáhneme JSON a ten vypíšeme, zpátky pak vrátíme text `hello`
- Toto je sice pěkné, ale na každý endpoint bychom museli:

    1. Vytvářet novou složku se souborem +server.ts
    2. Řešit parsování, tedy:
        1. jestli vůbec přišli nějaká data, takže request.json by nám mohl hodit vyjímku, pokud by tam json vůbec nebyl
        2. jestli dostáváme fakt data co chceme
    3. Nemáme pořešený type-safe interface, takže když naše API třeba bere username, email, password, tak my pošleme fetch a musíme se proklikávat mezi soubory, co tam poslat například data, pokud zapomeneme
    4. SSR, pokud bychom například chtěli kód generovat na serveru, tak nemáme jednoduchý způsob, jak ze serveru zavolat danou API, abychom se například vyhnuli posíláním requestu

- Ukázka, jak by to mohlo vypadat:

```
tree
.
├── article
│   ├── ban
│   │   └── +server.ts
│   ├── comments
│   │   ├── delete
│   │   │   └── +server.ts
│   │   ├── get
│   │   │   └── +server.ts
│   │   ├── load
│   │   │   └── +server.ts
│   │   └── send
│   │       └── +server.ts
│   ├── create
│   │   └── +server.ts
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   ├── history
│   │   ├── change
│   │   │   └── +server.ts
│   │   ├── remove
│   │   │   └── +server.ts
│   │   └── +server.ts
│   ├── check
│   │   └── +server.ts
│   ├── rating
│   │   ├── get
│   │   │   └── +server.ts
│   │   └── send
│   │       └── +server.ts
│   ├── search
│   │   └── +server.ts
│   └── unban
│       └── +server.ts
├── bans
│   └── +server.ts
├── categories
│   ├── get
│   │   └── +server.ts
│   └── raw
│       └── +server.ts
├── category
│   ├── create
│   │   └── +server.ts
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   ├── getPath
│   │   └── +server.ts
│   └── check
│       └── +server.ts
├── file
│   └── +server.ts
├── lockdown
│   ├── get
│   │   └── +server.ts
│   └── toggle
│       └── +server.ts
├── logged
│   └── +server.ts
├── login
│   └── +server.ts
├── logout
│   └── +server.ts
├── regex
│   ├── delete
│   │   └── +server.ts
│   ├── edit
│   │   └── +server.ts
│   ├── get
│   │   └── +server.ts
│   └── new
│       └── +server.ts
└── user
    └── getPermissions
        └── +server.ts

46 directories, 37 files
```

- Něco takového asi nechceme :D
- Pro něco takového jsem si napsal menší package @patrick115/sveltekitapi
- Tento package funguje takto:

    - Vytvořím si API z nějakým kontextem, kontext je něco, co se v rámci požadavku předáva, tedy mohu zde mí něco jako, jestli je uživatel přihlášený, nebo si někde nějaké data tam uložit a pak přeposlat dalším funkcím atd..

    ```ts
    import type { AsyncReturnType, CreateContext } from '@patrick115/sveltekitapi';

    export const context = (async (ev /*<- SvelteKit's RequestEvent */) => {
        return {}; // Here you can put your context
    }) satisfies CreateContext;

    export type Context = AsyncReturnType<typeof context>;
    ```

    - Typicky, jak to funguje:
        - Dostanu request -> Pošlu ho prvnímu MiddleWare (typicky nějaká část uprostřed, třeba řeší, jestli je uživatel přihlášen) -> další MiddleWare... -> řešení již requestu a odpověď
        - MiddleWarů může být kolik chce, my asi bude používat jen jeden a to na endpointy, které budou za loginem
        - Právě my si můžeme v kontextu vytáhnout data z cookies, pak MiddleWare checkne, jestli je uživatel přihlášen a jestli ano, tak rovnou dál předá jeho data, protože nepřihlášený uživatel se dále nedostane
    - Když vytvořenou api, tak si z ní vytáhnu router a proceduru

    ```ts
    import { APICreate } from '@patrick115/sveltekitapi';
    import type { Context } from './context';

    export const api = new APICreate<Context>();

    export const router = api.router;
    export const procedure = api.procedure;
    ```

                                - Router je hlavní část, která řeší, která url (endpoint) odpovídá, jaké funkcinalitě, ta tady funguje tak, že mám object a vše se přidává za náš určený základ (base url). TaTakže když mám:
                                ```ts
                                {
                                    "helo": ...,
                                    "auth": {
                                        "login": ...,
                                        "register": ...
                                    }
                                }
                                ```
                                - Tak budu mít třeba: /api/helo, /api/auth/login, /api/auth/register atd...
                                - Dále teda mám proceduru, což je v podstatě nějaká už daná akce, co se vykoná (jméno jsem převzal z balíčku TRCP, což dělá něco podobného pro NextJS)

    - Nyní si můžu vyexporotvat instanci routeru již s nějakýma routama

    ```ts
    import { json } from '@sveltejs/kit';
    import { z } from 'zod';
    import { postProcedure, proc2, procedure, router } from './api';

    export const r = router({
        example: procedure.GET.query(() => {
            return 'Hello from the API!';
        })
    });

    export type AppRouter = typeof r;
    ```

    - Když mám routera context, tak si mohu vytvořit "server"

    ```ts
    import { APIServer } from '@patrick115/sveltekitapi';
    import { context } from './context';
    import { r } from './routes';

    export const Server = new APIServer({
        router: r,
        path: '/api',
        context
    });
    ```

    - Pojem server tady asi není korektní, protože stále je to za nějakým tím Svelte Serverem, ale tak nevadí :D
    - Nyní můžeme udělat nějaký generický endpoint a do něho udělat, aby ho handloval náš server
    - Například: src/routes/api/[...data]/+server.ts

    ```ts
    import { Server } from '$/lib/server/server';

    export const GET = Server.handler;
    export const POST = Server.handler;
    export const PUT = Server.handler;
    export const DELETE = Server.handler;
    export const PATCH = Server.handler;
    ```

    - Tím teda říkáme, že pro metody GET, POST, PUT, DELETE a PATCH budeme volat funkci handle z našeho Serveru a [...data] říká, že bude matchovat jakoukoliv URL za /api
    - Nyní máme teda serverovou část, teď ta klientová
    - Uděláme si nového APIClienta a mu předáme typ routeru - POUZE TYP, typ nám nenaruší použití dat ze serveru
    - Když totiž chceme použít funckci ze serveru na clientovi, tak client bude muset dostat kód toho server kódu no a pokud bychom zde používali ENV proměnné, nebo kdo ví co tajného, tak se to klient dozví a před tím nás sveltekit stopne, ale typy ty jsou jen v typescriptu a v transpilaci na JS se odebírají, tedy import typu nám nic neleakne na frontend

    ```ts
    import { createAPIClient } from '@patrick115/sveltekitapi';
    import type { AppRouter } from './server/routes';

    export const API = createAPIClient<AppRouter>('/api');
    ```

    - Tak teď máme předanou API, ale ona zná jen typy, ale vůbec neví, co máme na serveru za endpointy, z javascriptového hlediska, a tím že nezná endpointy, tak ani neví, jaké metody posílat, takže my bychom je museli zadávat, ale to už je další problém, kdy se nám duplikují data, na serveru zadáme, že se jedná o GET a na frontendu bychom museli zadat znovu, jinak by fetch nevěděl, co poslat. Typama by se to sice pořešit mohlo, ale proč třeba nedat vědět dopředu, jaký endpoint má jakou metodu a client by si to pak přebral?
    - Takže nyní uděláme tzv. hydration ze serveru, tedy syncneme clienta ze serverem
    - Jako první je důležité udělat serverovou funkci, která nám vrátí tyto data:

    ```ts
    import { Server } from '$/lib/server/server';
    import type { LayoutServerLoad } from './$types';

    export const load = (async () => {
        return {
            api: Server.hydrateToClient()
        };
    }) satisfies LayoutServerLoad;
    ```

    - Typicky tento kód bude mít v +layout.server.ts a ještě k tomu v tom hlavním layoutu, ať můžeme API pak používat všude
    - To znamená, že teď na klienta posíláme object s jedinou položkou a to je api, kde dáváme result serveru, který se hydratuje ke klientovi
    - Nyní potřebujeme v layoutu tyto data příjmou a syncnout tím clienta:

    ```svelte
    <script lang="ts">
        import { API } from '$/lib/api';
        import type { Snippet } from 'svelte';
        import type { LayoutData } from './$types';

        let { children, data }: { children: Snippet; data: LayoutData } = $props();

        API.hydrateFromServer(data.api);
    </script>

    {@render children()}
    ```

    - Tady vidíme, že teda v props máme i data, což jsou právě data ze serveru a na API pak voláme hydrateFromServer a posíláme tam data.api. Nemusí nás úplně zajímat, co se v tom posílá.
    - Nyní máme všechno ready a můžeme kdekoliv v appce použít třeba nadefinovaný example

    ```ts
    const result = await API.example();
    //vrátí: Hello from the API!
    ```

    - V devtools můžeme pak vidět, že se to posílá na /api/example
    - Výhodou je také, že je to teda typesafe, takže rovnou vidíme, co dostaneme za data
    - Typesafe je také i API, takže když budeme mít POST route z nějakými daty:

    ```ts
    import { z } from 'zod';
    import { procedure, router } from './api';

    export const r = router({
        example: procedure.POST.input(
            z.object({
                username: z.string()
            })
        ).query(({ input }) => {
            return `Hello ${input.username}` as const;
        })
    });

    export type AppRouter = typeof r;
    ```

    - Tímto říkáme, že route /api/example je na metodu POST a očekáva object s username typu string (jak vidíme, využívám tady Zod)
    - V query si pak vytáhneme z objektu input, kde je zajištěno, že opravdu v něm bude přesně to co jsme nadefinovali
    - V klientovi nám poté bude řvát typescript, když tam nepošleme to co nemáme. I když budeme typescript ignorovat, tak dostaneme Bad Request response
    - Dá se tady dělat dost dalších věcí, ale ty si řekneme později

- nyní máme nachystanou API, tak pojďme si udělat první nějaký náš endpoint, rovnou můžeme zkusit pracovat na registeru:

```ts
import { z } from 'zod';
import { procedure, router } from './api';

export const r = router({
    auth: {
        register: procedure.POST.input(
            z.object({
                username: z.string(),
                email: z.string().email(),
                password: z.string()
            })
        ).query(async ({ input }) => {
            return input;
        })
    }
});

export type AppRouter = typeof r;
```

- Tento post endpoint pouze vezme data, co jsme mu předali a pošle nám je pryč
- Pojďme si udělat kód, který bude řešit logiku registrace

```svelte
<script lang="ts">
    import Card from '$/components/Card.svelte';
    import Button from '$/components/Form/Button.svelte';
    import Entry from '$/components/Form/Entry.svelte';
    import Input from '$/components/Form/Input.svelte';

    let data = $state<
        Record<
            string,
            {
                value: string;
                error?: string;
            }
        >
    >({
        username: {
            value: '',
            error: undefined
        },
        email: {
            value: '',
            error: undefined
        },
        password: {
            value: '',
            error: undefined
        },
        password2: {
            value: '',
            error: undefined
        }
    });

    const register = async () => {
        //At the start remove all errors
        Object.values(data).forEach((item) => (item.error = undefined));

        if (!data.username.value) {
            data.username.error = 'Please enter username';
        }
        if (!data.email.value) {
            data.email.error = 'Please enter email';
        }
        if (!data.password.value) {
            data.password.error = 'Please enter password';
        }
        if (!data.password2.value) {
            data.password2.error = 'Please enter password';
        }
        if (data.password.value != data.password2.value) {
            data.password2.error = "Password doesn't match";
        }

        //check if some errors
        if (Object.values(data).some((item) => item.error !== undefined)) {
            return;
        }

        const response = await API.auth.register(Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.value])));
        console.log(response);
    };
</script>

<Card class="m-auto grid min-w-[50%] grid-cols-2 gap-2 p-8">
    <h1 class="col-span-2 mx-auto mb-4 w-max border-b-2 border-b-black font-poppins text-2xl font-bold lg:text-4xl">Register</h1>
    <Entry id="username" label="Username">
        <Input id="username" bind:value={data.username.value} />
    </Entry>
    <Entry id="email" label="Email">
        <Input id="email" type="email" bind:value={data.email.value} />
    </Entry>
    <Entry id="password" label="Password">
        <Input id="password" type="password" bind:value={data.password.value} />
    </Entry>
    <Entry id="password2" label="Password (again)">
        <Input id="password2" type="password" bind:value={data.password2.value} />
    </Entry>
    <Button onclick={register} class="col-span-2 mx-auto">Register</Button>
</Card>
```

- O errory v inputech se nám stará naše Entry, ale co errory, co nám da API, na to by byl dobrý nějaký Toast (typicky prvek GUI, který se zobrazí nějakou informaci někde jako popup), není to úplně alert, kdy vyskočí uprostřed obrazovky, ale spíše na straně a k tomu využívám SweetAlerts2
- Pojďme si je nainstalovat

```bash
pnpm i sweetalert2
```

- Jak se používá

```ts
import Swal from 'sweetalert2';
Swal.fire({
    toast: true,
    icon: 'success',
    position: 'top-end',
    title: 'Ahoj'
});
```

- Tento kód nám zobrazí toast v pravo nahoře, kdy ikonka bude success, text Ahoj a bude tam tlačítko ok
- V mnoha případech nechceme, aby tam bylo tlačítko, aby tam byl třeba časovač atd..
- Tím bychom ale v každém tomto zavolání museli všechny vypisovat, proto si na to uděláme funkci:

```ts
import Swal, { type SweetAlertOptions } from 'sweetalert2';

export const SwalAlert = async (data: SweetAlertOptions) => {
    if (!browser) {
        return {
            isConfirmed: false
        };
    }

    return Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        ...data
    });
};
```

- Tato funkce bere jako parametr options sweet alertu
- Firene sweet alert s parametry: toast, pozice v pravo nahoře, za 2s zmizne, bude se ukazovat timer, kdy zmizne, nebude se ukazovat Ok button a Cancel button
- Ostatní optiony, které zadáme se spreadnou a mergnou s aktuálními optiony
- Ty optiony, které my dáme se přepíšou
- Proč tam je if !browser? To je z toho důvodu, že když se stránka chce renderovat na serveru, tak server nemá jak zobrazit sweet alert, tak prostě vrátíme nějakou hodnotu, o té později
- Sweet alerty také supportí třeba ptání se na otázky: Opravdu chcete smazat tento příspěvek? Ano/Ne no a tím že uživatel někdy v budoucnu klikne na button, tak Swal.fire vrací promise a ten se resolve v moment, co uživatel klikne na button, ukážeme si na ukázce. No a my teda v případě, že jsme na serveru vrátíme, že jsme nepotvrdili ten popup.
- To je naše funkce SwalAlert, použití:

```ts
import { SwalAlert } from '$/lib/functions';
SwalAlert({
    icon: 'success',
    title: 'Úspěšně přihlášen'
});
```

- Jak můžeme vidět, tak použití je o dost jednodušší a píšeme v 99% případů pouze ikonku: "success" | "warning" | "error", a title, což je naše zpráva
- Nyní máme i řešení vypisování chyb pro uživatele, nyní si nadefinujeme typy, které budeme z API dostávát
- Těmito typy myslím nějamý typ úspěšný a neúspěšný. Čistě náhodou jsme si již tento typ v typescriptu ukazovali

```ts
export type Response = {
    status: true;
};

export type ResponseWithData<$DataType> = Response & {
    data: $DataType;
};
```

- Aktuálně definujeme pouze typy úspěšné, protože error typy má v základě už API
- & nám říká, že chceme objecty spojit dohromady
- Nyní máme všechno, kromě teda bcryptu a tabulky v databázi
- Tabulka zatím bude vypdata takto:
  | id | username | email | password|
  | --- | --- | --- | --- |
  | 1 | patrick115 | ja@patrick115.eu | \$2b\$12\$ny0GuPu3cd/eLJnC3qy66u4u2nzkB3zEdTSVv1.g4QqfY.U.b4lO6 |
- nyní máme udělanou tabulku, takže syncneme typy
```bash
npm run genDatabaseSchema
```
- A jdeme psát kód, takže teď:
    - Uděláme kontrolu, že již email, nebo heslo neexistuje v DB
    ```ts
    const exits  = await conn.selectFrom("")... 
    ```
    - Pokud existuje, tak vrátíme error:
    ```ts
    return {
        status: false,
        code: 401,
        message: "User with this username or email already exist"
    } 
    ```
    - Nyní zahashujeme heslo
    ```ts
    const hashed = bcrypt.hashSync(password, parseInt(HASH_ROUNDY)); 
    ```
    - Nyní uložíme do databáze
    ```ts
    await conn.insertInto()... 
    ```
    - Zatím nebudeme řešit přihlašování, takže vrátíme něco jako status: true a přesměrujeme uživatele na login
