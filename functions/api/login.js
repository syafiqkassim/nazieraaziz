import bcrypt from 'bcryptjs';
import { jsonResponse, badRequest, unauthorized, signJwt } from '../helpers.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return badRequest('Only POST allowed');

  if (!env?.DB) return jsonResponse({ error: 'D1 database not configured' }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  const email = (body?.email || '').trim().toLowerCase();
  const password = body?.password || '';

  if (!email || !password) return badRequest('Email and password required');

  try {
    const user = await env.DB.prepare('SELECT id, email, password_hash, is_active FROM admins WHERE email = ?').bind(email).first();
    if (!user) return unauthorized('Invalid credentials');
    if (user.is_active === 0) return jsonResponse({ error: 'Account disabled' }, 403);

    const matches = bcrypt.compareSync(password, user.password_hash);
    if (!matches) return unauthorized('Invalid credentials');

    const token = await signJwt({ sub: user.id, email: user.email }, env.JWT_SECRET);

    const maxAge = 60 * 60 * 24; // 1 day
    // Avoid `Secure` when running on localhost/dev so browsers accept the cookie over HTTP.
    const host = (request.headers.get('host') || '');
    const isLocal = host.includes('localhost') || host.startsWith('127.') || host.startsWith('[::1]');
    const secureFlag = isLocal ? '' : 'Secure;';
    const cookie = `session=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict; ${secureFlag}`;

    return new Response(JSON.stringify({ message: 'Authenticated', redirect: '/admin/dashboard.html' }), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'Set-Cookie': cookie,
      },
    });
  } catch (err) {
    return jsonResponse({ error: err.message || 'Authentication failed' }, 500);
  }
}
