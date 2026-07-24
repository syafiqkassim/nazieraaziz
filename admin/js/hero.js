// Loads hero data on page load and wires the Save button to persist via /api/save-hero

document.addEventListener('DOMContentLoaded', () => {
  const heroForm = document.getElementById('heroForm');
  const heroName = document.getElementById('heroName');
  const heroHeadline = document.getElementById('heroHeadline');
  const heroDescription = document.getElementById('heroDescription');
  const buttonText = document.getElementById('buttonText');
  const buttonLink = document.getElementById('buttonLink');
  const heroPreviewHeadline = document.getElementById('heroPreviewHeadline');
  const heroPreviewDescription = document.getElementById('heroPreviewDescription');
  const heroPreviewCta = document.getElementById('heroPreviewCta');
  const heroSaveButton = document.getElementById('heroSaveButton');

  async function loadHero() {
    try {
      const resp = await fetch('/api/get-hero', { method: 'GET', credentials: 'same-origin' });
      if (!resp.ok) return; // auth check already handles redirect
      const data = await resp.json().catch(() => null);
      if (!data || !data.hero) return;

      const h = data.hero;
      if (h.title) heroName.value = h.title;
      if (h.headline) heroHeadline.value = h.headline;
      if (h.description) heroDescription.value = h.description;
      if (h.primary_cta_text) buttonText.value = h.primary_cta_text;
      if (h.primary_cta_link) buttonLink.value = h.primary_cta_link;

      // update preview
      if (h.headline) heroPreviewHeadline.textContent = h.headline;
      if (h.description) heroPreviewDescription.textContent = h.description;
      if (h.primary_cta_text) heroPreviewCta.textContent = h.primary_cta_text;
      if (h.primary_cta_link) heroPreviewCta.href = h.primary_cta_link || '#contact';
    } catch (err) {
      // silent
      console.error('Failed to load hero', err);
    }
  }

  async function saveHero() {
    const payload = {
      title: heroName.value.trim() || null,
      headline: heroHeadline.value.trim() || null,
      description: heroDescription.value.trim() || null,
      primary_cta_text: buttonText.value.trim() || null,
      primary_cta_link: buttonLink.value.trim() || null,
    };

    heroSaveButton.disabled = true;
    try {
      const resp = await fetch('/api/save-hero', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        alert(data.error || 'Failed to save hero');
        return;
      }

      // update preview
      if (payload.headline) heroPreviewHeadline.textContent = payload.headline;
      if (payload.description) heroPreviewDescription.textContent = payload.description;
      if (payload.primary_cta_text) heroPreviewCta.textContent = payload.primary_cta_text;
      if (payload.primary_cta_link) heroPreviewCta.href = payload.primary_cta_link || '#contact';

      // small success indication
      const original = heroSaveButton.textContent;
      heroSaveButton.textContent = 'Saved';
      setTimeout(() => { heroSaveButton.textContent = original; }, 1200);
    } catch (err) {
      alert('Network error while saving hero');
    } finally {
      heroSaveButton.disabled = false;
    }
  }

  heroSaveButton.addEventListener('click', (e) => {
    e.preventDefault();
    saveHero();
  });

  loadHero();
});
