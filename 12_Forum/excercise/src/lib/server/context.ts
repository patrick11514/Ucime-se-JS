import type { AsyncReturnType, CreateContext } from '@patrick115/sveltekitapi';
import { getUserState } from './function';

export const context = (async ({ cookies }) => {
    return getUserState(cookies); // Here you can put your context
}) satisfies CreateContext;

export type Context = AsyncReturnType<typeof context>;
