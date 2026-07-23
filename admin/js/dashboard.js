const sidebarLinks = document.querySelectorAll('.sidebar-link');

function clearActiveLink() {
  sidebarLinks.forEach((link) => link.classList.remove('active'));
}

sidebarLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    clearActiveLink();
    event.currentTarget.classList.add('active');
  });
});

const heroForm = document.getElementById('heroForm');
const heroPreviewButton = document.getElementById('heroPreviewButton');
const heroSaveButton = document.getElementById('heroSaveButton');
const heroPreviewAvatar = document.getElementById('heroPreviewAvatar');
const heroPreviewName = document.getElementById('heroPreviewName');
const heroPreviewHeadline = document.getElementById('heroPreviewHeadline');
const heroPreviewDescription = document.getElementById('heroPreviewDescription');
const heroPreviewCta = document.getElementById('heroPreviewCta');
const heroPreviewImage = document.getElementById('heroPreviewImage');
const profilePhotoInput = document.getElementById('profilePhoto');
const backgroundImageInput = document.getElementById('backgroundImage');

function updateHeroPreview() {
  const name = heroForm.heroName.value.trim() || 'Naziera Aziz';
  const headline = heroForm.heroHeadline.value.trim() || 'Naziera membantu keluarga dan komuniti memahami autism dengan penuh empati, ilmu dan sokongan berstruktur';
  const description = heroForm.heroDescription.value.trim() || 'Dengan pengalaman bertahun-tahun dalam pendidikan khas, latihan profesional dan sokongan keluarga, Naziera memberi panduan praktikal dan strategi inklusif untuk anak-anak, remaja serta dewasa berkeperluan khas.';
  const buttonText = heroForm.buttonText.value.trim() || 'Tempah Konsultasi';
  const buttonLink = heroForm.buttonLink.value.trim() || '#contact';

  heroPreviewName.textContent = name;
  heroPreviewHeadline.textContent = headline;
  heroPreviewDescription.textContent = description;
  heroPreviewCta.textContent = buttonText;
  heroPreviewCta.href = buttonLink;

  if (!profilePhotoInput.files.length) {
    heroPreviewAvatar.style.backgroundImage = 'none';
    heroPreviewAvatar.textContent = name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();
  }
}

function loadImagePreview(input, target, fallbackText) {
  if (!input.files || !input.files[0]) {
    if (target === heroPreviewImage) {
      target.style.backgroundImage = 'none';
      target.textContent = fallbackText;
    }
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    if (target === heroPreviewImage) {
      target.style.backgroundImage = `url('${reader.result}')`;
      target.textContent = '';
    } else {
      target.style.backgroundImage = `url('${reader.result}')`;
      target.textContent = '';
    }
  };
  reader.readAsDataURL(file);
}

profilePhotoInput.addEventListener('change', () => {
  loadImagePreview(profilePhotoInput, heroPreviewAvatar, 'NA');
});

backgroundImageInput.addEventListener('change', () => {
  loadImagePreview(backgroundImageInput, heroPreviewImage, 'Background Preview');
});

heroForm.addEventListener('input', updateHeroPreview);
heroPreviewButton.addEventListener('click', () => {
  updateHeroPreview();
  heroPreviewButton.textContent = 'Preview updated';
  setTimeout(() => {
    heroPreviewButton.textContent = 'Preview';
  }, 1400);
});

heroSaveButton.addEventListener('click', () => {
  updateHeroPreview();
  heroSaveButton.textContent = 'Saved';
  heroSaveButton.disabled = true;
  setTimeout(() => {
    heroSaveButton.textContent = 'Save';
    heroSaveButton.disabled = false;
  }, 1500);
});

const aboutForm = document.getElementById('aboutForm');
const aboutPreviewButton = document.getElementById('aboutPreviewButton');
const aboutSaveButton = document.getElementById('aboutSaveButton');
const aboutPreviewTitle = document.getElementById('aboutPreviewTitle');
const aboutPreviewBiography = document.getElementById('aboutPreviewBiography');
const aboutPreviewExperience = document.getElementById('aboutPreviewExperience');
const aboutPreviewEducation = document.getElementById('aboutPreviewEducation');
const aboutPreviewAchievements = document.getElementById('aboutPreviewAchievements');
const aboutPreviewSkills = document.getElementById('aboutPreviewSkills');
const aboutPreviewResearch = document.getElementById('aboutPreviewResearch');
const aboutPreviewCv = document.getElementById('aboutPreviewCv');

function updateAboutPreview() {
  const title = aboutForm.aboutTitle.value.trim() || 'Tentang Naziera';
  const biography = aboutForm.aboutBiography.value.trim() || 'Naziera ialah pakar autism dan jurulatih kesejahteraan mental yang berdedikasi untuk membina komuniti inklusif melalui sokongan keluarga, latihan profesional dan intervensi berasaskan kekuatan.';
  const experience = aboutForm.aboutExperience.value.trim() || '10+ tahun pengalaman dalam pendidikan khas, perundingan autisme dan pemerkasaan keluarga serta komuniti.';
  const education = aboutForm.aboutEducation.value.trim() || 'Ijazah Sarjana Muda Pendidikan Khas, Pensijilan Pelatih Autisme';
  const achievements = aboutForm.aboutAchievements.value.trim() || 'Penceramah jemputan di persidangan inklusi, penganjur bengkel keluarga, penyumbang modul sokongan neurodiversiti.';
  const skills = aboutForm.aboutSkills.value.trim() || 'Autism coaching, Inclusive teaching, Family support, Emotional wellbeing';
  const research = aboutForm.aboutResearch.value.trim() || 'Strategi pembelajaran neurodivergent dan kesejahteraan mental komuniti';
  const cvLink = aboutForm.aboutCvLink.value.trim() || 'https://example.com/naziera-cv.pdf';

  aboutPreviewTitle.textContent = title;
  aboutPreviewBiography.textContent = biography;
  aboutPreviewExperience.textContent = experience;
  aboutPreviewEducation.textContent = education;
  aboutPreviewAchievements.textContent = achievements;
  aboutPreviewResearch.textContent = research;
  aboutPreviewCv.href = cvLink;

  const skillChips = skills.split(',').map((skill) => skill.trim()).filter(Boolean);
  aboutPreviewSkills.innerHTML = skillChips.map((skill) => `<span>${skill}</span>`).join('');
}

aboutForm.addEventListener('input', updateAboutPreview);
aboutPreviewButton.addEventListener('click', () => {
  updateAboutPreview();
  aboutPreviewButton.textContent = 'Preview updated';
  setTimeout(() => {
    aboutPreviewButton.textContent = 'Preview';
  }, 1400);
});

aboutSaveButton.addEventListener('click', () => {
  updateAboutPreview();
  aboutSaveButton.textContent = 'Saved';
  aboutSaveButton.disabled = true;
  setTimeout(() => {
    aboutSaveButton.textContent = 'Save';
    aboutSaveButton.disabled = false;
  }, 1500);
});

const contactForm = document.getElementById('contactForm');
const contactPreviewButton = document.getElementById('contactPreviewButton');
const contactSaveButton = document.getElementById('contactSaveButton');
const contactPreviewPhone = document.getElementById('contactPreviewPhone');
const contactPreviewEmail = document.getElementById('contactPreviewEmail');
const contactPreviewOffice = document.getElementById('contactPreviewOffice');
const contactPreviewMaps = document.getElementById('contactPreviewMaps');
const contactPreviewFacebook = document.getElementById('contactPreviewFacebook');
const contactPreviewInstagram = document.getElementById('contactPreviewInstagram');
const contactPreviewLinkedIn = document.getElementById('contactPreviewLinkedIn');
const contactPreviewTikTok = document.getElementById('contactPreviewTikTok');
const contactPreviewResearchGate = document.getElementById('contactPreviewResearchGate');
const contactPreviewGoogleScholar = document.getElementById('contactPreviewGoogleScholar');
const contactPreviewOrcid = document.getElementById('contactPreviewOrcid');

function updateContactPreview() {
  contactPreviewPhone.textContent = contactForm.contactPhone.value.trim() || '+60 12-345 6789';
  contactPreviewEmail.textContent = contactForm.contactEmail.value.trim() || 'nazieraaziz@example.com';
  contactPreviewOffice.textContent = contactForm.contactOffice.value.trim() || 'No. 12, Jalan Utama, Taman Inklusif, Kuala Lumpur, Malaysia';

  const maps = contactForm.contactMaps.value.trim() || 'https://maps.google.com/?q=Kuala+Lumpur';
  contactPreviewMaps.href = maps;
  contactPreviewMaps.textContent = 'Open map';

  contactPreviewFacebook.href = contactForm.contactFacebook.value.trim() || 'https://facebook.com/nazieraaziz';
  contactPreviewInstagram.href = contactForm.contactInstagram.value.trim() || 'https://instagram.com/nazieraaziz';
  contactPreviewLinkedIn.href = contactForm.contactLinkedIn.value.trim() || 'https://linkedin.com/in/nazieraaziz';
  contactPreviewTikTok.href = contactForm.contactTikTok.value.trim() || 'https://tiktok.com/@nazieraaziz';
  contactPreviewResearchGate.href = contactForm.contactResearchGate.value.trim() || 'https://www.researchgate.net/profile/Naziera_Aziz';
  contactPreviewGoogleScholar.href = contactForm.contactGoogleScholar.value.trim() || 'https://scholar.google.com/citations?user=example';
  contactPreviewOrcid.href = contactForm.contactOrcid.value.trim() || 'https://orcid.org/0000-0000-0000-0000';
}

contactForm.addEventListener('input', updateContactPreview);
contactPreviewButton.addEventListener('click', () => {
  updateContactPreview();
  contactPreviewButton.textContent = 'Preview updated';
  setTimeout(() => {
    contactPreviewButton.textContent = 'Preview';
  }, 1400);
});

contactSaveButton.addEventListener('click', () => {
  updateContactPreview();
  contactSaveButton.textContent = 'Saved';
  contactSaveButton.disabled = true;
  setTimeout(() => {
    contactSaveButton.textContent = 'Save';
    contactSaveButton.disabled = false;
  }, 1500);
});

const portfolioForm = document.getElementById('portfolioForm');
const portfolioPreviewButton = document.getElementById('portfolioPreviewButton');
const portfolioSaveButton = document.getElementById('portfolioSaveButton');
const portfolioPreviewTitle = document.getElementById('portfolioPreviewTitle');
const portfolioPreviewDescription = document.getElementById('portfolioPreviewDescription');
const portfolioPreviewCategory = document.getElementById('portfolioPreviewCategory');
const portfolioPreviewWebsite = document.getElementById('portfolioPreviewWebsite');
const portfolioPreviewGithub = document.getElementById('portfolioPreviewGithub');
const portfolioPreviewImage = document.getElementById('portfolioPreviewImage');
const portfolioList = document.getElementById('portfolioList');
const projectImageInput = document.getElementById('projectImage');
const projectIdInput = document.getElementById('projectId');

let projects = [
  {
    id: 'p1',
    title: 'Autism Inclusion Workshop',
    description: 'A workshop series designed to teach educators and families how to build inclusive learning environments.',
    category: 'Workshop',
    website: 'https://nazieraaziz.com/workshop',
    github: 'https://github.com/nazieraaziz/workshop',
    image: null,
  },
  {
    id: 'p2',
    title: 'Family Support Guide',
    description: 'A digital guide for parents and caregivers with practical strategies for everyday support.',
    category: 'Guide',
    website: 'https://nazieraaziz.com/support-guide',
    github: 'https://github.com/nazieraaziz/support-guide',
    image: null,
  },
];

function renderPortfolioList() {
  portfolioList.innerHTML = projects
    .map((project) => {
      return `
        <div class="project-card" data-id="${project.id}">
          <div class="project-card-header">
            <div>
              <h4>${project.title}</h4>
              <p class="project-category">${project.category}</p>
            </div>
            <div class="project-card-actions">
              <button class="action-button edit" data-action="edit" data-id="${project.id}">Edit</button>
              <button class="action-button delete" data-action="delete" data-id="${project.id}">Delete</button>
            </div>
          </div>
          <p>${project.description}</p>
          <div class="project-card-actions">
            <a class="hero-preview-button" href="${project.website}" target="_blank">Website</a>
            <a class="hero-preview-button" href="${project.github}" target="_blank">GitHub</a>
          </div>
        </div>
      `;
    })
    .join('');
}

function resetPortfolioForm() {
  projectIdInput.value = '';
  portfolioForm.projectTitle.value = '';
  portfolioForm.projectDescription.value = '';
  portfolioForm.projectCategory.value = '';
  portfolioForm.projectWebsite.value = '';
  portfolioForm.projectGithub.value = '';
  projectImageInput.value = '';
  portfolioPreviewImage.style.backgroundImage = 'none';
  portfolioPreviewImage.textContent = 'Image preview';
  portfolioPreviewTitle.textContent = 'Project title';
  portfolioPreviewDescription.textContent = 'Project description preview will appear here.';
  portfolioPreviewCategory.textContent = 'Category';
  portfolioPreviewWebsite.href = '#';
  portfolioPreviewWebsite.textContent = 'View site';
  portfolioPreviewGithub.href = '#';
  portfolioPreviewGithub.textContent = 'View repo';
}

function updatePortfolioPreview() {
  const title = portfolioForm.projectTitle.value.trim() || 'Project title';
  const description = portfolioForm.projectDescription.value.trim() || 'Project description preview will appear here.';
  const category = portfolioForm.projectCategory.value.trim() || 'Category';
  const website = portfolioForm.projectWebsite.value.trim() || '#';
  const github = portfolioForm.projectGithub.value.trim() || '#';

  portfolioPreviewTitle.textContent = title;
  portfolioPreviewDescription.textContent = description;
  portfolioPreviewCategory.textContent = category;
  portfolioPreviewWebsite.href = website;
  portfolioPreviewWebsite.textContent = website === '#' ? 'View site' : 'View site';
  portfolioPreviewGithub.href = github;
  portfolioPreviewGithub.textContent = github === '#' ? 'View repo' : 'View repo';
}

projectImageInput.addEventListener('change', () => {
  loadImagePreview(projectImageInput, portfolioPreviewImage, 'Image preview');
});

portfolioForm.addEventListener('input', updatePortfolioPreview);

portfolioPreviewButton.addEventListener('click', () => {
  updatePortfolioPreview();
  portfolioPreviewButton.textContent = 'Preview updated';
  setTimeout(() => {
    portfolioPreviewButton.textContent = 'Preview';
  }, 1400);
});

function savePortfolioProject() {
  const id = projectIdInput.value || `p${Date.now()}`;
  const project = {
    id,
    title: portfolioForm.projectTitle.value.trim() || 'Untitled project',
    description: portfolioForm.projectDescription.value.trim() || 'No description was provided.',
    category: portfolioForm.projectCategory.value.trim() || 'General',
    website: portfolioForm.projectWebsite.value.trim() || '#',
    github: portfolioForm.projectGithub.value.trim() || '#',
    image: null,
  };

  const existingIndex = projects.findIndex((item) => item.id === id);
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.unshift(project);
  }
  renderPortfolioList();
  resetPortfolioForm();
}

portfolioSaveButton.addEventListener('click', () => {
  savePortfolioProject();
  portfolioSaveButton.textContent = 'Saved';
  portfolioSaveButton.disabled = true;
  setTimeout(() => {
    portfolioSaveButton.textContent = 'Save Project';
    portfolioSaveButton.disabled = false;
  }, 1200);
});

portfolioList.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  const id = event.target.dataset.id;
  if (!action || !id) return;

  if (action === 'edit') {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    projectIdInput.value = project.id;
    portfolioForm.projectTitle.value = project.title;
    portfolioForm.projectDescription.value = project.description;
    portfolioForm.projectCategory.value = project.category;
    portfolioForm.projectWebsite.value = project.website;
    portfolioForm.projectGithub.value = project.github;
    updatePortfolioPreview();
  }

  if (action === 'delete') {
    projects = projects.filter((item) => item.id !== id);
    renderPortfolioList();
  }
});

renderPortfolioList();
updatePortfolioPreview();
updateContactPreview();
