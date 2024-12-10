# Modularizace

- Rozdělení kódu do více souborů (celků) pro lepší orientaci
- V NodeJS pomocí modulů
- Primárním účelem je:
    - Udělat kód přehlednější (menší soubory)
    - Zamezit duplicitě kódu (můžeme kód vkládat - importovat do více různých souborů)
    - Vytvářet logické celky pohromadě
- Na vkládání se primárně používá require (typicky v JS souborech)
- Nyní se spíše používá import (novodobější vkládání) (typicky s typescriptem/custom build systémama)

## Export

- Každý soubor může (ale nemusí) dávat na vnějšek svůj kód
- Typicky je každý soubor sám o sobě oddělený (narozdíl od webu)
- Když chceme právě dostat takto nějaký kód ven ze souboru, použijeme právě export
- Můžeme exportovat: funkce, proměnné, typy, třídy...
- Export jedné exportovatelné položky

```ts
export const NAME = 'Patrik';
```

- Tímto kódem říkáme, že chceme z tohoto souboru exportovat (dát na venek) proměnnou NAME)
- Tento export je v podstatě pojmenovaný, tedy přímo říkáme, že exporujeme pod jménem "NAME" string s "Patrik"
- Jsou i tzv defaultní exporty, kdy exportujeme něco jako výchozí export a ten v základu pojmenovaný není:

```ts
export default 'AHOJ';
```

## Import

- Nyní si ukážeme, jak importovat z nějakých souborů
- Když chceme importnout daný export (proměnnou, funkci...), tak použijeme:

```ts
import { NAME } from 'soubor';
```

- Tímto říkáme, ze souboru (nepíšeme přípony) importni proměnnou NAME, což je proměnná, co jsme exportovali výše
- Nyní máme proměnnou NAME a tu můžeme třeba vypsat
- Pozor, do exportů nemůžeme napřímo zapisovat, tedy nemůžeme udělat `NAME = "Květoslav";`
- Teď přichází import default importu, ten si můžeme v podstatě pojmenovat a funguje to takto:

```ts
import jmeno from 'soubor';
```

- Tím říkáme, že defaultní export si ukládáme do proměnné jmeno
- Opět se jedná o import, takže ho nemůžeme upravovat
- Samozřejmě můžeme exportnout třeba object, do kterého půjde zapisovat, protože export bude v podstatě jen adresa paměti, kde se object (nebo třeba i array, třída atd..) nachází (viz asi 1/2 hodina)
- Pokud chceme importovat všechno ze souboru a neobsahuje default export, tak můžeme použít `import * as`:

```ts
import * as jmeno from 'soubor';
```

- To nám všechno exportované ze souboru dá pod proměnnou jméno
- Tedy v prvním případě budeme pro NAME přistupovat pomécí jmeno.NAME atd..
- Dokonce můžeme export default a klasické pojmenované exporty kombinovat:

```ts
export function sum(...nums: number[]) {
    return nums.reduce((a, b) => a + b, 0);
}

export default {
    name: 'File with super cool function',
    description: 'Some description',
    cat: true,
    andromeda: 'approaching'
};
```

```ts
import DEFAULT, { sum } from 'soubor';
```

- nyní v proměnné DEFAULT máme defaultní export a sum jsme si importovali zvlášť
- fun fact: importy jsou i awaitovat a importovat dynamicky:

```ts
async function load(path: string) {
    return await import(path);
}
const default = await load("/proc/cpuinfo");
```

- tímto dynamicky za běhu naimportujeme soubor z cesty

## Type importy

- V případě typescriptu se hodí importovat pouze třeba typy, u nich se používá prefix type, buď pro všechny, nebo pro jeden specifický:

```ts
export type CoolType = `COOL ${string}`;
export type Number<$Num> = $Num;
```

```ts
import type { CoolType, Number } from 'soubor';
```

- Případně pouze pokud chceme jeden typ mezi normálníma importama:

```ts
type PokemonType = 'Grass' | 'Fire' | 'Hypnotic' | 'Void' | 'Water';
export type Pokemon<$Name, $Type extends PokemonType> = {
    name: $Name;
    type: $Type;
};

export const getPokemon = <$Name extends string, $Type extends PokemonType>(name: $Name, type: $Type): Pokemon<$Name, $Type> => {
    return {
        name,
        type
    };
};
```

```ts
import { getPokemon, type PokemonType } from 'soubor';
```
