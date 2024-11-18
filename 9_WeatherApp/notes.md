API: https://api.openweathermap.org/data/2.5/weather?q={city name}&lang={lang}&units={units}&appid={API key}

City: háčky, čárky, co nejvíce podrobně:

-   Ostava,CZ
-   Praha,CZ
-   Říčany,CZ

Language:

-   sq Albanian
-   af Afrikaans
-   ar Arabic
-   az Azerbaijani
-   eu Basque
-   be Belarusian
-   bg Bulgarian
-   ca Catalan
-   zh_cn Chinese Simplified
-   zh_tw Chinese Traditional
-   hr Croatian
-   cz Czech
-   da Danish
-   nl Dutch
-   en English
-   fi Finnish
-   fr French
-   gl Galician
-   de German
-   el Greek
-   he Hebrew
-   hi Hindi
-   hu Hungarian
-   is Icelandic
-   id Indonesian
-   it Italian
-   ja Japanese
-   kr Korean
-   ku Kurmanji (Kurdish)
-   la Latvian
-   lt Lithuanian
-   mk Macedonian
-   no Norwegian
-   fa Persian (Farsi)
-   pl Polish
-   pt Portuguese
-   pt_br Português Brasil
-   ro Romanian
-   ru Russian
-   sr Serbian
-   sk Slovak
-   sl Slovenian
-   sp, es Spanish
-   sv, se Swedish
-   th Thai
-   tr Turkish
-   ua, uk Ukrainian
-   vi Vietnamese
-   zu Zulu

Units:

-   standart - Kelviny, Metry/s
-   metric - Stupně C, Metry/s
-   imperial - Stupně F, Mile/s

Response:

-   Type: JSON
-   Data:
    -   coord:
        -   lon (float)
        -   lat (float)
    -   weather:
        -   []
            -   id: Id počasí (int)
            -   main: skupina: Rain,. Snow, Clouds... (string
            -   description: Popis (ideálně do appky) (string)
            -   icon: id ikony (string)
    -   main:
        -   temp: teplota (float)
        -   feels_like: pocitova teplota (float)
        -   pressure: tlak (float)
        -   humidity: vlhkost v % (int)
        -   temp_min: minimální teplota v místě (float)
        -   temp_max: maximáln teplota v místě (float)
        -   sea_level: tlak na úrovni moře (int)
        -   grnd_level: tlak na povrchu (int)
    -   visibility: Viditelnost v m (max 10km - 10000) (int)
    -   wind:
        -   speed: rychlost věrtu (float)
        -   deg: směr větru ve stupních (int)
    -   dt: data kalkulace (unix timestamp UTC - int)
    -   clouds:
        -   all: procentuální oblačnost v % (int)
    -   sys:
        -   country: kód země (string)
        -   sunrise: čas, kdy svítá (unix timestamp UTC - int)
        -   sunset: čas, kdy zapadá slunce (unix timestamp v UTC - int )
