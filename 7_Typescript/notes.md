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
