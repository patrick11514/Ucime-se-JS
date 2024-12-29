import { loggedProcedure } from '$/lib/server/api';
import { getPermissions } from '$/lib/server/function';
import type { ResponseWithData } from '$/types/response';
import type { UserData } from '$/types/types';
import { COOKIE_EXPIRE } from '$env/static/private';
import { jwt } from '../../variables';

export default loggedProcedure.GET.query(async ({ ctx, ev: { cookies } }) => {
    const userPermission = await getPermissions(ctx.id);

    const userData = {
        ...ctx,
        ...userPermission
    } satisfies UserData;

    const cookie = jwt.setCookie(userData);
    cookies.set('session', cookie, {
        path: '/',
        maxAge: parseInt(COOKIE_EXPIRE)
    });

    return {
        status: true,
        data: userData
    } satisfies ResponseWithData<UserData>;
});
