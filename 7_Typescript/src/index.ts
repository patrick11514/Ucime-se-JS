import Logger from './lib/logger';
//logger for main messages
const l = new Logger('MyCoolApp', 'cyan');

//Default types
{
    let a: number;
    let b: string;
    let c: object;
    let d: undefined;
    let e: null;
    let f: boolean;
    let g: void;
}

//Objec typing

let obj: {
    name: string; // na konci řádku s typem se dává středník!! ne čárka
    age: number;
};

obj = {
    name: 'Patrik',
    age: 22
};

obj.name = 10; // ERROR

//Union

let a: number | string;
a = 10; //OK
a = 'text'; //OK
a = true; //ERROR

//Union Object typing

let status:
    | {
        status: true; // pokud status je true
        data: string; // tak bude object obsahovat data typu string
    }
    | {
        status: false; // pokud je ale status false
        message: string; // tak bude object obsahovat message typu string
    };

status = {
    status: true,
    data: 'Data'
};

status = {
    status: false,
    message: 'Error'
};

status = {
    status: true,
    message: 'AAA' // ERROR
};

if (status.status === true) {
    //tady to vstoupí pouze, když fakt property status na objektu status bude true,tedy typescript hned ví, že na objektu bude očekávat property data
    console.log(status.data); // OK
    console.log(status.message); // ERROR
} else {
    console.log(status.data); // ERROR
}

//FUNKCE

//normální funkce
function neco(argument1: string, argument2: number, argument3?: boolean): string {
    return argument1;
}

//arrow funkce
const neco2 = (argument1: string, argument2: number, argument3?: boolean): string => {
    return argument1;
};

//Custom types

{
    type StringOrNumber = string | number;
    //použití typu
    let a: StringOrNumber = 10;
    a = 'Ahoj';
    a = true; //ERROR

    let superText: 'ahoj' | 'cau';
    superText = 'ahoj'; //OK
    superText = 'cau'; //OK
    superText = 'neco jinyho'; //ERROR
}

//AS

{
    const a: number = 'Ahoj' as number; //říkáme, že string "Ahoj" je number a vše proběhne v pohodě
}

XMLSerializer as XMLHttpRequest; // ERROR
XMLSerializer as any as XMLHttpRequest; // OK, ale není to dobrý nápad :D

JSON.parse('');

let aa: any;
aa.ahoj; // OK
let bb: unknown;
bb.ahoj; // ERROR: bb is type unknown, tedy nás varuje, že nevíme co tam bude a proto není dobré šahat na .ahoj

if (typeof bb === 'string') {
    bb;
}

//satisfies
type Status =
    | {
        ///union začínající na novém řádku, typicky nepíšeme, ale formatter za nás udělá, tedy je to validní kód
        status: true; // pokud status je true
        data: string; // tak bude object obsahovat data typu string
    }
    | {
        status: false; // pokud je ale status false
        message: string; // tak bude object obsahovat message typu string
    };
const correctStatus = {
    status: true,
    data: 'Ahoj'
} as Status;

correctStatus.data; //Error, protože typescript neví, jestli je status true/false

const correctStatus2 = {
    status: true,
    data: 'Ahoj'
} satisfies Status;

correctStatus2.data; // OK

let anotherStatus = {
    status: false,
    message: 'Jsme cooked'
} satisfies Status;

anotherStatus.aa = 'ahoj';
anotherStatus.status = true; // Porušili jsme typ Status, ale tím Že anotherStatus není typ status, tak to neřeší

///Back to custom types

type StringNumber = `${string}-${number}`; // tady pracujeme na typové úrovni, takže do ${} dáváme typy

'ahoj' satisfies StringNumber; ///Error
'ahoj-123' satisfies StringNumber; //Ok
'456' satisfies StringNumber; //Error

{
    type Color = 'orange' | 'yellow' | 'purple' | 'gray' | 'red'; //stačí nám takto

    type Intensity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

    type TextColor = `text-${Color}-${Intensity}`; // tento typ nyní má všechny kombinace text-orange-50 text-orange-100, text-yellow-950....
    let color: TextColor = 'text-red-500'; //OK
    color = 'text-gray-50'; // Dokonce máme syntax highligting :)
    color = 'text-'; //Error
}

//Generics

type Wrapper<T extends string | number> = T;
let zz1: Wrapper<string>; //OK
let zz2: Wrapper<number>; //OK
let zz3: Wrapper<boolean>; //ERROR

///

type NumberForType<T> = T extends string ? 69 : 123;
let zz4: NumberForType<'ahoj'>;

const array1: Array<string> = [];
const array2: string[] = [];

const promise = new Promise<string>((resolve, reject) => {
    resolve(10); //Error
    resolve('OK'); //OK
});

///

let ccc: never;

{
    type OnlyString<T> = T extends string ? T : never;

    let onlyString: OnlyString<string>; //string
    let onlyNumber: OnlyString<number>; //never
}

{
    type RandomUnion = string | number;
    type RandomUnion2 = boolean | undefined;
    type RandomNonUnion = string;

    type FilterString<T> = T extends string ? T : never; //když to je string, vrať T, jinak never

    type Filtered = FilterString<RandomUnion>; //string
    type Filtered2 = FilterString<RandomUnion2>; //never
    type Filtered3 = FilterString<RandomNonUnion>; //string
}

{
    const obj = {
        name: 'Patrik',
        age: 22
    } as const;

    obj.name = 'Idk'; //Error property is readonly
}

const persons = [
    {
        name: 'Patrik',
        age: 22
    },
    {
        name: 'Elon',
        age: 52
    },
    {
        name: 'Joseph',
        age: 12
    }
] as const;

//Create arrays of same properties
//for this case:
//1. with all names
//2. with all ages

type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P]; // Handles arrays and objects
};

type MutableObject<T> = {
    -readonly [K in keyof T]: T[K] extends readonly [infer U, ...infer Rest] // Check if it's a readonly tuple
    ? [U, ...Rest] // Keep the tuple type intact but remove readonly
    : T[K] extends ReadonlyArray<infer U> // Check if it's a readonly array (not tuple)
    ? U[] // Convert to a mutable array
    : T[K]; // Keep other types as they are
};

type MakeTuples<T extends readonly Record<string, any>[]> = MutableObject<{
    [K in keyof T[number]]: Mutable<{ [I in keyof T]: T[I][K] }>;
}>;

type AA = MakeTuples<typeof persons>;

///IS

const isString = (value: unknown): value is string => {
    /// Tady říkáme, že to vrátí true, pokud T je string, ale jen na typové úrovni
    return typeof value === 'string'; /// tady to kontrolujeme již na úrovní kódu
};

//toto se hodí například v ifech

let unknown: unknown = 10;

if (isString(unknown)) {
    console.log(unknown); // tady je typ unknown string
}

if (typeof unknown === 'string') {
    console.log(unknown); // taky string, ale kdysi to typescript neuměl
}
