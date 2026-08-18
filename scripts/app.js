function bootPortfolio() {
  // 1. Render Portfolio Data FIRST so DOM elements and cards exist instantly!
  renderPortfolio(portfolioData);

  // 2. Initialize Theme Switcher (Light / Dark Editorial)
  initThemeSwitcher();

  // 3. Initialize Live IST Clock in Top Nav
  initLiveClock();

  // 4. Initialize Top Scroll Reading Progress Bar
  initScrollProgressBar();

  // 5. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 6. Setup GSAP Entrance Animations for Hero
  initAnimations();

  // 7. Setup Interactive Magnetic & Spring Physics on Title Letters
  initLettersPhysics();

  // 8. Setup Avatar Holographic Sheen & Micro-Badges Parallax
  initAvatarSheenAndParallax();

  // 9. Setup 3D Tilt & Dynamic Cursor Spotlight on Project Cards
  initCard3DTiltAndSpotlight();

  // 10. Setup Project Category Filter Tabs
  initProjectCategoryFilters();

  // 11. Setup Dialogs (Case Study & Customizer)
  initDialogHandlers();

  // 12. Setup Snake Rope Scroll Progress & Traveling Spark
  initSnakeRopeProgress();

  // 13. Setup Custom Fluid Follow Cursor (Desktop)
  initFluidCursor();

  // 14. Refresh Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootPortfolio);
} else {
  bootPortfolio();
}

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
// 2. THEME SWITCHER (LIGHT / DARK EDITORIAL)
// ==========================================================================
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  const savedTheme = localStorage.getItem('devanshu-portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-checked', 'true');
        themeToggleBtn.title = "Switch to Warm Editorial Mode (Light)";
      }
    } else {
      document.body.classList.remove('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-checked', 'false');
        themeToggleBtn.title = "Switch to Dark Midnight Mode";
      }
    }
  };

  // Initialize theme
  const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  applyTheme(initialDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-theme');
      applyTheme(isDark);
      localStorage.setItem('devanshu-portfolio-theme', isDark ? 'dark' : 'light');
    });
  }
}

// ==========================================================================
// 3. LIVE IST CLOCK (INDIAN STANDARD TIME)
// ==========================================================================
function initLiveClock() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Format compactly in Indian Standard Time (Asia/Kolkata)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    clockEl.textContent = `IST ${timeString}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ==========================================================================
// 4. TOP SCROLL READING PROGRESS BAR
// ==========================================================================
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ==========================================================================
// 5. RENDER PORTFOLIO DATA FROM DATA.JS
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

  // 2. Experience snake-ladder
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

  // 4. Tools logos grid
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
      <div class="project-grid-card" data-proj-index="${idx}" data-category="${proj.category || 'fullstack'}" style="--card-pastel: ${proj.accentBg || '#FAF8F5'};">
        
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

  // 6. Certificates & Milestones
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

  // 7. Education
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

  overlay.addEventListener('click', () => overlay.remove());
  overlay.querySelector('#lightbox-close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.remove();
  });

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// ==========================================================================
// 6. GSAP ENTRANCE ANIMATIONS
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
  .from('#avatar-card', {
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.9,
  }, '-=0.5')
  .from('.floating-micro-badge', {
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'back.out(2)',
  }, '-=0.4')
  .from('.brand-eyebrow', {
    x: -30,
    opacity: 0,
    duration: 0.6,
  }, '-=0.6')
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
  }, '-=0.5');
}

// ==========================================================================
// 7. INTERACTIVE MAGNETIC & BOUNCY PHYSICS ON TITLE LETTERS
// ==========================================================================
function initLettersPhysics() {
  const letters = document.querySelectorAll('.letter-char, .poster-year');
  if (!letters.length || typeof gsap === 'undefined') return;

  letters.forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
      const tilt = letter.querySelector('.letter-tilt');
      if (!tilt) return;

      const randomY = (Math.random() - 0.5) * 16 - 10;
      const randomRot = (Math.random() - 0.5) * 28;
      const randomScale = 1.15 + Math.random() * 0.1;

      gsap.to(tilt, {
        y: randomY,
        rotation: randomRot,
        scale: randomScale,
        duration: 0.25,
        ease: 'back.out(3)',
      });
    });

    letter.addEventListener('mouseleave', () => {
      const tilt = letter.querySelector('.letter-tilt');
      if (!tilt) return;

      gsap.to(tilt, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.4)',
      });
    });
  });
}

// ==========================================================================
// 8. AVATAR HOLOGRAPHIC SHEEN & PARALLAX MICRO-BADGES
// ==========================================================================
function initAvatarSheenAndParallax() {
  const avatarCard = document.getElementById('avatar-card');
  const avatarStage = document.getElementById('avatar-stage');
  const microBadges = document.querySelectorAll('.floating-micro-badge');

  if (!avatarCard || !avatarStage) return;

  window.addEventListener('mousemove', (e) => {
    const rect = avatarStage.getBoundingClientRect();
    const isOverStage = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

    const { innerWidth, innerHeight } = window;
    const xPos = (e.clientX / innerWidth - 0.5) * 2;
    const yPos = (e.clientY / innerHeight - 0.5) * 2;

    // Avatar 3D Perspective Tilt
    if (typeof gsap !== 'undefined') {
      gsap.to(avatarCard, {
        rotationY: xPos * 9,
        rotationX: -yPos * 7,
        x: xPos * 10,
        y: yPos * 6,
        ease: 'power1.out',
        duration: 0.5,
      });

      // Parallax for Micro-Badges
      microBadges.forEach((badge) => {
        const depth = parseFloat(badge.getAttribute('data-parallax-depth')) || 15;
        gsap.to(badge, {
          x: xPos * depth,
          y: yPos * depth,
          ease: 'power1.out',
          duration: 0.6,
        });
      });
    }

    // Update Holographic Sheen Position
    if (isOverStage) {
      const cardRect = avatarCard.getBoundingClientRect();
      const sheenX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
      const sheenY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
      avatarCard.style.setProperty('--sheen-x', `${sheenX}%`);
      avatarCard.style.setProperty('--sheen-y', `${sheenY}%`);
    }
  });
}

// ==========================================================================
// 9. 3D PERSPECTIVE TILT & SPOTLIGHT ON PROJECT CARDS
// ==========================================================================
function initCard3DTiltAndSpotlight() {
  const cards = document.querySelectorAll('.project-grid-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update Cursor-Tracked Spotlight coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
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
// 10. PROJECT CATEGORY FILTERS (INSTANT & SMOOTH)
// ==========================================================================
function initProjectCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.project-grid-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active pill
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter project cards instantly without lag
      cards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || cardCategory === filter || (filter === 'fullstack' && (cardCategory === 'fullstack' || cardCategory === 'utility'));

        if (shouldShow) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'none';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================================================
// 11. SNAKE ROPE PROGRESS & TRAVELING GLOWING SPARK
// ==========================================================================
function initSnakeRopeProgress() {
  const snakePath = document.getElementById('snake-progress-path');
  const sparkHead = document.getElementById('snake-spark-head');
  const timelineContainer = document.getElementById('snake-timeline-container');
  if (!snakePath || !sparkHead || !timelineContainer) return;

  function updateSnakeProgress() {
    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Anchor at 55% of viewport height
    const triggerY = windowHeight * 0.55;
    const current = triggerY - rect.top;
    const total = rect.height;

    const progress = Math.min(Math.max(current / total, 0), 1);

    // Total path length in SVG geometry
    const totalPathLength = snakePath.getTotalLength ? snakePath.getTotalLength() : 800;
    snakePath.style.strokeDasharray = totalPathLength;
    snakePath.style.strokeDashoffset = totalPathLength * (1 - progress);

    // Position spark circle exactly at the current leading tip of the stroke
    if (snakePath.getPointAtLength) {
      const currentLen = totalPathLength * progress;
      const pt = snakePath.getPointAtLength(currentLen);

      sparkHead.setAttribute('cx', pt.x);
      sparkHead.setAttribute('cy', pt.y);
      sparkHead.style.opacity = progress > 0.005 ? '1' : '0';

      // Turn glowing GREEN when reaching the end milestone
      if (progress >= 0.94) {
        sparkHead.classList.add('spark-complete');
        snakePath.classList.add('path-complete');
      } else {
        sparkHead.classList.remove('spark-complete');
        snakePath.classList.remove('path-complete');
      }
    }
  }

  window.addEventListener('scroll', updateSnakeProgress, { passive: true });
  window.addEventListener('resize', updateSnakeProgress, { passive: true });
  updateSnakeProgress();
}

// ==========================================================================
// 12. DIALOG HANDLERS (CASE STUDY & CUSTOMIZER)
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

  // Resume dropdown
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

  // Connect dropdown & Gmail Web Compose Launcher
  const connectDropdown = document.getElementById('connect-dropdown');
  const connectBtn = document.getElementById('connect-btn');
  const connectMenu = document.getElementById('connect-menu');
  const connectMailLink = document.getElementById('connect-mail-link');
  const connectMailId = document.getElementById('connect-mail-id');
  const connectMailGoBtn = document.getElementById('connect-mail-go-btn');
  const profileEmail = (portfolioData.profile && portfolioData.profile.email) || 'kumardevanshu3001@gmail.com';

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profileEmail)}&su=${encodeURIComponent('Hello Devanshu - Project Inquiry')}`;

  if (connectMailLink) {
    connectMailLink.href = gmailComposeUrl;
    connectMailLink.target = '_blank';
    connectMailLink.rel = 'noopener noreferrer';
  }

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

  // Handle Mail Connecting Animation and Launch
  if (connectMailLink) {
    connectMailLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (connectMailGoBtn) {
        connectMailGoBtn.classList.add('is-connecting');
        connectMailGoBtn.innerHTML = `
          <span class="mail-spinner"></span>
          <span>Connecting...</span>
        `;
      }

      setTimeout(() => {
        // Open Gmail Composer in new tab
        const win = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          // Fallback to mailto if browser blocks popup
          window.location.href = `mailto:${profileEmail}?subject=Hello%20Devanshu%20-%20Project%20Inquiry`;
        }

        if (connectMailGoBtn) {
          connectMailGoBtn.classList.remove('is-connecting');
          connectMailGoBtn.classList.add('is-connected');
          connectMailGoBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Opening Gmail!</span>
          `;

          setTimeout(() => {
            connectMailGoBtn.classList.remove('is-connected');
            connectMailGoBtn.innerHTML = `
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>
              <span>Go to mail</span>
            `;
            setConnectOpen(false);
          }, 1400);
        }
      }, 450);
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
}

// Open Case Study Details in Dialog with Count-Up Numbers
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

  if (headerBanner) {
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
        <div class="metric-tile-val" data-target-val="${m.value}">${m.value}</div>
        <div class="metric-tile-lbl">${m.label}</div>
      </div>
    `).join('');

    // Animate Metric Counters
    animateMetricCounters();
  }

  if (techStackList) {
    techStackList.innerHTML = (project.techStack || []).map((t) => `
      <span class="tech-tag-chip">${t}</span>
    `).join('');
  }

  if (actionLink) {
    actionLink.href = project.liveUrl || '#';
  }

  if (lenisInstance) {
    lenisInstance.stop();
  }
  document.body.classList.add('modal-open');

  caseDialog.showModal();

  const card = caseDialog.querySelector('.dialog-card');
  if (card) {
    card.scrollTop = 0;
  }

  if (window.lucide) lucide.createIcons();
}

// Animate Numeric Counters in Case Study
function animateMetricCounters() {
  const metricValues = document.querySelectorAll('.metric-tile-val[data-target-val]');
  metricValues.forEach((el) => {
    const rawVal = el.getAttribute('data-target-val');
    // Check if contains digits
    const numMatch = rawVal.match(/(\d+[\d,]*)/);
    if (!numMatch) return; // e.g. "AES-256" or "Multi-User"

    const cleanNum = parseFloat(numMatch[1].replace(/,/g, ''));
    if (isNaN(cleanNum) || cleanNum === 0) return;

    const prefix = rawVal.slice(0, numMatch.index);
    const suffix = rawVal.slice(numMatch.index + numMatch[0].length);

    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * cleanNum);

      el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = rawVal;
      }
    }

    requestAnimationFrame(step);
  });
}

// ==========================================================================
// 13. CUSTOM FLUID FOLLOW CURSOR (DESKTOP)
// ==========================================================================
function initFluidCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Check if touch device
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (!isMoving) {
      isMoving = true;
      document.body.classList.add('cursor-active');
    }
  });

  // Smooth Lerp animation for ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Attach hover states
  function updateCursorHoverListeners() {
    const hoverTargets = document.querySelectorAll(
      'a, button, .project-grid-card, .letter-char, .avatar-perspective-card, .milestone-image-col, .tool-node, .social-link-pill'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  updateCursorHoverListeners();
}
