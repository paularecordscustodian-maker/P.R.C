// Durable per-IP sliding-window rate limiter backed by D1 (shared across all isolates).
// Used only on auth endpoints, so the per-attempt write cost is negligible.

export async function rateLimited(db: any, request: Request, bucket: string, limit = 10, windowMs = 60_000): Promise<boolean> {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const now = Date.now();
  const cutoff = now - windowMs;
  const row = await db.prepare(
    'SELECT COUNT(*) AS n FROM auth_attempts WHERE bucket = ? AND ip = ? AND ts > ?'
  ).bind(bucket, ip, cutoff).first();
  if ((row?.n ?? 0) >= limit) return true;
  await db.batch([
    db.prepare('INSERT INTO auth_attempts (ip, bucket, ts) VALUES (?, ?, ?)').bind(ip, bucket, now),
    db.prepare('DELETE FROM auth_attempts WHERE ts < ?').bind(now - 3_600_000),
  ]);
  return false;
}
