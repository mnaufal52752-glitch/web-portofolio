/**
 * NAUFAL ALTHAFA - PORTFOLIO INTERACTION ENGINE
 * Kecepatan tinggi, responsif, dan animasi mulus
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTerminalTyping();
  initProjectFilters();
  initProjectModal();
  initSkillsFilter();
  initContactForm();
  initStatsCounter();
});

/* ==========================================================================
   0. THEME TOGGLE (light ala shadcn / dark cyber) + persist localStorage
   ========================================================================== */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    if (toggle) {
      toggle.setAttribute('aria-label', dark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      applyTheme(!root.classList.contains('dark'));
    });
  }

  // Sinkron jika OS berganti tema dan user belum memilih manual
  try {
    if (!localStorage.getItem('theme')) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const sync = (e) => applyTheme(e.matches);
      if (mq.addEventListener) mq.addEventListener('change', sync);
    }
  } catch (e) {}
}

/* ==========================================================================
   1. NAVBAR & SCROLL INTERACTIONS
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow and background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Scroll spy for active navigation item
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. TERMINAL TYPING ANIMATION (CYBER CONSOLE)
   ========================================================================== */
function initTerminalTyping() {
  const cmdElem = document.getElementById('terminalCmd');
  if (!cmdElem) return;

  const commands = [
    'naufal.init({ dev: "Fullstack", sec: "Offensive & Defensive" });',
    'audit-security --target "https://web-app.local" --strict',
    'build-production --optimize --zero-vulnerability',
    'deploy-secure-stack --tls1.3 --waf-enabled'
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 60;

  function typeLoop() {
    const currentCommand = commands[cmdIndex];

    if (!isDeleting) {
      cmdElem.textContent = currentCommand.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentCommand.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2200); // Tunggu sebelum mulai menghapus
        return;
      }
    } else {
      cmdElem.textContent = currentCommand.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        setTimeout(typeLoop, 400); // Jeda sebelum mengetik perintah berikutnya
        return;
      }
    }

    const currentSpeed = isDeleting ? 30 : typingSpeed;
    setTimeout(typeLoop, currentSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   3. DATA & LOGIKA MODAL DETAIL PROJEK
   ==========================================================================
   PETUNJUK UNTUK NAUFAL:
   - Anda dapat mengisi atau mengubah projek LANGSUNG di file index.html!
   - Fungsi di bawah ini secara otomatis membaca Judul, Tag, Deskripsi, 
     Poin Keamanan (data-security), Tech Stack, dan Link dari kartu HTML Anda.
   ========================================================================== */

function initProjectModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalOverview = document.getElementById('modalOverview');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalSecurityList = document.getElementById('modalSecurityList');
  const modalDemoBtn = document.getElementById('modalDemoBtn');
  const modalGithubBtn = document.getElementById('modalGithubBtn');

  if (!modalBackdrop) return;

  const detailButtons = document.querySelectorAll('.btn-detail-trigger');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      if (!card) return;

      // Ambil data langsung dari HTML kartu yang diklik
      const title = card.querySelector('.project-title')?.textContent?.trim() || 'Judul Projek Anda';
      const badgeElem = card.querySelector('.project-type-badge');
      const tag = badgeElem?.textContent?.trim() || 'Web & Security';
      const badgeClass = badgeElem?.classList?.contains('cyber') ? 'cyber' : 'web';
      
      // Ambil overview dari data-overview kartu atau dari paragraf deskripsi
      const overview = card.getAttribute('data-overview') || 
                       card.querySelector('.project-desc')?.textContent?.trim() || 
                       'Silakan tuliskan deskripsi lengkap projek ini.';

      // Ambil poin keamanan dari attribute data-security (dipisahkan ;) atau dari span fitur keamanan
      let securityItems = [];
      if (card.getAttribute('data-security')) {
        securityItems = card.getAttribute('data-security').split(';').map(s => s.trim()).filter(Boolean);
      } else {
        const cardSec = card.querySelector('.project-security-feature span')?.textContent?.trim();
        if (cardSec) securityItems.push(cardSec);
      }

      if (securityItems.length === 0) {
        securityItems = ['Security-by-Design diterapkan pada arsitektur projek ini.'];
      }

      // Ambil chip teknologi dari kartu
      const techChips = Array.from(card.querySelectorAll('.project-tech-stack .tech-chip'))
                             .map(el => el.textContent.trim());
      const techStack = techChips.length > 0 ? techChips : ['HTML5', 'CSS3', 'JavaScript'];

      // Ambil link demo dan source code dari tombol di kartu
      const demoLink = card.querySelector('.btn-demo')?.getAttribute('href') || '#';
      const githubLink = card.querySelector('.btn-source')?.getAttribute('href') || 'https://github.com/mnaufal52752-glitch';

      // Masukkan ke dalam modal
      modalTitle.textContent = title;
      modalBadge.textContent = tag;
      modalBadge.className = `badge-pill ${badgeClass}`;
      modalOverview.textContent = overview;

      // Render daftar teknologi
      modalTechStack.innerHTML = '';
      techStack.forEach(tech => {
        const chip = document.createElement('span');
        chip.className = 'tech-chip';
        chip.textContent = tech;
        modalTechStack.appendChild(chip);
      });

      // Render daftar fitur keamanan
      modalSecurityList.innerHTML = '';
      securityItems.forEach(sec => {
        const li = document.createElement('li');
        li.textContent = sec;
        modalSecurityList.appendChild(li);
      });

      modalDemoBtn.href = demoLink;
      modalGithubBtn.href = githubLink;

      // Buka modal
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Tutup modal
  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. FILTER PROJEK
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. FILTER TAB KEAHLIAN
   ========================================================================== */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  if (!tabBtns.length || !skillCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      skillCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM DENGAN TOAST NOTIFIKASI
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const messageInput = document.getElementById('senderMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Mohon lengkapi semua kolom formulir.', 'error');
      return;
    }

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      Mengirim Enkripsi...
    `;

    // Simulasi pengiriman cepat
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();
      showToast(`Terima kasih ${nameInput.value}! Pesan aman Anda telah terkirim ke Naufal Althafa.`, 'success');
    }, 1100);
  });
}

function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4200);
}

/* ==========================================================================
   7. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          animateCount(stat, target);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateCount(element, target) {
    let current = 0;
    const duration = 1500;
    const stepTime = 30;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }
}

