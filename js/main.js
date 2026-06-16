/* ═══════════════════════════════════════════
   Muhammad Own Raza — Portfolio JS
═══════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── Year ─── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── Nav scroll shrink ─── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── Mobile burger ─── */
const burger   = document.getElementById('navBurger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  })
);

/* ─── WhatIDo card toggle ─── */
document.querySelectorAll('.wid-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.wid-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

/* ══════════════════════════════════════════
   LANDING ANIMATIONS
══════════════════════════════════════════ */
const landingTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
landingTl
  .from('.greeting',       { opacity: 0, y: 24, duration: 0.7, delay: 0.15 })
  .from('.ln-first',       { opacity: 0, y: 36, duration: 0.75 }, '-=0.3')
  .from('.ln-last',        { opacity: 0, y: 36, duration: 0.75 }, '-=0.55')
  .from('.landing-titles', { opacity: 0, y: 18, duration: 0.6  }, '-=0.4')
  .from('.landing-cta > *',{ opacity: 0, y: 18, duration: 0.5, stagger: 0.12 }, '-=0.3')
  .from('.landing-photo',  { opacity: 0, scale: 0.88, duration: 1, ease: 'power2.out' }, 0.4)
  .from('.lp-ring',        { opacity: 0, scale: 0.7, duration: 1.2, stagger: 0.2, ease: 'power2.out' }, 0.6)
  .from('.scroll-ind',     { opacity: 0, y: -10, duration: 0.5 }, '-=0.2');

/* ══════════════════════════════════════════
   SCROLL REVEAL HELPER
══════════════════════════════════════════ */
function reveal(target, vars, trigger, start) {
  gsap.from(target, {
    ...vars,
    scrollTrigger: { trigger: trigger || target, start: start || 'top 82%' }
  });
}

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
reveal('.about-img-col',  { opacity: 0, x: -36, duration: 0.8 }, '#about');
reveal('.about-text',     { opacity: 0, x: 36,  duration: 0.8 }, '#about');
reveal('.about-stats .as-item', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '#about', 'top 70%');

/* Counter animation for stats */
document.querySelectorAll('.as-num').forEach(el => {
  const target = parseInt(el.textContent.replace('+',''));
  if (isNaN(target)) return;
  const hasPlus = el.textContent.includes('+');
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target, duration: 1.4, ease: 'power2.out',
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].val) + (hasPlus ? '+' : '');
        }
      });
    }
  });
});

/* ══════════════════════════════════════════
   WHAT I DO
══════════════════════════════════════════ */
gsap.from('.wid-card', {
  opacity: 0, y: 36, duration: 0.7, stagger: 0.18, ease: 'power3.out',
  scrollTrigger: { trigger: '#whatido', start: 'top 78%' }
});

/* ══════════════════════════════════════════
   SECTION LABELS + TITLES (generic)
══════════════════════════════════════════ */
['#about','#whatido','#career','#work','#techstack','#contact'].forEach(id => {
  const el = document.querySelector(id);
  if (!el) return;
  gsap.from(el.querySelectorAll('.section-label, .section-title'), {
    opacity: 0, y: 28, duration: 0.7, stagger: 0.14, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 84%' }
  });
});

/* ══════════════════════════════════════════
   CAREER TIMELINE
══════════════════════════════════════════ */
gsap.from('.ct-line', {
  scaleY: 0, transformOrigin: 'top center', duration: 1.2, ease: 'power2.out',
  scrollTrigger: { trigger: '#career', start: 'top 75%' }
});
gsap.from('.ct-entry', {
  opacity: 0, x: -28, duration: 0.65, stagger: 0.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.ct-entries', start: 'top 80%' }
});

/* ══════════════════════════════════════════
   WORK — horizontal scroll (desktop only)
══════════════════════════════════════════ */
function initWorkScroll() {
  const workFlex = document.getElementById('workFlex');
  if (!workFlex || window.innerWidth <= 768) return;

  const totalWidth = workFlex.scrollWidth - window.innerWidth;

  gsap.to(workFlex, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '#work',
      pin: true,
      scrub: 1,
      end: '+=' + (totalWidth * 1.4)
    }
  });
}
initWorkScroll();

/* ══════════════════════════════════════════
   TECH STACK pyramid
══════════════════════════════════════════ */
gsap.from('.py-row', {
  opacity: 0, y: 24, duration: 0.55, stagger: 0.12, ease: 'power3.out',
  scrollTrigger: { trigger: '#techstack', start: 'top 78%' }
});

/* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ */
const contactTl = gsap.timeline({
  scrollTrigger: { trigger: '#contact', start: 'top 78%' }
});
contactTl
  .from('.ci-item',   { opacity: 0, y: 20, duration: 0.45, stagger: 0.14 })
  .from('.cs-link',   { opacity: 0, x: 20, duration: 0.4,  stagger: 0.1  }, '-=0.3')
  .from('.contact-footer', { opacity: 0, y: 14, duration: 0.4 }, '-=0.2');

/* ══════════════════════════════════════════
   SMOOTH ACTIVE NAV LINK
══════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));
