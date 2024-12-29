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

// Recursive helper to traverse the object and build paths
type ExtractPaths<$CurrentObject, $Path extends string = ''> = $CurrentObject extends string
    ? $Path // If T is a string, return the accumulated path
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $CurrentObject extends Record<string, any>
    ? {
        [K in keyof $CurrentObject]: ExtractPaths<$CurrentObject[K], `${$Path}${$Path extends '' ? '' : '.'}${K & string}`>;
    }[keyof $CurrentObject] // Recurse into object keys
    : never;

// Final type
export type ErrorList = ExtractPaths<typeof ERRORS>;

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
