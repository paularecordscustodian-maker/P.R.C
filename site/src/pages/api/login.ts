import type { APIRoute } from 'astro';
import { env, json, clean, signSession, cookieHeader } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  const code = clean(body.code, 100);
  if (!code) return json({ ok: false, error: 'Enter your access code.' }, 400);

  const row = await env(locals).DB.prepare(
    'SELECT id FROM clients WHERE access_code = ? AND active = 1'
  ).bind(code).first();

  if (!row) return json({ ok: false, error: 'That access code was not recognized.' }, 401);

  const token = await signSession(row.id as number, env(locals).SESSION_SECRET);
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader('prc_sess', token, 60 * 60 * 24 * 30) });
};
