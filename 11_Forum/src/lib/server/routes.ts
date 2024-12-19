import { z } from 'zod';
import { procedure, router } from './api';
import { conn } from './variables';
import type { ErrorApiResponse } from '@patrick115/sveltekitapi';
import bcrypt from 'bcrypt';
import { HASH_ROUNDS } from '$env/static/private';
import type { Response } from '$/types/response';

export const r = router({
    auth: {
        register: procedure.POST.input(
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
                    message: 'Username or Email already used'
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
        })
    }
});

export type AppRouter = typeof r;
