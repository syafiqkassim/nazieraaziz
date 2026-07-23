import { jsonResponse, methodNotAllowed } from '../helpers.js';

const defaultServices = {
  intro: 'Perkhidmatan Naziera difokuskan kepada pendekatan holistik, dari pemerhatian profil autisme hingga kepada rancangan sokongan individu dan latihan kapasiti komuniti.',
  data: [
    {
      title: 'Penilaian & Profil Autisme',
      description: 'Menilai kekuatan, nilai dan keperluan unik individu, sambil membina ramuan sokongan yang mudah difahami oleh keluarga, pendidik dan pihak berkepentingan.',
    },
    {
      title: 'Latihan & Penceramah',
      description: 'Program bimbingan untuk ibu bapa, guru dan profesional kesihatan yang menekankan komunikasi efektif, pengurusan tingkah laku dan pendekatan inklusif.',
    },
    {
      title: 'Sokongan Kesejahteraan Mental',
      description: 'Strategi untuk membina daya tahan emosi, penjagaan diri dan hubungan sokongan bagi mereka yang menjalani perjalanan neurodiversity.',
    },
    {
      title: 'Perundingan Inklusi',
      description: 'Bekerja dengan sekolah, kumpulan komuniti dan organisasi untuk merancang ruang yang mengalu-alukan semua gaya pembelajaran dan komunikasi.',
    },
  ],
};

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') {
    return methodNotAllowed();
  }

  const rows = await env.DB.prepare('SELECT title, description FROM services ORDER BY created_at DESC').all();
  if (!rows?.results?.length) {
    return jsonResponse(defaultServices);
  }

  return jsonResponse({ intro: defaultServices.intro, data: rows.results });
}
