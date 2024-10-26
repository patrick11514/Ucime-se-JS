# Úkol 3 - DOM

### Užitečné odkazy:

-   [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
-   [el.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
-   [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
-   [addEventListener("click",...)](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) + [ev.currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)

Vytvořte jednoduchý TODO List, pomocí templatu [zde](LINK). Ten si **stáhněte** a pište kód **pouze do main.js** souboru.

Důležité poznámky:

-   Úkol se bude psát do inputu, který bude jediný na stránce, poté se klikne na tlačítko **Add Task** a úkol se přidá dolů do `<div id="tasks" class="vertical"></div>`
-   Jak bude vypadat struktura po přidání tasku:

```HTML
<div id="tasks" class="vertical">
    <div class="item">
        <h4>První task</h4>
        <button>X</button>
    </div>
    <div class="item">
        <h4>Druhý task</h4>
        <button>X</button>
    </div>
    <!--Další tasky....-->
</div>
```

-   Každý task v HTML teda bude div s třídou **item**, ve kterém bude **h4** element s textem tasku, který byl zadán do inputu. Dále vedle tohoto h4 bude button s textem **X**.
-   Input po kliknutí na tlačítko **Add Task** se musí vyprázdnit.
-   Po kliknutí na tlačítko **X** se daný task smaže.
-   Ukázka [zde](LINK VIDEO)

# Bonus

### Užitečné odkazy:

-   [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

-   Aktuálně když stránku refreshneme, tak se nam naše tásky smažou, protože jak jsme si říkali DOM je pouze v paměti.
-   Přidejte možnost tasky uložit do localStorage a poté je při otevření stránky zase načíst.
-   Ukázka [zde](LINK VIDEO)
