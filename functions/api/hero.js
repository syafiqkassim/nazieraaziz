import { jsonResponse, methodNotAllowed, unauthorized, requireAuth } from '../helpers.js';

const HERO_ID = 'hero';

const defaultHero = {
  id: HERO_ID,
  role: 'Autism Expert · Inclusivity Advocate · Mental Wellness Coach',
  summary: 'Naziera Aziz adalah pakar autism, jurulatih keluarga dan penceramah berkaitan kesejahteraan mental serta kebolehcapaian. Fokus beliau ialah membina hubungan positif dan persekitaran sokongan untuk individu neurodivergent.',
  profile_photo: null,
  name: 'Naziera Aziz',
  headline: 'Naziera membantu keluarga dan komuniti memahami autism dengan penuh empati, ilmu dan sokongan berstruktur',
  description: 'Dengan pengalaman bertahun-tahun dalam pendidikan khas, latihan profesional dan sokongan keluarga, Naziera memberi panduan praktikal dan strategi inklusif untuk anak-anak, remaja serta dewasa berkeperluan khas.',
  button_text: 'Tempah Konsultasi',
  button_link: '#contact',
  background_image: null,
  stats_json: JSON.stringify([
    { label: 'tahun pengalaman', value: '10+' },
    { label: 'keluarga disokong', value: '500+' },
    { label: 'program dan bengkel', value: '40+' },
  ]),
};

export async function onRequest({ request, env }) {
  if (request.method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM hero WHERE id = ?').bind(HERO_ID).first();
    const hero = row || defaultHero;
    return jsonResponse({
      data: {
        ...hero,
        stats: hero.stats_json ? JSON.parse(hero.stats_json) : JSON.parse(defaultHero.stats_json),
      },
    });
  }

  if (request.method === 'PUT') {
    const payload = await requireAuth(request, env);
    if (!payload) {
      return unauthorized('Authentication required.');
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return jsonResponse({ error: 'Invalid payload' }, 400);
    }

    await env.DB.prepare(
      `INSERT INTO hero (id, role, summary, profile_photo, name, headline, description, button_text, button_link, background_image, stats_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         role = COALESCE(NULLIF(?, ''), role),
         summary = COALESCE(NULLIF(?, ''), summary),
         profile_photo = COALESCE(NULLIF(?, ''), profile_photo),
         name = COALESCE(NULLIF(?, ''), name),
         headline = COALESCE(NULLIF(?, ''), headline),
         description = COALESCE(NULLIF(?, ''), description),
         button_text = COALESCE(NULLIF(?, ''), button_text),
         button_link = COALESCE(NULLIF(?, ''), button_link),
         background_image = COALESCE(NULLIF(?, ''), background_image),
         stats_json = COALESCE(NULLIF(?, ''), stats_json)`
    )
      .bind(
        HERO_ID,
        body.role || '',
        body.summary || '',
        body.profile_photo || '',
        body.name || '',
        body.headline || '',
        body.description || '',
        body.button_text || '',
        body.button_link || '',
        body.background_image || '',
        body.stats_json || '',
        body.role || '',
        body.summary || '',
        body.profile_photo || '',
        body.name || '',
        body.headline || '',
        body.description || '',
        body.button_text || '',
        body.button_link || '',
        body.background_image || '',
        body.stats_json || ''
      )
      .run();

    const updated = await env.DB.prepare('SELECT * FROM hero WHERE id = ?').bind(HERO_ID).first();
    return jsonResponse({ data: updated || defaultHero });
  }

  return methodNotAllowed();
}
