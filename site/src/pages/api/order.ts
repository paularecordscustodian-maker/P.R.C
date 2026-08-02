import type { APIRoute } from 'astro';
import { env, json, clean, validEmail } from '../../lib/session';
import { products } from '../../data/products';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'Bad request' }, 400); }
  if (clean(body.website)) return json({ ok: true }); // honeypot

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  if (!name || !validEmail(email)) return json({ ok: false, error: 'Name and a valid email are required.' }, 400);

  // validate items against the catalog server-side
  const valid = new Map(products.map((p) => [p.slug, p]));
  const items: { slug: string; name: string; qty: number; price: number | null }[] = [];
  for (const it of Array.isArray(body.items) ? body.items : []) {
    const p = valid.get(String(it.slug));
    const qty = Math.min(Math.max(parseInt(it.qty, 10) || 0, 0), 50);
    if (p && qty > 0) items.push({ slug: p.slug, name: p.name, qty, price: p.price });
  }
  if (items.length === 0) return json({ ok: false, error: 'Pick at least one product.' }, 400);

  const needsAddress = items.some((i) => valid.get(i.slug)!.kind === 'physical');
  const address = clean(body.address, 500);
  if (needsAddress && !address) return json({ ok: false, error: 'A shipping address is required for physical items.' }, 400);

  await env(locals).DB.prepare(
    'INSERT INTO orders (name, email, phone, address, items, notes) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(name, email, clean(body.phone, 50), address, JSON.stringify(items), clean(body.notes, 2000)).run();

  return json({ ok: true });
};
