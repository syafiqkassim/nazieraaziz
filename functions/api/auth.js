import { jsonResponse, unauthorized, badRequest, verifyJwt } from '../helpers.js';

function parseCookies(request) {
  const header = request.headers.get('Cookie') || request.headers.get('cookie') || '';
  return header.split(';').map(s => s.trim()).filter(Boolean).reduce((acc, cur) => {
    const [k, ...v] = cur.split('=');
    acc[k] = v.join('=');
    return acc;
  }, {});
}

export async function requireAuthFromCookie(request, env) {
  if (!env?.DB) throw new Error('D1 database not configured');

  const cookies = parseCookies(request);
  const token = cookies.session;
  if (!token) return null;

  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) return null;

  const user = await env.DB.prepare('SELECT id, email, full_name, is_active FROM admins WHERE id = ?').bind(payload.sub).first();
  if (!user) return null;
  if (user.is_active === 0) return null;

  return user;
}

export function redirectToLogin() {
  return new Response(null, { status: 302, headers: { Location: '/admin/login.html' } });
}

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') {
    return badRequest('Only GET is allowed for auth check');
  }

  try {
    const user = await requireAuthFromCookie(request, env);
    if (!user) return jsonResponse({ error: 'Not authenticated' }, 401);

    return jsonResponse({ admin: { id: user.id, email: user.email, full_name: user.full_name } });
  } catch (err) {
    return jsonResponse({ error: err?.message || 'Auth check failed' }, 500);
  }
}
