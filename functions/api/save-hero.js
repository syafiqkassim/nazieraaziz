import { jsonResponse, badRequest } from '../helpers.js';
import { requireAuthFromCookie } from './auth.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return badRequest('Only POST allowed');

  try {
    const user = await requireAuthFromCookie(request, env);
    if (!user) return jsonResponse({ error: 'Not authenticated' }, 401);

    const body = await request.json().catch(() => null);
    if (!body) return badRequest('Missing JSON body');

    const title = body.title || null;
    const subtitle = body.subtitle || null;
    const headline = body.headline || null;
    const description = body.description || null;
    const primary_cta_text = body.primary_cta_text || null;
    const primary_cta_link = body.primary_cta_link || null;
    const image_url = body.image_url || null;
    const background_image = body.background_image || null;

    // Simple validation
    if (!headline && !description && !title) {
      return badRequest('Hero must contain at least a headline, title, or description');
    }

    const existing = await env.DB.prepare('SELECT id FROM hero ORDER BY id DESC LIMIT 1').first();

    if (existing && existing.id) {
      await env.DB.prepare(
        `UPDATE hero SET title = ?, subtitle = ?, headline = ?, description = ?, primary_cta_text = ?, primary_cta_link = ?, image_url = ?, background_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      )
        .bind(title, subtitle, headline, description, primary_cta_text, primary_cta_link, image_url, background_image, existing.id)
        .run();

      return jsonResponse({ message: 'Hero updated', id: existing.id });
    } else {
      const res = await env.DB.prepare(
        `INSERT INTO hero (title, subtitle, headline, description, primary_cta_text, primary_cta_link, image_url, background_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(title, subtitle, headline, description, primary_cta_text, primary_cta_link, image_url, background_image)
        .run();

      return jsonResponse({ message: 'Hero created', id: res.meta?.last_row_id || null }, 201);
    }
  } catch (err) {
    return jsonResponse({ error: err?.message || 'Failed to save hero' }, 500);
  }
}
