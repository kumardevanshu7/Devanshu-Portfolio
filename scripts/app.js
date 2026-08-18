// ==========================================================================
// PORTFOLIO '25 - JAVASCRIPT APPLICATION LOGIC
// Kumar Devanshu • 3x2 Projects Grid, Snake Rope Timeline & 3D Tilt
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 2. Render Portfolio Data (Projects, Profile, Certificates)
  renderPortfolio(portfolioData);

  // 3. Setup GSAP Entrance & Parallax Animations
  initAnimations();

  // 4. Setup 3D Tilt for Project Cards
  initCard3DTilt();

  // 5. Setup Dialogs (Case Study & Customizer)
  initDialogHandlers();

  // 6. Setup Snake Rope Scroll Progress
  initSnakeRopeProgress();

  // 7. Refresh Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

// ==========================================================================
// 1. SMOOTH SCROLL (LENIS)
// ==========================================================================
let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Smooth Back-to-Top Button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// ==========================================================================
// 2. RENDER PORTFOLIO DATA FROM DATA.JS
// ==========================================================================
function renderPortfolio(data) {
  // 1. Profile & Headers
  const brandNameEl = document.getElementById('brand-name-el');
  if (brandNameEl) {
    brandNameEl.innerHTML = data.profile.nameHeader.replace(/\n/g, '<br>');
  }

  const posterYearEl = document.getElementById('poster-year-el');
  if (posterYearEl) {
    posterYearEl.textContent = data.profile.portfolioYear || "'25";
  }

  const greetingEl = document.getElementById('greeting-heading');
  if (greetingEl) {
    greetingEl.textContent = data.profile.greeting;
  }

  const bioContentEl = document.getElementById('bio-content');
  if (bioContentEl) {
    bioContentEl.textContent = data.profile.bio;
  }

  const avatarCaption = document.getElementById('avatar-caption');
  if (avatarCaption) {
    avatarCaption.textContent = data.profile.roleSubtitle || "Web Developer + Freelancer";
  }

  // Handle Avatar Photo
  const avatarImgView = document.getElementById('avatar-img-view');
  const avatarPlaceholderView = document.getElementById('avatar-placeholder-view');
  if (data.profile.avatarImage && data.profile.avatarImage.trim() !== "") {
    avatarImgView.src = data.profile.avatarImage;
    avatarImgView.classList.remove('hidden');
    if (avatarPlaceholderView) avatarPlaceholderView.classList.add('hidden');
  } else {
    avatarImgView.classList.add('hidden');
    if (avatarPlaceholderView) avatarPlaceholderView.classList.remove('hidden');
  }

  // 2. Experience snake-ladder (3 rungs, names on hover / mobile tap)
  const expListEl = document.getElementById('experience-list');
  if (expListEl) {
    const jobs = data.experiences.slice(0, 2);
    expListEl.innerHTML = `
      <div class="exp-snake" id="exp-snake">
        <div class="exp-snake-track" aria-hidden="true">
          <svg viewBox="0 0 40 220" preserveAspectRatio="none" class="exp-snake-svg">
            <path d="M20 10 C34 55, 6 100, 20 145 S34 200, 20 210" fill="none" stroke="#E8DCCF" stroke-width="4" stroke-linecap="round"/>
            <path class="exp-snake-fill" d="M20 10 C34 55, 6 100, 20 145 S34 200, 20 210" fill="none" stroke="#C5A484" stroke-width="4.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="exp-snake-list">
          ${jobs.map((exp) => `
            <article class="exp-rung" data-exp-id="${exp.id}">
              <button type="button" class="name-pop-btn exp-point" aria-expanded="false" aria-label="${exp.company}">
                <span class="exp-point-logo">${exp.mark || exp.company.slice(0, 2)}</span>
                <span class="name-chip">${exp.company}</span>
              </button>
              <div class="exp-rung-card">
                <div class="exp-company">${exp.company}</div>
                <div class="exp-role">${exp.role}</div>
                <div class="exp-date">${exp.period}</div>
                <p class="exp-desc">${exp.description}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 3. Socials
  const socialListEl = document.getElementById('social-links-list');
  if (socialListEl) {
    socialListEl.innerHTML = data.socials.map((s) => {
      let iconMarkup = '';
      const iconName = s.icon.toLowerCase();
      if (iconName === 'github') {
        iconMarkup = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>`;
      } else if (iconName === 'linkedin') {
        iconMarkup = `<span style="font-family: var(--font-heading); font-weight:800; font-size:13px;">in</span>`;
      } else {
        iconMarkup = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>`;
      }
      return `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-pill">
          <div class="social-brand-icon ${iconName}">
            ${iconMarkup}
          </div>
          <span class="social-brand-name">${s.name}</span>
        </a>
      `;
    }).join('');
  }

  // 4. Tools logos grid (hover / tap shows name)
  const toolsBadgeEl = document.getElementById('tools-badge-list');
  if (toolsBadgeEl) {
    toolsBadgeEl.innerHTML = data.tools.map((t) => {
      const light = t.name === 'Express.js';
      const src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${t.icon}`;
      return `
        <button type="button" class="name-pop-btn tool-node ${light ? 'is-light' : ''}" aria-expanded="false" aria-label="${t.name}">
          <span class="tool-logo-disc">
            <img src="${src}" alt="" width="22" height="22">
          </span>
          <span class="name-chip">${t.name}</span>
        </button>
      `;
    }).join('');
  }

  bindNamePopups();

  // 5. Six Projects (3x2 Grid Deck)
  const projectsGridEl = document.getElementById('projects-3x2-deck');
  if (projectsGridEl) {
    projectsGridEl.innerHTML = data.projects.map((proj, idx) => `
      <div class="project-grid-card" data-proj-index="${idx}" style="background-color: ${proj.accentBg || '#FAF8F5'};">
        
        <!-- Top Bar: Logo Badge & Category Tag -->
        <div class="card-top-bar">
          <div class="card-logo-wrap">
            <img src="${proj.logo}" alt="${proj.title} Logo" class="card-logo-img" onerror="this.style.display='none'">
          </div>
          <span class="card-badge-pill">${proj.badge || 'Web App'}</span>
        </div>

        <!-- Visual Media Preview -->
        <div class="card-media-banner">
          <img src="${proj.previewImage}" alt="${proj.title} Preview" class="card-banner-img" loading="lazy">
        </div>

        <!-- Identity: Name & Number -->
        <div class="card-identity-row">
          <h3 class="card-proj-name">${proj.title}</h3>
          <span class="card-proj-num">${proj.number}</span>
        </div>

        <div class="card-tagline">${proj.tagline || ''}</div>
        <p class="card-review-text">${proj.shortReview || proj.overview}</p>

        <!-- Card Actions: Direct Live Visit + Deep Case Study Modal -->
        <div class="card-actions-bar">
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="live-visit-btn" title="Open ${proj.title} live in new tab">
            <span>Visit Live Site</span>
            <i data-lucide="arrow-up-right"></i>
          </a>
          <button type="button" class="case-study-trigger-btn" data-modal-trigger="${idx}" title="View deep case study details">
            <i data-lucide="info"></i>
            <span>Details</span>
          </button>
        </div>

      </div>
    `).join('');
  }

  // 6. Certificates & Milestones (Snake Rope Bullet Style — with real certificate images)
  const milestonesListEl = document.getElementById('snake-milestones-list');
  if (milestonesListEl && data.certificates) {
    milestonesListEl.innerHTML = data.certificates.map((cert) => {
      const imageCol = cert.image && cert.image.trim() !== ''
        ? `<div class="milestone-image-col" data-cert-img="${cert.image}" title="Click to view full certificate">
             <img src="${cert.image}" alt="${cert.title} Certificate" class="milestone-cert-img" loading="lazy">
           </div>`
        : `<div class="milestone-no-image">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A484" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
             <span>Offer Letter / Document</span>
           </div>`;

      const certIdBadge = cert.certId
        ? `<span class="milestone-cert-id">ID: ${cert.certId}</span>`
        : '';

      const bulletsHtml = Array.isArray(cert.bullets) && cert.bullets.length
        ? `<ul class="milestone-bullets">${cert.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
        : `<p class="milestone-desc">${cert.description || ''}</p>`;

      return `
        <div class="snake-milestone-node">
          <div class="milestone-text-col">
            <div class="milestone-head-row">
              <span class="milestone-year-badge">${cert.year}</span>
              <span class="milestone-grade-badge">${cert.grade || 'Verified'}</span>
              ${certIdBadge}
            </div>
            <h3 class="milestone-title">${cert.title}</h3>
            <div class="milestone-issuer">${cert.issuer}</div>
            ${bulletsHtml}
          </div>
          ${imageCol}
        </div>
      `;
    }).join('');

    // Attach lightbox listeners to cert image cols
    milestonesListEl.querySelectorAll('.milestone-image-col[data-cert-img]').forEach((col) => {
      col.addEventListener('click', () => {
        openCertLightbox(col.getAttribute('data-cert-img'));
      });
    });
  }

  // 7. Education (after certificates)
  const educationListEl = document.getElementById('education-list');
  if (educationListEl && data.education) {
    educationListEl.innerHTML = data.education.map((ed) => `
      <article class="education-entry">
        <div class="education-row">
          <h3 class="education-degree">${ed.degree}</h3>
          <span class="education-year">${ed.year}</span>
        </div>
        <div class="education-row">
          <p class="education-school">${ed.school}</p>
          <p class="education-location">${ed.location}</p>
        </div>
      </article>
    `).join('');
  }

  // Re-run Lucide Icons on newly created DOM elements
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================================================
// NAME CHIPS — hover on desktop, tap/click on mobile
// ==========================================================================
function bindNamePopups() {
  const buttons = document.querySelectorAll('.name-pop-btn');
  if (!buttons.length) return;

  const closeAll = (except) => {
    buttons.forEach((btn) => {
      if (btn !== except) btn.setAttribute('aria-expanded', 'false');
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

// ==========================================================================
// CERTIFICATE LIGHTBOX (Full-Screen Image Viewer)
// ==========================================================================
function openCertLightbox(imgSrc) {
  // Remove any existing lightbox first
  const existing = document.getElementById('cert-lightbox-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'cert-lightbox-overlay';
  overlay.className = 'cert-lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Certificate Preview');

  overlay.innerHTML = `
    <button class="cert-lightbox-close" id="lightbox-close-btn" aria-label="Close certificate preview">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <img src="${imgSrc}" alt="Certificate Preview" class="cert-lightbox-img" onclick="event.stopPropagation()">
  `;

  document.body.appendChild(overlay);

  // Close on backdrop click or close button
  overlay.addEventListener('click', () => overlay.remove());
  overlay.querySelector('#lightbox-close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.remove();
  });

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}



// ==========================================================================
// 3. GSAP ENTRANCE & PARALLAX ANIMATIONS
// ==========================================================================
function initAnimations() {
  const startLetterIdle = () => {
    const title = document.getElementById('poster-title');
    if (title) title.classList.add('letters-idle');
  };

  if (typeof gsap === 'undefined') {
    startLetterIdle();
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

  // 1. Staggered Entrance for "PORTFOLIO '25" Letters
  tl.from('.letter-char', {
    y: 56,
    opacity: 0,
    rotate: (i) => (i % 2 === 0 ? -18 : 18),
    stagger: 0.045,
    duration: 0.8,
  })
  .from('.poster-year', {
    scale: 0,
    opacity: 0,
    rotate: -40,
    duration: 0.6,
    ease: 'back.out(2)',
    onComplete: startLetterIdle,
  }, '-=0.4')
  // 2. Avatar Reveal with Float
  .from('#avatar-card', {
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.9,
  }, '-=0.5')
  .from('.brand-eyebrow', {
    x: -30,
    opacity: 0,
    duration: 0.6,
  }, '-=0.6')
  // 3. Bio & Experience Stagger
  .from('.intro-section', {
    y: 30,
    opacity: 0,
    duration: 0.7,
  }, '-=0.4')
  .from('.exp-rung', {
    y: 16,
    opacity: 0,
    stagger: 0.12,
    duration: 0.55,
  }, '-=0.4')
  .from('.tool-node', {
    scale: 0.6,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
  }, '-=0.5')
  // 4. Projects 3x2 Grid Pop-In
  .from('.project-grid-card', {
    y: 40,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4');

  // Parallax on Avatar Card
  const avatarCard = document.getElementById('avatar-card');
  if (avatarCard) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(avatarCard, {
        rotationY: xPos * 8,
        rotationX: -yPos * 6,
        x: xPos * 10,
        y: yPos * 6,
        ease: 'power1.out',
        duration: 0.5,
      });
    });
  }
}

// ==========================================================================
// 4. 3D PERSPECTIVE TILT ON 3x2 PROJECT CARDS
// ==========================================================================
function initCard3DTilt() {
  const cards = document.querySelectorAll('.project-grid-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });

  // Attach Detail Button listeners
  document.querySelectorAll('[data-modal-trigger]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.getAttribute('data-modal-trigger'), 10);
      if (!isNaN(index) && portfolioData.projects[index]) {
        openCaseStudyModal(portfolioData.projects[index]);
      }
    });
  });
}

// ==========================================================================
// 5. SNAKE ROPE TIMELINE PROGRESS SCROLL
// ==========================================================================
function initSnakeRopeProgress() {
  const snakePath = document.getElementById('snake-progress-path');
  if (!snakePath) return;

  window.addEventListener('scroll', () => {
    const timelineContainer = document.getElementById('snake-timeline-container');
    if (!timelineContainer) return;

    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const total = rect.height;
      const current = windowHeight - rect.top;
      const progress = Math.min(Math.max(current / total, 0), 1);
      
      // Update dashoffset
      const pathLength = 1000;
      snakePath.style.strokeDasharray = pathLength;
      snakePath.style.strokeDashoffset = pathLength * (1 - progress);
    }
  });
}

// ==========================================================================
// 6. MODAL & DIALOG HANDLERS (CASE STUDY & CUSTOMIZER)
// ==========================================================================
function initDialogHandlers() {
  const caseDialog = document.getElementById('case-study-dialog');
  const closeCaseBtn = document.getElementById('dialog-close-btn');

  if (caseDialog) {
    caseDialog.addEventListener('close', () => {
      if (lenisInstance) lenisInstance.start();
      document.body.classList.remove('modal-open');
    });

    if (closeCaseBtn) {
      closeCaseBtn.addEventListener('click', () => {
        caseDialog.close();
      });
    }

    caseDialog.addEventListener('click', (e) => {
      if (e.target === caseDialog) {
        caseDialog.close();
      }
    });

    // Ensure touch and wheel events scroll the card directly
    const card = caseDialog.querySelector('.dialog-card');
    if (card) {
      card.addEventListener('wheel', (e) => {
        e.stopPropagation();
      }, { passive: true });
      card.addEventListener('touchmove', (e) => {
        e.stopPropagation();
      }, { passive: true });
    }
  }

  // Resume dropdown (preview + full screen)
  const resumeDropdown = document.getElementById('resume-dropdown');
  const resumeBtn = document.getElementById('resume-btn');
  const resumeMenu = document.getElementById('resume-menu');
  const resumePreview = document.getElementById('resume-preview');
  const resumeFullscreenBtn = document.getElementById('resume-fullscreen-btn');
  const resumeUrl = (portfolioData.profile && portfolioData.profile.resumeUrl) || '#';

  function drivePreviewUrl(url) {
    const match = String(url).match(/\/file\/d\/([^/]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
    return url;
  }

  if (resumeFullscreenBtn && resumeUrl && resumeUrl !== '#') {
    resumeFullscreenBtn.href = resumeUrl;
  }

  function setResumeOpen(open) {
    if (!resumeDropdown || !resumeBtn || !resumeMenu) return;
    resumeDropdown.classList.toggle('is-open', open);
    resumeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    resumeMenu.hidden = !open;
    if (open && resumePreview && resumeUrl && resumeUrl !== '#') {
      const previewSrc = drivePreviewUrl(resumeUrl);
      if (resumePreview.getAttribute('src') !== previewSrc) {
        resumePreview.src = previewSrc;
      }
      if (window.lucide) lucide.createIcons();
    }
  }

  if (resumeBtn && resumeMenu) {
    resumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!resumeUrl || resumeUrl === '#') {
        alert('Resume link abhi set nahi hai.');
        return;
      }
      setConnectOpen(false);
      setResumeOpen(resumeMenu.hidden);
    });
  }

  // Connect dropdown (email + go to mail)
  const connectDropdown = document.getElementById('connect-dropdown');
  const connectBtn = document.getElementById('connect-btn');
  const connectMenu = document.getElementById('connect-menu');
  const connectMailLink = document.getElementById('connect-mail-link');
  const connectMailId = document.getElementById('connect-mail-id');
  const profileEmail = (portfolioData.profile && portfolioData.profile.email) || 'kumardevanshu3001@gmail.com';

  if (connectMailLink) connectMailLink.href = `mailto:${profileEmail}`;
  if (connectMailId) connectMailId.textContent = profileEmail;

  function setConnectOpen(open) {
    if (!connectDropdown || !connectBtn || !connectMenu) return;
    connectDropdown.classList.toggle('is-open', open);
    connectBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    connectMenu.hidden = !open;
  }

  if (connectBtn && connectMenu) {
    connectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setResumeOpen(false);
      setConnectOpen(connectMenu.hidden);
      if (window.lucide) lucide.createIcons();
    });
  }

  document.addEventListener('click', (e) => {
    if (connectDropdown && !connectDropdown.contains(e.target)) {
      setConnectOpen(false);
    }
    if (resumeDropdown && !resumeDropdown.contains(e.target)) {
      setResumeOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setConnectOpen(false);
      setResumeOpen(false);
    }
  });

  // Customizer Dialog (kept for optional use; not shown in nav)
  const customizerDialog = document.getElementById('customizer-dialog');
  const customizerCloseBtn = document.getElementById('customizer-close-btn');

  if (customizerDialog) {
    customizerDialog.addEventListener('close', () => {
      if (lenisInstance) lenisInstance.start();
      document.body.classList.remove('modal-open');
    });


    if (customizerCloseBtn) {
      customizerCloseBtn.addEventListener('click', () => {
        customizerDialog.close();
      });
    }

    customizerDialog.addEventListener('click', (e) => {
      if (e.target === customizerDialog) {
        customizerDialog.close();
      }
    });

    const custCard = customizerDialog.querySelector('.dialog-card');
    if (custCard) {
      custCard.addEventListener('wheel', (e) => {
        e.stopPropagation();
      }, { passive: true });
      custCard.addEventListener('touchmove', (e) => {
        e.stopPropagation();
      }, { passive: true });
    }
  }

  // Customizer Tabs
  const tabBtns = document.querySelectorAll('.form-tabs-bar .tab-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (btn.getAttribute('data-tab') === 'tab-export') {
        updateExportCode();
      }
    });
  });

  // Apply Changes Button
  const applyBtn = document.getElementById('apply-changes-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      applyCustomizerValues();
      customizerDialog.close();
    });
  }

  // Copy JSON button
  const copyBtn = document.getElementById('copy-json-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const exportBox = document.getElementById('cust-export-json');
      if (exportBox) {
        exportBox.select();
        navigator.clipboard.writeText(exportBox.value).then(() => {
          copyBtn.innerHTML = '<i data-lucide="check"></i> Copied to Clipboard!';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy Configuration';
            if (window.lucide) lucide.createIcons();
          }, 2000);
        });
      }
    });
  }
}

// Open Case Study Details in Dialog
function openCaseStudyModal(project) {
  const caseDialog = document.getElementById('case-study-dialog');
  if (!caseDialog) return;

  const headerBanner = document.getElementById('modal-header-banner');
  const cardNum = document.getElementById('modal-card-num');
  const projectTag = document.getElementById('modal-project-tag');
  const projectTitle = document.getElementById('modal-project-title');
  const projectSubtitle = document.getElementById('modal-project-subtitle');
  const visualDisplay = document.getElementById('modal-visual-display');
  const overviewText = document.getElementById('modal-overview-text');
  const deliverablesList = document.getElementById('modal-deliverables-list');
  const metricsList = document.getElementById('modal-metrics-list');
  const techStackList = document.getElementById('modal-tech-stack-list');
  const actionLink = document.getElementById('modal-action-link');

  // Remove old accentBg (now full-image banner)
  if (headerBanner) {
    headerBanner.style.backgroundColor = '';
    // Optional: set a subtle accent tint via CSS var
    headerBanner.style.setProperty('--project-accent', project.accentBg || '#EFE4D8');
  }
  if (cardNum) cardNum.textContent = project.number;
  if (projectTag) projectTag.textContent = project.badge || 'Web App';
  if (projectTitle) projectTitle.textContent = project.title;
  if (projectSubtitle) projectSubtitle.textContent = project.tagline || '';

  if (visualDisplay) {
    visualDisplay.innerHTML = `<img src="${project.previewImage}" alt="${project.title} Preview">`;
  }

  if (overviewText) overviewText.textContent = project.overview;

  if (deliverablesList) {
    deliverablesList.innerHTML = (project.deliverables || []).map((d) => `
      <div class="deliverable-item-card">
        <div class="deliverable-check-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="deliverable-item-text">${d}</div>
      </div>
    `).join('');
  }

  if (metricsList) {
    metricsList.innerHTML = (project.metrics || []).map((m) => `
      <div class="metric-tile-card">
        <div class="metric-tile-val">${m.value}</div>
        <div class="metric-tile-lbl">${m.label}</div>
      </div>
    `).join('');
  }

  if (techStackList) {
    techStackList.innerHTML = (project.techStack || []).map((t) => `
      <span class="tech-tag-chip">${t}</span>
    `).join('');
  }

  if (actionLink) {
    actionLink.href = project.liveUrl || '#';
  }


  // Stop Lenis so it doesn't intercept modal scrolling
  if (lenisInstance) {
    lenisInstance.stop();
  }
  document.body.classList.add('modal-open');

  caseDialog.showModal();

  // Reset scroll position to top
  const card = caseDialog.querySelector('.dialog-card');
  if (card) {
    card.scrollTop = 0;
  }

  if (window.lucide) lucide.createIcons();
}


// Populate Customizer fields from current data
function populateCustomizerForm() {
  const custNameHeader = document.getElementById('cust-name-header');
  const custGreeting = document.getElementById('cust-greeting');
  const custBio = document.getElementById('cust-bio');
  const custResumeUrl = document.getElementById('cust-resume-url');
  const custAvatarUrl = document.getElementById('cust-avatar-url');

  if (custNameHeader) custNameHeader.value = portfolioData.profile.nameHeader;
  if (custGreeting) custGreeting.value = portfolioData.profile.greeting;
  if (custBio) custBio.value = portfolioData.profile.bio;
  if (custResumeUrl) custResumeUrl.value = portfolioData.profile.resumeUrl || '';
  if (custAvatarUrl) custAvatarUrl.value = portfolioData.profile.avatarImage || '';

  // Project cards fields (6 projects)
  const projEditList = document.getElementById('projects-quick-edit-list');
  if (projEditList) {
    projEditList.innerHTML = portfolioData.projects.map((p, idx) => `
      <div class="form-group" style="padding: 12px; background: #FAF8F5; border-radius: 8px; border: 1px solid #E5E7EB; margin-bottom: 12px;">
        <label><strong>Project ${p.number} — ${p.title}:</strong></label>
        <div class="form-group" style="margin-bottom: 6px;">
          <input type="text" id="cust-proj-title-${idx}" value="${p.title}" placeholder="Project Title">
        </div>
        <div class="form-group" style="margin-bottom: 6px;">
          <input type="text" id="cust-proj-url-${idx}" value="${p.liveUrl}" placeholder="Live URL (https://...)">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <input type="text" id="cust-proj-review-${idx}" value="${p.shortReview || ''}" placeholder="Short review / description">
        </div>
      </div>
    `).join('');
  }
}

// Apply edited values to live portfolio
function applyCustomizerValues() {
  portfolioData.profile.nameHeader = document.getElementById('cust-name-header').value;
  portfolioData.profile.greeting = document.getElementById('cust-greeting').value;
  portfolioData.profile.bio = document.getElementById('cust-bio').value;
  portfolioData.profile.resumeUrl = document.getElementById('cust-resume-url').value;
  portfolioData.profile.avatarImage = document.getElementById('cust-avatar-url').value;

  portfolioData.projects.forEach((p, idx) => {
    const titleInput = document.getElementById(`cust-proj-title-${idx}`);
    const urlInput = document.getElementById(`cust-proj-url-${idx}`);
    const reviewInput = document.getElementById(`cust-proj-review-${idx}`);

    if (titleInput) p.title = titleInput.value;
    if (urlInput) p.liveUrl = urlInput.value;
    if (reviewInput) p.shortReview = reviewInput.value;
  });

  // Re-render
  renderPortfolio(portfolioData);
  initCard3DTilt();
}

// Update Export Code Textarea
function updateExportCode() {
  const exportBox = document.getElementById('cust-export-json');
  if (exportBox) {
    exportBox.value = `const portfolioData = ${JSON.stringify(portfolioData, null, 2)};`;
  }
}
