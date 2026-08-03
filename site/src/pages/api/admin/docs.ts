import type { APIRoute } from 'astro';
import { env, json, isAdmin, clean } from '../../../lib/session';

export const prerender = false;

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

function audit(db: any, fields: { doc_id?: number; client_id?: number; actor: string; action: string; detail?: string; ip?: string }) {
  return db.prepare(
    'INSERT INTO doc_audit (doc_id, client_id, actor, action, detail, ip) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(fields.doc_id ?? null, fields.client_id ?? null, fields.actor, fields.action, fields.detail ?? null, fields.ip ?? null).run();
}

// Upload: multipart form-data (file, client_id, label)
export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  const { DB, DOCS } = env(locals);
  const ip = request.headers.get('cf-connecting-ip') || '';

  const ct = request.headers.get('content-type') || '';

  // JSON body → delete action
  if (ct.includes('application/json')) {
    let body: any;
    try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
    if (body.action !== 'delete' || !body.id) return json({ ok: false, error: 'Bad request' }, 400);
    const doc = await DB.prepare('SELECT * FROM documents WHERE id = ?').bind(Number(body.id)).first();
    if (!doc) return json({ ok: false, error: 'Not found' }, 404);
    await DOCS.delete(doc.kv_key);
    await DB.prepare('DELETE FROM documents WHERE id = ?').bind(doc.id).run();
    await audit(DB, { doc_id: doc.id, client_id: doc.client_id, actor: 'admin', action: 'delete', detail: doc.filename, ip });
    return json({ ok: true });
  }

  // multipart → upload
  let form: FormData;
  try { form = await request.formData(); } catch { return json({ ok: false, error: 'Bad upload' }, 400); }
  const file = form.get('file');
  const clientId = Number(form.get('client_id'));
  const label = clean(form.get('label'), 300);
  if (!(file instanceof File) || !clientId) return json({ ok: false, error: 'File and client are required.' }, 400);
  if (file.size === 0 || file.size > MAX_BYTES) return json({ ok: false, error: 'File must be between 1 byte and 20 MB.' }, 400);

  const client = await DB.prepare('SELECT id FROM clients WHERE id = ?').bind(clientId).first();
  if (!client) return json({ ok: false, error: 'Unknown client.' }, 400);

  const key = crypto.randomUUID();
  await DOCS.put(key, await file.arrayBuffer());
  const filename = clean(file.name, 200).replace(/[^\w.\- ()]/g, '_') || 'document';
  const r = await DB.prepare(
    'INSERT INTO documents (client_id, label, filename, size, content_type, kv_key) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(clientId, label, filename, file.size, clean(file.type, 100) || 'application/octet-stream', key).run();
  await audit(DB, { doc_id: r.meta.last_row_id, client_id: clientId, actor: 'admin', action: 'upload', detail: filename, ip });

  return json({ ok: true, id: r.meta.last_row_id });
};
