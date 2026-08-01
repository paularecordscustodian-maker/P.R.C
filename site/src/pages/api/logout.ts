import type { APIRoute } from 'astro';

export const prerender = false;

const clear = {
  status: 302,
  headers: {
    'Set-Cookie': 'prc_sess=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    Location: '/login',
  },
};

export const POST: APIRoute = async () => new Response(null, clear);
export const GET: APIRoute = async () => new Response(null, clear);
