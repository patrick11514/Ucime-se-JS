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
