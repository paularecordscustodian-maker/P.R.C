import type { APIRoute } from 'astro';
import { env, json, isAdmin, clean } from '../../../lib/session';

export const prerender = false;

const TABLES: Record<string, string> = { intake: 'intakes', booking: 'bookings', order: 'orders', partner: 'partners' };
const STATUSES = new Set(['new', 'contacted', 'scheduled', 'invoiced', 'paid', 'shipped', 'closed']);

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }

  const table = TABLES[clean(body.kind, 20)];
  const status = clean(body.status, 20);
  const id = Number(body.id);
  if (!table || !STATUSES.has(status) || !id) return json({ ok: false, error: 'Bad request' }, 400);

  await env(locals).DB.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).bind(status, id).run();
  return json({ ok: true });
};
