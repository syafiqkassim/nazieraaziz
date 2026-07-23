import { jsonResponse, methodNotAllowed } from '../helpers.js';

const defaultTestimonials = {
  intro: 'Dari sesi peribadi hingga bengkel berkumpulan, setiap perkhidmatan disesuaikan untuk memberikan impak praktikal dan hasil yang berkekalan.',
  data: [
    {
      quote: 'Naziera memberi kami alat dan keyakinan untuk menyokong anak kami secara lebih mantap. Kaedahnya hangat, profesional dan sangat relevan.',
      author: 'Ibu Bapa',
      role: 'Kuala Lumpur',
    },
    {
      quote: 'Bengkel Naziera membuka mata kami tentang bagaimana menstrukturkan persekitaran pembelajaran yang benar-benar inklusif.',
      author: 'Guru Pendidikan Khas',
      role: '',
    },
  ],
};

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') {
    return methodNotAllowed();
  }

  const rows = await env.DB.prepare('SELECT quote, author, role FROM testimonials ORDER BY created_at DESC').all();
  if (!rows?.results?.length) {
    return jsonResponse(defaultTestimonials);
  }

  return jsonResponse({ intro: defaultTestimonials.intro, data: rows.results });
}
