import { getUserState } from '$/lib/server/function';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Permissions } from '$/lib/permissions';

export const load = (async ({ cookies }) => {
    const userState = getUserState(cookies);
    if (!userState.logged) {
        redirect(302, '/');
    }

    const permissions = new Permissions(userState);

    if (!permissions.isInGroup('admin')) {
        redirect(302, '/');
    }
}) satisfies LayoutServerLoad;
