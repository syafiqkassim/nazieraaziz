const apiBase = '/api';

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && typeof value === 'string') {
    el.textContent = value;
  }
}

function setHref(id, href, text) {
  const el = document.getElementById(id);
  if (!el || typeof href !== 'string') return;
  el.href = href;
  if (text) {
    el.textContent = text;
  }
}

function createServiceCards(items) {
  const container = document.getElementById('expertiseCards');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items
    .map(
      (item) => `
        <article class="card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
}

function createTestimonialCards(items) {
  const container = document.getElementById('testimonialCards');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items
    .map(
      (item) => `
        <article class="testimonial-card">
          <p>"${item.quote}"</p>
          <strong>— ${item.author}${item.role ? `, ${item.role}` : ''}</strong>
        </article>
      `
    )
    .join('');
}

function updateStatGrid(items) {
  const container = document.getElementById('heroStatGrid');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items
    .map(
      (item) => `
        <div class="stat">
          <strong>${item.value}</strong>
          ${item.label}
        </div>
      `
    )
    .join('');
}

async function fetchJson(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return null;
  }
}

async function loadHero() {
  const result = await fetchJson(`${apiBase}/hero`);
  const data = result?.data;
  if (!data) return;

  setText('heroRole', data.role || 'Autism Expert · Inclusivity Advocate · Mental Wellness Coach');
  setText('heroHeadline', data.headline || 'Naziera membantu keluarga dan komuniti memahami autism dengan penuh empati, ilmu dan sokongan berstruktur.');
  setText('heroDescription', data.description || 'Dengan pengalaman bertahun-tahun dalam pendidikan khas, latihan profesional dan sokongan keluarga, Naziera memberi panduan praktikal dan strategi inklusif untuk anak-anak, remaja serta dewasa berkeperluan khas.');
  setText('heroCardSummary', data.summary || 'Naziera Aziz adalah pakar autism, jurulatih keluarga dan penceramah berkaitan kesejahteraan mental serta kebolehcapaian. Fokus beliau ialah membina hubungan positif dan persekitaran sokongan untuk individu neurodivergent.');
  setText('heroCta', data.button_text || 'Tempah Konsultasi');
  setHref('heroCta', data.button_link || '#contact');
  updateStatGrid(data.stats || [
    { label: 'tahun pengalaman', value: '10+' },
    { label: 'keluarga disokong', value: '500+' },
    { label: 'program dan bengkel', value: '40+' },
  ]);
}

async function loadAbout() {
  const result = await fetchJson(`${apiBase}/about`);
  const data = result?.data;
  if (!data) return;

  setText('aboutIntro', data.biography || 'Naziera membina pengalaman sebagai pakar autism melalui kombinasi kerja akademik, perundingan praktikal dan pembelajaran berterusan dalam model intervensi neurodiversiti.');
  setText('aboutCard1Title', 'Visi');
  setText('aboutCard1Text', data.vision || 'Mencipta komuniti yang inklusif di mana setiap individu berkeperluan khas dihargai, diambil berat dan diberi peluang menerajui kehidupan sendiri.');
  setText('aboutCard2Title', 'Misi');
  setText('aboutCard2Text', data.mission || 'Menyediakan bimbingan berasaskan bukti, latihan keluarga dan sokongan sekolah untuk membantu pertumbuhan sosial, emosi dan kemahiran hidup.');
}

async function loadServices() {
  const result = await fetchJson(`${apiBase}/services`);
  const data = result?.data;
  if (!data) return;
  setText('expertiseIntro', result?.intro || 'Perkhidmatan Naziera difokuskan kepada pendekatan holistik, dari pemerhatian profil autisme hingga kepada rancangan sokongan individu dan latihan kapasiti komuniti.');
  createServiceCards(data);
}

async function loadTestimonials() {
  const result = await fetchJson(`${apiBase}/testimonials`);
  const data = result?.data;
  if (!data) return;
  setText('servicesIntro', result?.intro || 'Dari sesi peribadi hingga bengkel berkumpulan, setiap perkhidmatan disesuaikan untuk memberikan impak praktikal dan hasil yang berkekalan.');
  createTestimonialCards(data);
}

async function loadContact() {
  const result = await fetchJson(`${apiBase}/contact`);
  const data = result?.data;
  if (!data) return;

  setText('contactIntro', data.intro || 'Sedia untuk berbual tentang sokongan autism, latihan inklusif atau pembelajaran kendiri. Hubungi Naziera untuk sesi pertama, rujukan atau kerjasama profesional.');
  setText('contactEmail', data.email || 'nazieraaziz@example.com');
  setHref('contactEmail', `mailto:${data.email || 'nazieraaziz@example.com'}`);
  setText('contactPhone', data.phone || '+60 12-345 6789');
  setHref('contactPhone', `tel:${data.phone || '+60123456789'}`);
  setText('contactInstagram', data.instagram ? data.instagram.replace(/https?:\/\//, '') : '@nazieraaziz');
  setHref('contactInstagram', data.instagram || 'https://www.instagram.com/nazieraaziz');
}

async function loadPageContent() {
  await Promise.all([loadHero(), loadAbout(), loadServices(), loadTestimonials(), loadContact()]);
}

document.addEventListener('DOMContentLoaded', loadPageContent);
