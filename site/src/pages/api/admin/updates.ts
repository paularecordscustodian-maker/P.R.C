import type { APIRoute } from 'astro';
import { env, json, isAdmin, clean } from '../../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  const clientId = Number(body.client_id);
  const title = clean(body.title, 300);
  if (!clientId || !title) return json({ ok: false, error: 'Client and title are required.' }, 400);

  await env(locals).DB.prepare(
    'INSERT INTO client_updates (client_id, kind, title, body) VALUES (?, ?, ?, ?)'
  ).bind(clientId, clean(body.kind, 50) || 'update', title, clean(body.body, 8000)).run();

  return json({ ok: true });
};
