## Proměnné

-   Máme deklarované a definované proměnné
-   Deklarovaná proměnná je proměnná, která nemá přiřazenou hodnotu
-   Definovaná proměnná je proměnná, která má přiřazenou hodnotu
-   Proměnné můžeme deklarovat a definovat v jednom kroku
-   Proměnné můžeme deklarovat a definovat v různých krocích
-   Var je globální, tedy může být použita v jakémkoliv místě programu
-   Let je lokální, tedy může být použita pouze v rámci bloku, ve kterém byla definována
-   Konstanty jsou proměnné, které nelze měnit a musí být na začátku definovány

## Datové typy

-   Číslo, lze do něho ukládat čísla, jak celá, tak záporná, tak desetinná
-   Minimální hodnota je -(2^53 - 1) a maximální hodnota je 2^53 - 1
-   String, lze do něho ukládat text
-   Boolean, lze do něho ukládat true nebo false, kdy true je 1 a false je 0
-   Pole - lze do něho ukládat více hodnot, které jsou odděleny čárkou, do proměnné se ale ukládá pouze adresa v paměti, která ukazuje na první hodnotu v poli
-   Tedy pokud změníme hodnotu v poli, tak se změní hodnota všech proměnných, které ukazují na toto pole
-   Pole může být jak homogenní, tak heterogenní
-   Indexování probíhá od 0, protože se jedná o adresu v paměti a probíhá zde "pointerová" aritmetika - ukázka z Cčka
-   Pole lze interpetovat jak frontu (queue), tak i jako zásobník (stack), později si ukážeme metody nad polem
-   Objekt - lze do něho ukládat více hodnot, vždy se ukládají ve formátu key: value, tedy key-value pair, implementačně se jedná o hash tabulku (hash table), kde klíč je vždy unikátní, hodnota může být duplicitní
-   Do objektu lze ukládat jakékoliv hodnoty, tedy i pole nebo objekt
-   Lze do objektu přidávat i metody, které umí pracovat s daty v daném objektu
-   Null hodnota - lze do něho ukládat pouze null, tedy žádnou hodnotu
-   Undefined hodnota - lze do něho ukládat pouze undefined, tedy žádnou hodnotu, deklarované proměnné mají v základu hodnotu undefined
-   Získávání hodnoty z objektu probíhá pomocí tečkové notace, tedy objekt.key, nebo pomocí hranaté závorky, stejně jako pole, ale do hranatých závorek vkládáme klíč, tedy objekt["key"]
-   Při vytváření objektu lze použít i jako klíč hodnotu, když ji dáme do hranatých závorek, tedy: {[key]: value}

## Operátory

-   Sčítání - sečte dvě čísla, případně v případě stringů je spojí dohromady
-   Implicitní konverze - pokud se sčítá číslo a string, tak se číslo převede na string
-   Odečítání - odečte dvě čísla
-   Pokud chci odečítat string od čísla a naopak, tak se string pokusí převést na číslo
-   Násobení - vynásobí dvě čísla
-   Dělení - vydělí dvě čísla
-   Modulo - vydělí dvě čísla a vrátí zbytek po dělení

## Porovnávací operátory

-   Vrací vždy boolean hodnotu, tedy true nebo false
-   == - porovná hodnoty, tedy 1 == "1" je true
-   === - porovná hodnoty a typy, tedy 1 === "1" je false
-   != - porovná hodnoty, tedy 1 != "1" je false
-   !== - porovná hodnoty a typy, tedy 1 !== "1" je true
-   \> - větší než
-   < - menší než
-   \>= - větší nebo rovno
-   <= - menší nebo rovno
-   Pozor na implicitní konverzi, tedy pokud například chci porovnat, zda 0 == false, tak to bude true, protože se číslo převede na boolean hodnotu, která je false

## Logické operátory

-   Vrací vždy boolean hodnotu, tedy true nebo false
-   && - logický součin, tedy true && true je true, ostatní je false
-   || - logický součet, tedy false || false je false, ostatní je true
-   ! - negace, tedy !true je false a !false je true
-   Ohledně implcitní konverze nahoře, tak je důležité, že když chci kontrolovat, zda například v proměnné je null, nebo undefined, tak pokud dám if(!promenna), tak tento if se provede i v případě, když v proměnné je číslo 0, nebo prázdný string, tedy vše, co se převede na false a ! pak zneguje na true, proto v těchto případech je důležité používat například if (promenna === null), nebo if (promenna === undefined)

## Podmínky

-   If - else if - else
-   Switch - case - default
-   Ternární operátor - podmínka ? true : false
-   zkrácení pro if - else

## Cykly

-   For
-   For - Of -> foreach
-   For - In -> foreach ale na indexech, lze použít i na objektu
-   While
-   Do - while
