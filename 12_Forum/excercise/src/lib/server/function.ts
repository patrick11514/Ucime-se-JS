import type { UserData, UserState } from '$/types/types';
import type { Cookies } from '@sveltejs/kit';
import { conn, jwt } from './variables';

export const getUserState = (cookies: Cookies): UserState => {
    const cookie = cookies.get('session');
    if (!cookie) {
        return {
            logged: false
        };
    }

    const data = jwt.getCookie<UserData>(cookie);

    if (!data) {
        return {
            logged: false
        };
    }

    return {
        logged: true,
        data
    };
};

export const getPermissions = async (userId: number) => {
    const userGroups = await conn.selectFrom('user_group').selectAll().where('user_id', '=', userId).execute();
    if (userGroups.length == 0) {
        return {
            groups: [],
            permissions: []
        };
    }

    const permissions = await conn
        .selectFrom('group_permission')
        .selectAll()
        .where((eb) => eb.or(userGroups.map((group) => eb('group_id', '=', group.group_id))))
        .execute();

    const groups = await conn
        .selectFrom('group')
        .selectAll()
        .where((eb) => eb.or(userGroups.map((group) => eb('id', '=', group.group_id))))
        .execute();

    return {
        groups: groups,
        permissions: permissions.map((permission) => permission.permission)
    };
};
