import { loggedProcedure } from '$/lib/server/api';
import type { Response } from '$/types/response';

export default loggedProcedure.GET.query(async ({ ev: { cookies } }) => {
    cookies.delete('session', {
        path: '/'
    });

    return {
        status: true
    } satisfies Response;
});
