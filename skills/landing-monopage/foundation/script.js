/*
  script.js — comportamento da mono-page. IDÊNTICO EM TODOS OS SITES.

  NÃO edite este arquivo por cliente: o que muda por cliente (WhatsApp, Instagram,
  mensagem) vive no `config.js` ao lado, carregado antes deste. Para mudar o
  comportamento, edite a foundation da skill e rode `_scripts/sync-foundation.ps1`,
  que propaga pra todos os sites.

  (Antes disso, este arquivo era copiado à mão em cada site e já tinha divergido:
  uns usavam a classe `.in` e outros `.visible`, só um tinha o evento de conversão,
  só dois tinham o failsafe do reveal.)
*/
document.documentElement.classList.add('js');

const CONFIG = Object.assign({
  WHATSAPP: '',
  INSTAGRAM: '',
  MSG: 'Olá! Vim pelo site e gostaria de mais informações.',
}, window.SITE_CONFIG || {});

const CTAS = '#cta-hero, #wa-float, #cta-contato';

function buildWhatsappLink(msg) {
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg || CONFIG.MSG)}`;
}

// Conversão: dispara o evento SE o pixel/tag estiver instalado. O guard é o que
// deixa o site funcionar normalmente sem nenhum rastreamento configurado.
function registrarConversaoWhatsApp() {
  if (typeof fbq === 'function') fbq('track', 'Contact');
  if (typeof gtag === 'function') gtag('event', 'conversao_whatsapp');
}

document.addEventListener('DOMContentLoaded', () => {
  // CTAs de WhatsApp. Um CTA pode sobrescrever a mensagem com data-wa-msg="..."
  // (ex: o botão no pico do antes/depois pede algo diferente do botão do herói).
  document.querySelectorAll(CTAS).forEach((el) => {
    el.href = buildWhatsappLink(el.dataset.waMsg);
    el.addEventListener('click', registrarConversaoWhatsApp);
  });

  if (CONFIG.INSTAGRAM) {
    document.querySelectorAll('#link-instagram, #footer-instagram').forEach((el) => {
      el.href = CONFIG.INSTAGRAM;
    });
  }

  // ---- Reveal on scroll. Sem JS o conteúdo já é visível (`.js .reveal` no CSS);
  // aqui ele só é animado. O failsafe garante que nada fique preso em opacity:0
  // num renderer que não rola a página (ferramenta de screenshot, crawler, webview).
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const mostrar = (el) => el.classList.add('visible');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { mostrar(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));

    const hero = document.getElementById('hero');
    if (hero) mostrar(hero); // primeira dobra: imediata, sem esperar o observer

    // failsafe em duas camadas: o que já nasce perto da viewport, e o resto depois.
    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) mostrar(el);
      });
    });
    setTimeout(() => revealEls.forEach(mostrar), 1400);
  } else {
    revealEls.forEach(mostrar);
  }

  // ---- Header: alterna .scrolled
  const header = document.getElementById('site-header');
  if (header) {
    const upd = () => header.classList.toggle('scrolled', window.scrollY > 20);
    upd();
    window.addEventListener('scroll', upd, { passive: true });
  }

  // ---- Menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    const fechar = () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    };
    navToggle.addEventListener('click', () => {
      const aberto = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(aberto));
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    siteNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', fechar));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const estavaAberto = siteNav.classList.contains('open');
      fechar();
      if (estavaAberto) navToggle.focus(); // devolve o foco pra quem abriu
    });
  }

  // ---- Esconde o FAB quando a seção Contato está visível (evita 2 botões WhatsApp)
  const waFloat = document.getElementById('wa-float');
  const contato = document.getElementById('contato');
  if (waFloat && contato && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => waFloat.classList.toggle('hidden', e.isIntersecting));
    }, { threshold: 0.25 }).observe(contato);
  }

  // ---- Scroll-spy: realça a seção ativa no menu
  if (siteNav && 'IntersectionObserver' in window) {
    const links = Array.from(siteNav.querySelectorAll('a'));
    const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (secs.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = '#' + e.target.id;
          links.forEach((a) => {
            const ativo = a.getAttribute('href') === id;
            a.classList.toggle('active', ativo);
            if (ativo) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      secs.forEach((s) => spy.observe(s));
    }
  }
});
