import { jsonResponse, methodNotAllowed, unauthorized, requireAuth } from '../helpers.js';

const ABOUT_ID = 'about';

const defaultAbout = {
  id: ABOUT_ID,
  title: 'Tentang Naziera',
  biography: 'Naziera ialah pakar autism dan jurulatih kesejahteraan mental yang berdedikasi untuk membina komuniti inklusif melalui sokongan keluarga, latihan profesional dan intervensi berasaskan kekuatan.',
  vision: 'Mencipta komuniti yang inklusif di mana setiap individu berkeperluan khas dihargai, diambil berat dan diberi peluang menerajui kehidupan sendiri.',
  mission: 'Menyediakan bimbingan berasaskan bukti, latihan keluarga dan sokongan sekolah untuk membantu pertumbuhan sosial, emosi dan kemahiran hidup.',
  experience: '10+ tahun pengalaman dalam pendidikan khas, perundingan autisme dan pemerkasaan keluarga serta komuniti.',
  education: 'Ijazah Sarjana Muda Pendidikan Khas, Pensijilan Pelatih Autisme',
  achievements: 'Penceramah jemputan di persidangan inklusi, penganjur bengkel keluarga, penyumbang modul sokongan neurodiversiti.',
  skills: 'Autism coaching, Inclusive teaching, Family support, Emotional wellbeing',
  research_interest: 'Strategi pembelajaran neurodivergent dan kesejahteraan mental komuniti',
  cv_link: 'https://example.com/naziera-cv.pdf',
};

export async function onRequest({ request, env }) {
  if (request.method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM about WHERE id = ?').bind(ABOUT_ID).first();
    return jsonResponse({ data: row || defaultAbout });
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
      `INSERT INTO about (id, title, biography, vision, mission, experience, education, achievements, skills, research_interest, cv_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         title = COALESCE(NULLIF(?, ''), title),
         biography = COALESCE(NULLIF(?, ''), biography),
         vision = COALESCE(NULLIF(?, ''), vision),
         mission = COALESCE(NULLIF(?, ''), mission),
         experience = COALESCE(NULLIF(?, ''), experience),
         education = COALESCE(NULLIF(?, ''), education),
         achievements = COALESCE(NULLIF(?, ''), achievements),
         skills = COALESCE(NULLIF(?, ''), skills),
         research_interest = COALESCE(NULLIF(?, ''), research_interest),
         cv_link = COALESCE(NULLIF(?, ''), cv_link)`
    )
      .bind(
        ABOUT_ID,
        body.title || '',
        body.biography || '',
        body.vision || '',
        body.mission || '',
        body.experience || '',
        body.education || '',
        body.achievements || '',
        body.skills || '',
        body.research_interest || '',
        body.cv_link || '',
        body.title || '',
        body.biography || '',
        body.vision || '',
        body.mission || '',
        body.experience || '',
        body.education || '',
        body.achievements || '',
        body.skills || '',
        body.research_interest || '',
        body.cv_link || ''
      )
      .run();

    const updated = await env.DB.prepare('SELECT * FROM about WHERE id = ?').bind(ABOUT_ID).first();
    return jsonResponse({ data: updated || defaultAbout });
  }

  return methodNotAllowed();
}
