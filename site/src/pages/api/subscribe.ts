import type { APIRoute } from 'astro';
import { env, json, clean, validEmail } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (clean(body.website)) return json({ ok: true }); // honeypot

  const email = clean(body.email, 200);
  if (!validEmail(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);

  await env(locals).DB.prepare(
    'INSERT INTO subscribers (email, source) VALUES (?, ?) ON CONFLICT(email) DO NOTHING'
  ).bind(email, clean(body.source, 100)).run();

  return json({ ok: true });
};
