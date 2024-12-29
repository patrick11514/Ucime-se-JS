import type { Group, Users } from './database';

type FixId<$Data> = Omit<$Data, 'id'> & {
    id: number;
};

export type UserData = Omit<FixId<Users>, 'password'> & {
    groups: FixId<Group>[];
    permissions: string[];
};

export type UserState =
    | {
        logged: false;
    }
    | {
        logged: true;
        data: UserData;
    };
