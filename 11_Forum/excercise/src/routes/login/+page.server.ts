import { getUserState } from '$/lib/server/function';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ cookies }) => {
    const userState = getUserState(cookies);

    if (userState.logged) {
        redirect(302, '/');
    }
}) satisfies PageServerLoad;
