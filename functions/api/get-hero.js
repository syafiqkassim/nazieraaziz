import { jsonResponse, badRequest } from '../helpers.js';
import { requireAuthFromCookie } from './auth.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') return badRequest('Only GET allowed');

  try {
    const user = await requireAuthFromCookie(request, env);
    if (!user) return jsonResponse({ error: 'Not authenticated' }, 401);

    const row = await env.DB.prepare('SELECT * FROM hero ORDER BY id DESC LIMIT 1').first();
    if (!row) return jsonResponse({ hero: null });

    return jsonResponse({ hero: row });
  } catch (err) {
    return jsonResponse({ error: err?.message || 'Failed to load hero' }, 500);
  }
}
