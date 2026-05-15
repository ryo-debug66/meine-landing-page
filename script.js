// ── Topbar star rating ────────────────────────────────────────────────────────
const stars      = document.querySelectorAll('.star');
const ratingThanks = document.getElementById('ratingThanks');

stars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    const val = +star.dataset.value;
    stars.forEach(s => s.classList.toggle('hovered', +s.dataset.value <= val));
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.remove('hovered'));
  });
  star.addEventListener('click', () => {
    const val = +star.dataset.value;
    stars.forEach(s => {
      s.classList.toggle('selected', +s.dataset.value <= val);
      s.disabled = true;
    });
    const labels = ['', 'Schade!', 'Danke!', 'Gut!', 'Super!', 'Perfekt!'];
    ratingThanks.textContent = labels[val] + ' (' + val + '/5)';
  });
});

// ── Navigation scroll effect ──────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Menu tabs ─────────────────────────────────────────────────────────────────
document.querySelectorAll('.menu__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu__panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

// ── Scroll-reveal ─────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.feature, .menu-item, .testimonial, .stat, .contact__detail, .about__text p'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
revealEls.forEach(el => observer.observe(el));

// ── Reservation form ──────────────────────────────────────────────────────────
const form    = document.getElementById('reservationForm');
const success = document.getElementById('formSuccess');

// Set min date to today
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', e => {
  e.preventDefault();
  form.style.opacity = '0';
  form.style.transition = 'opacity .3s';
  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('visible');
  }, 300);
});

// ── Smooth active nav link highlight ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      const id = e.target.id;
      const link = document.querySelector(`.nav__links a[href="#${id}"]`);
      if (link) link.style.color = e.isIntersecting ? 'var(--accent)' : '';
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => navObserver.observe(s));
