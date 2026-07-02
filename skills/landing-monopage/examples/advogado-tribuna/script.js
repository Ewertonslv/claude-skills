document.documentElement.classList.add('js');

// ===== CONFIG — TODO: trocar pelos dados reais do cliente =====
const CONFIG = {
  WHATSAPP: '55XXXXXXXXXXX',   // 55 + DDD + número, só dígitos (ex: 5584996888662)
  INSTAGRAM: '',               // https://instagram.com/handle
  MSG: 'Olá! Vim pelo site e gostaria de agendar uma consulta jurídica.',
};

function buildWhatsappLink(msg) {
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // CTAs de WhatsApp
  const link = buildWhatsappLink(CONFIG.MSG);
  document.querySelectorAll('#cta-hero, #wa-float, #cta-contato').forEach((el) => { el.href = link; });
  if (CONFIG.INSTAGRAM) document.querySelectorAll('#link-instagram').forEach((el) => { el.href = CONFIG.INSTAGRAM; });

  // Reveal on scroll (default já visível sem JS)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('visible'); // primeira dobra imediata
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Header: alterna .scrolled
  const header = document.getElementById('site-header');
  if (header) {
    const upd = () => header.classList.toggle('scrolled', window.scrollY > 20);
    upd();
    window.addEventListener('scroll', upd, { passive: true });
  }

  // Menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    const close = () => { siteNav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', 'Abrir menu'); };
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    siteNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Esconde o FAB quando a seção Contato está visível (evita 2 botões WhatsApp)
  const waFloat = document.getElementById('wa-float');
  const contato = document.getElementById('contato');
  if (waFloat && contato && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => waFloat.classList.toggle('hidden', e.isIntersecting));
    }, { threshold: 0.25 }).observe(contato);
  }

  // Scroll-spy: realça a seção ativa no menu
  if (siteNav && 'IntersectionObserver' in window) {
    const links = Array.from(siteNav.querySelectorAll('a'));
    const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (secs.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = '#' + e.target.id;
          links.forEach((a) => {
            const on = a.getAttribute('href') === id;
            a.classList.toggle('active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      secs.forEach((s) => spy.observe(s));
    }
  }
});
