import { Server } from '$/lib/server/server';
import type { LayoutServerLoad } from './$types';

export const load = (() => {
    return {
        api: Server.hydrateToClient()
    };
}) satisfies LayoutServerLoad;
