import type { APIRoute } from 'astro';
import { env, json } from '../../lib/session';
import { generateSlots } from '../../lib/slots';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const all = generateSlots();
  const taken = new Set(
    ((await env(locals).DB.prepare(
      "SELECT slot_start FROM bookings WHERE slot_start IS NOT NULL AND status != 'closed'"
    ).all()).results as any[]).map((r) => r.slot_start)
  );
  return json({ ok: true, slots: all.filter((s) => !taken.has(s)) });
};
