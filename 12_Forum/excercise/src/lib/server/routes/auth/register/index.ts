import type { ErrorList } from '$/lib/errors';
import { procedure } from '$/lib/server/api';
import { conn } from '$/lib/server/variables';
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { HASH_ROUNDS } from '$env/static/private';
import type { Response } from '$/types/response';

export default procedure.POST.input(
    z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string()
    })
).query(async ({ input }) => {
    const data = await conn
        .selectFrom('users')
        .select('id')
        .where((eb) => eb.or([eb('username', '=', input.username), eb('email', '=', input.email)]))
        .execute();

    if (data.length > 0) {
        return {
            status: false,
            code: 400,
            message: 'auth.register.invalid' satisfies ErrorList
        } satisfies ErrorApiResponse;
    }

    const hashed = bcrypt.hashSync(input.password, parseInt(HASH_ROUNDS));

    await conn
        .insertInto('users')
        .values({
            username: input.username,
            email: input.email,
            password: hashed
        })
        .execute();

    return {
        status: true
    } satisfies Response;
});
