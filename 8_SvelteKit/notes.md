## Co je to SvelteKit?

-   Jedná se o Frontend + Backend framework
-   Co je to framework?
    -   Jedná se o nějaký předem předpřipravený nástroj/program
    -   Snaží se nám zjednodušit danou práci, pro kterou je navržen
    -   Příklad: React se nám snaží zjednodušit práci s DOM, má předpřipravenou hromadu funkcí, reaktivitu atd..
    -   Řeší dost věcí za nás
-   Frontend: typicky část u uživatele, na webu HTML,CSS,JS
-   Backend: typicky část na serveru, u SvelteKitu JS, ale může to být C++/C#/Ruby/Python/Java/Go/Rust etc...
-   Na frontendu nalezneme Svelte
-   Na backendu pak unifikovaný JS/TS, který se pak zkopiluje na specifickou platformu pomocí adapéru:
    -   Node (node server)
    -   Cloudlare Workers,
    -   Vercel
    -   Static (statická stránka bez backendu) - stnější podmínky na routování

## Instalace

-   Buď přes oficiální nástroj:

```BASH
npx sv create
```

-   Nebo opět přes můj projekt:

```BASH
npm create @patrick115/app@latest
```

-   Je doporučeno zapnout rune mód, protože aktuálně je ještě support pro Svelte4, ale my chceme vynutit Svelte5
-   svelte.config.js

```js
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            '$/*': 'src/*'
        }
    },
    compilerOptions: {
        runes: true
    }
};

export default config;
```

## Co SvelteKit umí?

-   Folder based routování
-   SSR (Server Side Rendering)
-   Prerender
-   Preloading
-   ...

## Folder based routování

-   Hlavní soubor se nachází v src/app.html, zde nalezneme html tag, head, body atd...
-   Zbytek routů (cest) se nachází v src/routes/
-   V každé routě se můžeme setkat s několika typy souborů:
    -   .svelte - jedná se o soubor, který je spuštěn u klienta (případně SSR)
    -   .ts/.js - jedná se o soubor, který je spuštěn buď na serveru během SSR, nebo u klienta společně s .svelte souborem
    -   .server.ts/.server.js - jedná se o soubor, který je spuštěn pouze na serveru a může poslat data to .svelte souboru u klienta - ideální pro šahání do databáze/private envs etc..
-   Route může mít tyto soubory:

    -   +layout.svelte - Jedná se o nějaké rozhraní pro všechny vnořené podstránky (můžeme si zde vložit například navigaci, footer atd.. a to bude pak na všech podstránkách) - můžeme je vnořovat do sebe, renderuje se u klienta
    -   +layout.ts/js - spouští se společně s +layout.svelte
    -   +layout.server.ts/js - spoušťí se na serveru společně s +layout.svelte
    -   +page.svelte - Stránka u klienta
    -   +page.ts/js - Spouští se společně s +page.svelte
    -   +page.server.ts/js - Spouští se na serveru společně s +page.svelte
    -   +error.svelte - spouští se při erroru na stránce/v .ts/js souboru a hledá se nejblížší +error.svelte a ten se zobrazí. Při chybě v .server.ts/js se zobrazí defaultní +error.svelte v rootu
    -   +server.ts/js - Jedná se o soubor, který běží pouze na serveru. Dají se v něm reagovat na GET/POST/PUT/PATCH/DELETE metody (typicky API na endpointy)

-   Route může mít i prametry:
    -   src/routes/article/[id]/+page.svelte - Tato stránka se otevře při /article/4184, /article/čč++ atd.. parameter id poté dostaneme v proměnné params
    -   src/routes/article/[[id]]/+page.svelte - Tento parameter je optional, tedy se tato stránka otevře i při /article
    -   src/routes/article[...id]+page.svelte - tento parameter matchne všechno, tedy se tato stránka otevře i při /article/a/b/c/d/e nebo /article nebo /article/145
-   Routy můžeme groupovat:
    -   Pokud chceme například rozlišit stránky jinými layouty, například:
        -   /,/about,/idk a pak /admin,/admin/neco atd.., tak můžeme využít groups
    -   src/routes/(group)/... - groupy se neukazují v url, tedy
        -   src/routes/(group1)/admin/+page.svelte bude /admin
        -   src/soutes/(group2)/+page.svelte bude /
    -   tady mohu pak načítat jiné layouty, tedy admin/+page.svelte si vezme layout z (group1)/+layout.svelte a /+page.svelte si vezme layout z (group2)/+layut.svelte (samozřejmě obě budou v parent layoutu /+layout.svelte)
-   Přeskakování layoutů:
    -   Můžeme přeskakovat layouty u page a layout
    -   Dovoluje nám ve specifických případech přeskočit layout na jiný výše a ignorovat tak nějaký po cestě
    -   Mějme strukturu:
    ```
    src/routes/
    ├ (app)/
    │ ├ item/
    │ │ ├ [id]/
    │ │ │ ├ embed/
    │ │ │ │ └ +page.svelte
    │ │ │ └ +layout.svelte
    │ │ └ +layout.svelte
    │ └ +layout.svelte
    └ +layout.svelte
    ```
    -   Tady +page.svelte si postupně načte všechny layouty v sobě vnořené
    -   pokud chceme, aby +page.svelte například překočil na hlavní layout, použijeme: +page@.svelte
    -   Zde jsou všechny možné způsoby přeskočení:
        -   `+page@[id].svelte` - inherits from `src/routes/(app)/item/[id]/+layout.svelte`
        -   `+page@item.svelte` - inherits from `src/routes/(app)/item/+layout.svelte`
        -   `+page@(app).svelte` - inherits from `src/routes/(app)/+layout.svelte`
        -   `+page@.svelte` - inherits from `src/routes/+layout.svelte`
    -   To stejné jde i přímo s layoutem: +layout@.svelte...

### Svelte soubory:

-   Skládají se z 3 částí: HTML, CSS a JS
-   Objevují se tedy: <script></script>, <style></style> a potom HTML kolem
-   Můžeme používat speciální syntaxi v HTML:
    -   Výpis proměnné `{ variable }`, vloží tagu/na dané místo obsah proměnné. Zavolá na ní .toString(), tedy object: [object Object] musíme použít JSON.stringify
    -   Podmínky - můžeme vyrenderovat jiný obsah podle nějaké podmínky:
    ```SVELTE
    {#if variable > 50}
        <span>Super variable je {variable}</span>
    {:else if variable > 10}
        <span>Celkem ujde, variable je {vriable}</span>
    {:else}
        <span>Malé :/ {variable}</span>
    {/if}
    ```
    -   Cykly:
    ```SVELTE
    <script lang="ts">
        const array = ["Jablko", "Mandarinka", "Kiwi", "Pomeranč"]
    </script>
    <ul>
        {#each array as item/*, id*/}
            <li>{ item }</li>
        {/each}
    </ul
    </script>
    ```
    -   Await:
    ```SVELTE
    <script lang="ts">
        const promise = new Promise((resolve) => setTimeout(resolve, 5 * 1000));
    </script>
    {#await promise}
        čekáme
    {:then value}
        Dojelo, toto je undefined: {value}
    {/await}
    ```
    -   Key - přerenderuje obsah pokaždé, co se proměnná změní

## Pojďme si ukázat nějaké základy

-   Jak jsme si předtím říkali, tak výpis proměnné do HTML

```svelte
<script lang="ts">
    const name = 'Patrik';
    const age = 55;
</script>

<p>{name} - {age}</p>
```

-   Eventy

```svelte
<script lang="ts">
    const kliknulJsem = () => {
        console.log('click');
    };
</script>

<button onclick={kliknulJsem}>Ahoj</button>
```

-   Funguje i inline přístup:

```svelte
<button onclick={() => console.log('click')}>Ahoj</button>
```

-   Tip: pokud máme atribut a proměnnout/funkci se stejným jménem, můžeme použít toto:

```svelte
<script lang="ts">
    const onclick = () => {
        console.log('click');
    };
</script>

<button {onclick}>Ahoj</button>
```

-   Reaktivita:

```svelte
<script lang="ts">
    let counter = 5;
</script>

<button onclick={() => counter++}>{counter}</button>
```

-   Jak vidíme, nic se neděje, protože jsme neoznačili, ze proměnná counter je reaktivní, tak svelte ji nesleduje
-   Reálně se proměnná mění, ale nepřerenderuje její hodnotu v UI

```svelte
<script lang="ts">
    let counter = $state(5);
</script>

<button onclick={() => counter++}>{counter}</button>
```

-   Nyní jsme řekli, že proměnná counter je reaktivní, takže Svelte nyní bude akutalizovat jeji hodnotu v UI
