import type { APIRoute } from 'astro';
import { env, json, isAdmin, clean } from '../../../lib/session';

export const prerender = false;

function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = 'LIB-';
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return code;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  if (body.action === 'set_active' && body.id) {
    await env(locals).DB.prepare('UPDATE library_members SET active = ? WHERE id = ?')
      .bind(body.active ? 1 : 0, Number(body.id)).run();
    return json({ ok: true });
  }

  // expires: '' | '1m' | '1y' — blank = never (until deactivated)
  const expiresSql =
    body.expires === '1m' ? "datetime('now', '+1 month')" :
    body.expires === '1y' ? "datetime('now', '+1 year')" : 'NULL';

  const code = generateCode();
  const r = await env(locals).DB.prepare(
    `INSERT INTO library_members (name, email, access_code, expires_at) VALUES (?, ?, ?, ${expiresSql})`
  ).bind(clean(body.name, 200), clean(body.email, 200), code).run();

  return json({ ok: true, id: r.meta.last_row_id, access_code: code });
};
