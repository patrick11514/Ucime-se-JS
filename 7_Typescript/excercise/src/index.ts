let a: number = 10;
let b: string = 'Ahoj';
let c: object = { name: 'John', age: 30 };
let d: boolean = true;
let e: null = null;
let f: undefined = undefined;
let g: void;
let h: unknown = 'Hello';
let i: any = 10;

let obj: {
    name: string;
    age: number;
};

obj = {
    name: 'patrik',
    age: 10
};

//obj.name = 10;

let ahoj: string | number = 'ahoj';
ahoj = 10;
//ahoj = true;

let response = {
    status: true,
    data: 'Jsi cool'
} as
    | {
          status: true;
          data: string;
      }
    | {
          status: false;
          message: string;
      };

//response = {
//    status: true,
//    data: "Jsi cool"
//}
//
//response  = {
//    status: false,
//    message: "Nastala chyba"
//}

//response  = {
//    status: false,
//    data: "Nastala chyba"
//}

//if (response.status === true) {
//    response
//} else {
//    response.data
//}

function neco(arg1: string, arg2: number): string {
    return arg1 + arg2;
}

const neco2 = (arg1: string, arg2: number): string => {
    return arg1 + arg2;
};

//

//const prom: mytype = "neco"
//const prom: MyType = "neco"

type StringOrNumber = string | number;

let zz: StringOrNumber = 'ahoj';
zz = 10;
//z = true;

//

let superText: 'ahoj' | 'cau';
superText = 'ahoj';
superText = 'cau';
//superText = "neco jineho"

//

const za = {
    name: 'Patrik',
    age: 22
};

type TypeOfZA = typeof za;

const zb: typeof za = {
    name: 'ahoj',
    age: 20
};

//as / satisfies

response = {} as typeof response;

console.log(response.status);

//XMLSerializer as XMLHttpRequest
//"ahoj" as number
//XMLSerializer as any as XMLHttpRequest
//"ahoj" as any as number

const getDataFromApi = async (url: string): Promise<unknown> => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const getDataFromApiANY = async (url: string): Promise<any> => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

//const apiReturn =  z.object({
//    status: z.boolean()
//})
//
//;(async () => {
//    const data = await getDataFromApi("")
//
//    const result = apiReturn.parse(data);
//
//    if (result.status === true) {
//
//    }
//
//    const data2 = await getDataFromApiANY("")
//
//    if (data2.status === true) {
//
//    }
//})()

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
//const correctStatus = {
//    status: false,
//    message: "ah",
//    data: 'Ahoj',
//} as Status;
//
//correctStatus.data;
//
//
//const correctStatus2 = {
//    status: true,
//    data: 'Ahoj',
//    message: "ahoj"
//} satisfies Status;
//
//correctStatus2.data;

//type StringNumber = `${string}-${number}`;
//'ahoj' satisfies StringNumber;
//'ahoj-123' satisfies StringNumber;
//'123' satisfies StringNumber;

//type StringNumber2 = `${string}${number}`
//"ahoj" satisfies StringNumber
//"ahoj-123" satisfies StringNumber2
//"123" satisfies StringNumber2

type Color = 'orange' | 'yellow' | 'purple' | 'gray' | 'red';
type Intenzity = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type TextColor = `text-${Color}-${Intenzity}`;
//
//let color: TextColor = "text-purple-500"
//color = "text-gray-750"
//
//type NumberWith1 = `${number}1`
//let num: NumberWith1 = "1041856185961896118596"

type MyCoolType<T> = T;

let string = 'Ahoj' satisfies MyCoolType<string>;
let string2: MyCoolType<string> = 'Ahoj';
let number: MyCoolType<number> = 10;

type GenericStatus<T> =
    | {
          ///union začínající na novém řádku, typicky nepíšeme, ale formatter za nás udělá, tedy je to validní kód
          status: true; // pokud status je true
          data: T; // tak bude object obsahovat data typu string
      }
    | {
          status: false; // pokud je ale status false
          message: string; // tak bude object obsahovat message typu string
      };

//type aa = GenericStatus<any>
//type aa = GenericStatus<string>
//type aa = GenericStatus<{
//    name: string;
//    age: number;
//}>

//const stringArray: Array<string> = ["Ahoj", "jak", "se", "mas"/*, 10*/]
//const stringArray2: string[] = ["Ahoj", "jak", "se", "mas"/*, 10*/]
//
//const promise = new Promise<string>((resolve, reject) => {
//    resolve(10);
//    resolve("ahoj");
//})

function makeArray<T>(item: T): T[] {
    return [item];
}

const makeArray2 = <T>(item: T): T[] => {
    return [item];
};

const gdfgsndj = makeArray<string>('ahoj');

type Wrapper<T extends string | number> = T;

type gsdgsd = Wrapper<string>;
type gsdgsd2 = Wrapper<number>;
//type gsdgsd3 = Wrapper<boolean>;

type NumberForType<T> = T extends string ? 69 : 123;
type NumberForType2<T> = T extends string ? number : unknown;

type gdfgdf = NumberForType<number>;
type gdfgdf2 = NumberForType<string>;
type gdfgd2f = NumberForType2<number>;
type gdfgd2f2 = NumberForType2<string>;

///

type OnlyString<T> = T extends string ? T : never;

let onlyString: OnlyString<string> = 'ahojk';
//let onlyString2: OnlyString<number> = "gsdgsd";

///

type RandomUnion = string | number;
type RandomUnion2 = boolean | undefined;
type RandomNonUnion = string;

type FilterType<T> = T extends string ? T : never;

type Filtered = FilterType<RandomUnion>;
type Filtered2 = FilterType<RandomUnion2>;
type Filtered3 = FilterType<RandomNonUnion>;

//

const obj123 = {
    name: 'Patrik',
    age: 22
} as const;

//obj123.name = "ahoj"

const obj1234 = {
    name: 'Patrik',
    age: 22
};
obj1234.name = 'pepa';

const CONFIG = {
    ip: '10.10.10.223',
    port: 4585
} as const;

CONFIG.ip;

///

const persons = [
    {
        name: 'Patrik',
        age: 22,
        alive: true
    },
    {
        name: 'Elon',
        age: 52,
        alive: false
    },
    {
        name: 'Joseph',
        age: 12,
        alive: true
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

type Tuple = [number, string, boolean, undefined];

//const tuple: Tuple = [10, "ahoj", 10, undefined]

class ValueWrapper<$Type> {
    constructor(private value: $Type) {}

    setValue(newValue: $Type) {
        this.value = newValue;
    }

    getValue(): $Type {
        return this.value;
    }
}

const str = new ValueWrapper('Ahoj');
const result = str.getValue();
str.setValue('aaaa' /*10*/);

///

const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

const result1 = isString('Ahoj');
const result2 = isString(10);

let unknown: unknown;

if (isString(unknown)) {
    unknown;
} else {
    unknown;
}

const isTWColor = (value: unknown): value is TextColor => {
    if (typeof value !== 'string') return false;
    const splited = value.split('-');
    if (splited[0] !== 'text') return false;
    if (!['orange', 'yellow', 'purple', 'gray', 'red'].includes(splited[1])) return false;
    const lastNum = parseInt(splited[2]);
    if (isNaN(lastNum)) return false;
    if (![50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].includes(lastNum)) return false;
    return true;
};

let maybeColor: unknown = 'text-gray-500';

if (isTWColor(maybeColor)) {
    console.log(maybeColor);
}
