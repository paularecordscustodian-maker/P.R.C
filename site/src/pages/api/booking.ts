import type { APIRoute } from 'astro';
import { env, json, clean, validEmail } from '../../lib/session';
import { isLegalSlot } from '../../lib/slots';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (clean(body.website)) return json({ ok: true }); // honeypot

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  if (!name || !validEmail(email)) return json({ ok: false, error: 'Name and a valid email are required.' }, 400);

  const db = env(locals).DB;
  let slot: string | null = clean(body.slot_start, 40) || null;
  if (slot) {
    if (!isLegalSlot(slot)) return json({ ok: false, error: 'That time is not available — pick another slot.' }, 400);
    const clash = await db.prepare(
      "SELECT id FROM bookings WHERE slot_start = ? AND status != 'closed'"
    ).bind(slot).first();
    if (clash) return json({ ok: false, error: 'That time was just taken — pick another slot.' }, 409);
  }

  await db.prepare(
    'INSERT INTO bookings (name, email, phone, topic, pref_times, slot_start) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(name, email, clean(body.phone, 50), clean(body.topic, 200), clean(body.pref_times, 500), slot).run();

  return json({ ok: true, slot_start: slot });
};
