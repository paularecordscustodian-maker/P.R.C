// Signed-cookie sessions via Web Crypto HMAC-SHA256. Format: <clientId>.<expiresEpoch>.<sig>
const enc = new TextEncoder();

async function hmacKey(secret: string) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function b64url(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function signSession(clientId: number, secret: string, ttlSeconds = 60 * 60 * 24 * 30) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${clientId}.${exp}`;
  const key = await hmacKey(secret);
  const sig = b64url(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
  return `${payload}.${sig}`;
}

export async function verifySession(token: string | undefined, secret: string): Promise<number | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [id, exp, sig] = parts;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(exp)) return null;
  if (parseInt(exp, 10) < Math.floor(Date.now() / 1000)) return null;
  const key = await hmacKey(secret);
  const expected = b64url(await crypto.subtle.sign('HMAC', key, enc.encode(`${id}.${exp}`)));
  if (expected !== sig) return null;
  return parseInt(id, 10);
}

export function getCookie(request: Request, name: string): string | undefined {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(/;\s*/)) {
    const eq = part.indexOf('=');
    if (eq > 0 && part.slice(0, eq) === name) return decodeURIComponent(part.slice(eq + 1));
  }
  return undefined;
}

export function cookieHeader(name: string, value: string, maxAge: number) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } });
}

type RuntimeEnv = { DB: any; ADMIN_TOKEN: string; SESSION_SECRET: string };
export function env(locals: any): RuntimeEnv {
  return (locals as any).runtime.env as RuntimeEnv;
}

export function isAdmin(request: Request, locals: any): boolean {
  const token = env(locals).ADMIN_TOKEN;
  if (!token) return false;
  const auth = request.headers.get('authorization') || '';
  if (auth === `Bearer ${token}`) return true;
  return getCookie(request, 'prc_admin') === token;
}

/* Basic shared validation */
export function clean(v: unknown, max = 2000): string {
  return String(v ?? '').trim().slice(0, max);
}
export function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}
