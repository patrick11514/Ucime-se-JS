import { getUserState } from '$/lib/server/function';
import { Server } from '$/lib/server/server';
import type { LayoutServerLoad } from './$types';

export const load = (({ cookies }) => {
    return {
        api: Server.hydrateToClient(),
        userState: getUserState(cookies)
    };
}) satisfies LayoutServerLoad;
