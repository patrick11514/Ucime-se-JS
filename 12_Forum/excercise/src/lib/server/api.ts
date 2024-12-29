import { APICreate, MiddleWareError } from '@patrick115/sveltekitapi';
import type { Context } from './context';
import { Permissions, type Permission } from '../permissions';

export const api = new APICreate<Context>();

export const router = api.router;
export const procedure = api.procedure;
export const loggedProcedure = procedure.use(async ({ ctx, next }) => {
    if (!ctx.logged) {
        throw new MiddleWareError({
            status: false,
            code: 401,
            message: 'Unauthorized'
        });
    }

    return next(ctx.data);
});
export const permissionProcedure = (permissions: Permission[]) => {
    return loggedProcedure.use(async ({ ctx, next }) => {
        const _permissions = new Permissions({
            logged: true,
            data: ctx
        });

        if (permissions.some((perm) => !_permissions.hasPermission(perm))) {
            throw new MiddleWareError({
                status: false,
                code: 401,
                message: "You don't have permissions to do this"
            });
        }

        return next();
    });
};
