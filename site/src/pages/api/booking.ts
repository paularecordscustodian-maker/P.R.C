import type { APIRoute } from 'astro';
import { env, json, clean, validEmail } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (clean(body.website)) return json({ ok: true }); // honeypot

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  if (!name || !validEmail(email)) return json({ ok: false, error: 'Name and a valid email are required.' }, 400);

  await env(locals).DB.prepare(
    'INSERT INTO bookings (name, email, phone, topic, pref_times) VALUES (?, ?, ?, ?, ?)'
  ).bind(name, email, clean(body.phone, 50), clean(body.topic, 200), clean(body.pref_times, 500)).run();

  return json({ ok: true });
};
