import type { APIRoute } from 'astro';
import { env, json, clean, signScoped, cookieHeader } from '../../../lib/session';
import { rateLimited } from '../../../lib/ratelimit';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  if (rateLimited(request, 'liblogin')) return json({ ok: false, error: 'Too many attempts — wait a minute and try again.' }, 429);
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  const code = clean(body.code, 100).toUpperCase().replace(/\s+/g, '');
  if (!code) return json({ ok: false, error: 'Enter your member code.' }, 400);

  const row = await env(locals).DB.prepare(
    "SELECT id FROM library_members WHERE access_code = ? AND active = 1 AND (expires_at IS NULL OR expires_at > datetime('now'))"
  ).bind(code).first();

  if (!row) return json({ ok: false, error: 'That member code was not recognized or has expired.' }, 401);

  const token = await signScoped('lib', row.id as number, env(locals).SESSION_SECRET, 60 * 60 * 24 * 365);
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader('prc_lib', token, 60 * 60 * 24 * 365) });
};
