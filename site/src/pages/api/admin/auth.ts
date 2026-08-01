import type { APIRoute } from 'astro';
import { env, json, clean, cookieHeader } from '../../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  const token = clean(body.token, 200);
  if (!token || token !== env(locals).ADMIN_TOKEN) return json({ ok: false, error: 'Wrong token.' }, 401);
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader('prc_admin', token, 60 * 60 * 12) });
};
