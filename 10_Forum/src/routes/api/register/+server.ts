import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
    const json = await request.json();
    console.log(json);
    return new Response('hello');
}) satisfies RequestHandler;
