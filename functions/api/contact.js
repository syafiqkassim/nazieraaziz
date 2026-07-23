import { jsonResponse, methodNotAllowed } from '../helpers.js';

const defaultContact = {
  intro: 'Sedia untuk berbual tentang sokongan autism, latihan inklusif atau pembelajaran kendiri. Hubungi Naziera untuk sesi pertama, rujukan atau kerjasama profesional.',
  data: {
    id: 'contact',
    phone: '+60 12-345 6789',
    email: 'nazieraaziz@example.com',
    office_address: 'No. 12, Jalan Utama, Taman Inklusif, Kuala Lumpur, Malaysia',
    maps_url: 'https://maps.google.com/?q=Kuala+Lumpur',
    facebook: 'https://facebook.com/nazieraaziz',
    instagram: 'https://instagram.com/nazieraaziz',
    linkedin: 'https://linkedin.com/in/nazieraaziz',
    tiktok: 'https://tiktok.com/@nazieraaziz',
    researchgate: 'https://www.researchgate.net/profile/Naziera_Aziz',
    google_scholar: 'https://scholar.google.com/citations?user=example',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
  },
};

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') {
    return methodNotAllowed();
  }

  const row = await env.DB.prepare('SELECT * FROM contact WHERE id = ?').bind('contact').first();
  if (!row) {
    return jsonResponse(defaultContact);
  }

  return jsonResponse({ intro: defaultContact.intro, data: row });
}
