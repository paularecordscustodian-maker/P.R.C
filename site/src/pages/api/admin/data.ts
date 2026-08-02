import type { APIRoute } from 'astro';
import { env, json, isAdmin } from '../../../lib/session';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  if (!isAdmin(request, locals)) return json({ ok: false, error: 'Unauthorized' }, 401);
  const db = env(locals).DB;
  const [intakes, bookings, subscribers, clients, updates, members, orders] = await Promise.all([
    db.prepare('SELECT * FROM intakes ORDER BY id DESC LIMIT 200').all(),
    db.prepare('SELECT * FROM bookings ORDER BY id DESC LIMIT 200').all(),
    db.prepare('SELECT * FROM subscribers ORDER BY id DESC LIMIT 500').all(),
    db.prepare('SELECT * FROM clients ORDER BY id DESC LIMIT 200').all(),
    db.prepare('SELECT u.*, c.name AS client_name FROM client_updates u JOIN clients c ON c.id = u.client_id ORDER BY u.id DESC LIMIT 100').all(),
    db.prepare('SELECT * FROM library_members ORDER BY id DESC LIMIT 500').all(),
    db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 200').all(),
  ]);
  return json({
    ok: true,
    intakes: intakes.results, bookings: bookings.results,
    subscribers: subscribers.results, clients: clients.results, updates: updates.results,
    members: members.results, orders: orders.results,
  });
};
