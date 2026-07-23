import { jsonResponse, badRequest, unauthorized, signJwt, sha256Hex } from '../helpers.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return badRequest('Only POST is supported for login.');
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.password) {
    return badRequest('Email and password are required.');
  }

  const user = await env.DB.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').bind(body.email).first();
  if (!user) {
    return unauthorized('Invalid credentials.');
  }

  const candidateHash = await sha256Hex(body.password);
  if (candidateHash !== user.password_hash) {
    return unauthorized('Invalid credentials.');
  }

  const token = await signJwt({ sub: user.id, email: user.email }, env.JWT_SECRET);
  return jsonResponse({ token, user: { id: user.id, email: user.email } });
}
