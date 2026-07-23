import { jsonResponse, unauthorized, requireAuth } from '../helpers.js';

export async function onRequest({ request, env }) {
  const payload = await requireAuth(request, env);
  if (!payload) {
    return unauthorized('Authentication required.');
  }

  return jsonResponse({ user: { id: payload.sub, email: payload.email } });
}
