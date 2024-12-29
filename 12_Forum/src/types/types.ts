import type { Users } from './database';

type FixId<$Data> = Omit<$Data, 'id'> & {
    id: number;
};

export type UserData = Omit<FixId<Users>, 'password'>;

export type UserState =
    | {
        logged: false;
    }
    | {
        logged: true;
        data: UserData;
    };
