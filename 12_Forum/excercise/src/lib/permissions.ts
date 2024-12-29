import type { UserState } from '$/types/types';

type SubGroup = `${string}.${string}`;
export type Permission = `${SubGroup}.${string}`;

const isPermission = (perm: string): perm is Permission => {
    return perm.split('.').length === 3;
};

export class Permissions {
    private permissions = [] as Permission[];

    constructor(userState: UserState) {
        if (!userState.logged) {
            return;
        }

        this.permissions = userState.data.permissions.filter(isPermission);
    }

    hasPermission(permission: Permission) {
        return this.permissions.includes(permission);
    }

    isInSubGroup(subGroup: SubGroup) {
        return this.permissions.map((permission) => permission.split('.', 2).join('.')).includes(subGroup);
    }

    isInGroup(group: string) {
        return this.permissions.map((permission) => permission.split('.')[0]).includes(group);
    }
}
