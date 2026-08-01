import type { APIRoute } from 'astro';
import { env, json, isAdmin, clean } from '../../../lib/session';

export const prerender = false;

function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no confusable chars
  let code = 'PRC-';
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return code;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  // deactivate / reactivate path
  if (body.action === 'set_active' && body.id) {
    await env(locals).DB.prepare('UPDATE clients SET active = ? WHERE id = ?')
      .bind(body.active ? 1 : 0, Number(body.id)).run();
    return json({ ok: true });
  }

  const name = clean(body.name, 200);
  if (!name) return json({ ok: false, error: 'Client name is required.' }, 400);

  const code = generateCode();
  const r = await env(locals).DB.prepare(
    'INSERT INTO clients (name, org, email, access_code) VALUES (?, ?, ?, ?)'
  ).bind(name, clean(body.org, 200), clean(body.email, 200), code).run();

  return json({ ok: true, id: r.meta.last_row_id, access_code: code });
};
