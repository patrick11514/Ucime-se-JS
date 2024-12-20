export const ERRORS = {
    auth: {
        register: {
            invalid: 'Username of email already used'
        },
        login: {
            username: 'Invalid username',
            password: 'Invalid password'
        }
    }
} as const;

type FilterKey<$key extends string | symbol | number> = $key extends string ? $key : never;
type FilterValue<$value> = $value extends string | { [key: string]: string } ? $value : never;
type Append<$base extends string, $key extends string, $value extends string | { [key: string]: string }> = $value extends string
    ? `${$base}.${$key}`
    : Append<`${$base}.${$key}`, FilterKey<keyof $value>, FilterValue<$value[keyof $value]>>;
type Base<$key extends string, $value extends string | { [key: string]: unknown }> = Append<`${$key}`, FilterKey<keyof $value>, FilterValue<$value[keyof $value]>>;

export type ErrorList = Base<keyof typeof ERRORS, (typeof ERRORS)[keyof typeof ERRORS]>;

export const extractError = (error: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let base = ERRORS as any;
    error.split('.').forEach((key) => {
        if (key in base) {
            base = base[key];
        }
        return '';
    });

    return base;
};

export const matchError = (error: string, errorToMatch: ErrorList): error is typeof errorToMatch => {
    return error === errorToMatch;
};
