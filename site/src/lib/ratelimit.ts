// Per-IP sliding-window rate limiter, held in isolate memory.
// Not a hard guarantee (each worker isolate has its own map, and isolates recycle),
// but it turns online brute-force of access codes from feasible into futile when
// layered on a ~900M-combination code space.

const hits = new Map<string, number[]>();

export function rateLimited(request: Request, bucket: string, limit = 10, windowMs = 60_000): boolean {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) { hits.set(key, arr); return true; }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 10_000) hits.clear(); // memory backstop
  return false;
}
