import type { APIRoute } from 'astro';
import { env, getCookie, verifySession, json } from '../../../lib/session';

export const prerender = false;

export const GET: APIRoute = async ({ request, params, locals }) => {
  const { DB, DOCS, SESSION_SECRET } = env(locals);

  const clientId = await verifySession(getCookie(request, 'prc_sess'), SESSION_SECRET);
  if (!clientId) return json({ ok: false, error: 'Sign in at /login to access documents.' }, 401);
  const client = await DB.prepare('SELECT id FROM clients WHERE id = ? AND active = 1').bind(clientId).first();
  if (!client) return json({ ok: false, error: 'Sign in at /login to access documents.' }, 401);

  const doc = await DB.prepare('SELECT * FROM documents WHERE id = ?').bind(Number(params.id)).first();
  if (!doc) return json({ ok: false, error: 'Not found' }, 404);
  if (doc.client_id !== clientId) {
    await DB.prepare(
      'INSERT INTO doc_audit (doc_id, client_id, actor, action, detail, ip) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(doc.id, clientId, `client:${clientId}`, 'denied', doc.filename, request.headers.get('cf-connecting-ip') || '').run();
    return json({ ok: false, error: 'Not found' }, 404); // no existence oracle across clients
  }

  const value = await DOCS.get(doc.kv_key, { type: 'stream' });
  if (!value) return json({ ok: false, error: 'File unavailable' }, 500);

  await DB.prepare(
    'INSERT INTO doc_audit (doc_id, client_id, actor, action, detail, ip) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(doc.id, clientId, `client:${clientId}`, 'download', doc.filename, request.headers.get('cf-connecting-ip') || '').run();

  return new Response(value, {
    headers: {
      'Content-Type': doc.content_type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${doc.filename}"`,
      'Content-Length': String(doc.size),
      'Cache-Control': 'no-store, private',
    },
  });
};
