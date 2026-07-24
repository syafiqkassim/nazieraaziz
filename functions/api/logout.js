import { jsonResponse } from '../helpers.js';

export async function onRequest({ request }) {
  if (request.method !== 'POST' && request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // Match login behavior: avoid `Secure` when running locally.
  const host = (request.headers.get('host') || '');
  const isLocal = host.includes('localhost') || host.startsWith('127.') || host.startsWith('[::1]');
  const secureFlag = isLocal ? '' : 'Secure;';
  const cookie = `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${secureFlag}`;
  return new Response(JSON.stringify({ message: 'Logged out', redirect: '/admin/login.html' }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'Set-Cookie': cookie,
    },
  });
}
