/* Mobile menu */
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Portfolio filter */
const filterButtons = document.querySelectorAll('[data-filter]');
const filterItems = document.querySelectorAll('[data-category]');

if (filterButtons.length && filterItems.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter;
      filterButtons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      filterItems.forEach(item => {
        const show = target === 'all' || item.dataset.category === target;
        item.classList.toggle('is-filtered-out', !show);
      });
    });
  });
}

/* Fade-up on scroll */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal');

if (reduced || !('IntersectionObserver' in window)) {
  items.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
}
