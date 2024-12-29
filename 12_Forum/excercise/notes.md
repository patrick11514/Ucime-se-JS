# Forum #3

- Fixnutí generování errorů
  TODO: - Změna statu z writable na něco jinýho
- Práce s query parametrama -> pokud klikneme na přihlásit odněkud, tak se uloží, kde jsme byli a poté nás to přesměruje zpátky

## Permisse

budou rozděleny na:
část.podčást.permisse
ukázka:

- moderation.ban.create
- moderation.ban.remove
- admin.settings.update

V databázi pak budeme mít něco takového:

```
+-------------------------+           +-------------------------+
|          users          |           |           group         |
+-------------------------+           +-------------------------+
| id           INT PK     |           | id           INT PK     |
| username     VARCHAR(25)|           | name         VARCHAR(25)|
| email        VARCHAR(50)|           | bg_color     VARCHAR(7) |
| password     VARCHAR(60)|           | text_color   VARCHAR(7) |
+-------------------------+           +-------------------------+
         |                                  |
         |                                  |
         +------------------------------+   |
                                        |   |
           +-----------------------+    |   |
           |      user_group       |    |   |
           +-----------------------+    |   |
           | user_id       INT FK  | <--+   |
           | group_id      INT FK  | <------+-------+
           +-----------------------+                |
                                                    |
           +-----------------------------------+    |
           |        group_permissions          |    |
           +-----------------------------------+    |
           | group_id      INT      FK  PK     | <--+
           | permission    VARCHAR(255) PK     |
           +-----------------------------------+

```

- U každého uživatele navíc bude teda seznam oprávnění + group
- Bylo by dobré, aby se tyto informace pravidelně aktualizovali:

    - Dokážeme pořešit případ odhlášení
    - Permise budou vždy aktuální

- po loginu získat (funkce)
- endpoint pro získání jen groupy a funkcí
- onMount setInterval -> získávání
- onUnmount -> removeinterval
- třída Permissions -> constructor userData:
    - Check permissí
- Nový procedure template který bude checkovat právě permisse
- Static/exporty vždy specifického setu permissí/bitové ory?? idk teď
- Pořešit nějaké ukázání erroru/redirect?
- Ukázka jak to bude fungovat
