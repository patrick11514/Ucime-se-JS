import { getUserState } from '$/lib/server/function';
import permissions from '$/lib/server/routes/permissions';
import { Server } from '$/lib/server/server';
import type { LayoutServerLoad } from './$types';

export const load = (async (ev) => {
    return {
        api: Server.hydrateToClient(),
        userState: getUserState(ev.cookies),
        permissions: await Server.ssr.permissions(ev)
    };
}) satisfies LayoutServerLoad;
