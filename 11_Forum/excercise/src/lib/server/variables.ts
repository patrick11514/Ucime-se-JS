import type { DB } from '$/types/database';
import { DATABASE_IP, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, JWT_TOKEN } from '$env/static/private';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { JWTCookies } from './cookies/main';

const dialect = new MysqlDialect({
    //@ts-ignore
    pool: createPool({
        host: DATABASE_IP,
        port: parseInt(DATABASE_PORT),
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    })
});

export const conn = new Kysely<DB>({
    dialect
});

export const jwt = new JWTCookies(JWT_TOKEN);
