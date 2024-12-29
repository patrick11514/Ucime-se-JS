import type { ErrorList } from '$/lib/errors';
import { procedure } from '$/lib/server/api';
import { conn, jwt } from '$/lib/server/variables';
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { COOKIE_EXPIRE } from '$env/static/private';
import type { Response, ResponseWithData } from '$/types/response';
import type { UserData } from '$/types/types';
import { getPermissions } from '$/lib/server/function';

export default procedure.POST.input(
    z.object({
        username: z.string(),
        password: z.string()
    })
).query(async ({ input, ev: { cookies } }) => {
    const data = await conn.selectFrom('users').selectAll().where('username', '=', input.username).executeTakeFirst();

    if (!data) {
        return {
            status: false,
            code: 400,
            message: 'auth.login.username' satisfies ErrorList
        } satisfies ErrorApiResponse;
    }

    if (!bcrypt.compareSync(input.password, data.password)) {
        return {
            status: false,
            code: 400,
            message: 'auth.login.password' satisfies ErrorList
        } satisfies ErrorApiResponse;
    }

    const userData = {
        ...data,
        password: undefined,
        ...(await getPermissions(data.id))
    };

    const cookie = jwt.setCookie(userData);
    cookies.set('session', cookie, {
        path: '/',
        maxAge: parseInt(COOKIE_EXPIRE) * 1000
    });

    return {
        status: true,
        data: userData
    } satisfies ResponseWithData<UserData>;
});
