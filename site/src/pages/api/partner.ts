import type { APIRoute } from 'astro';
import { env, json, clean, validEmail } from '../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (clean(body.website)) return json({ ok: true }); // honeypot

  const org = clean(body.org, 300);
  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  if (!org || !name || !validEmail(email)) {
    return json({ ok: false, error: 'Organization, contact name, and a valid email are required.' }, 400);
  }

  const interests = (Array.isArray(body.interests) ? body.interests : [])
    .map((i: unknown) => clean(i, 60)).filter(Boolean).slice(0, 5).join(', ');

  await env(locals).DB.prepare(
    'INSERT INTO partners (org, org_type, name, email, phone, interests, audience, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(org, clean(body.org_type, 100), name, email, clean(body.phone, 50),
    interests, clean(body.audience, 200), clean(body.message, 4000)).run();

  return json({ ok: true });
};
