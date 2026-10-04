(function () {
  'use strict';
  const root = document.documentElement;
  const title = {
    fr: 'Jason Ghattas | Ingénieur IVV / IVVQ & Intégration Systèmes E/E',
    en: 'Jason Ghattas | IVVQ & E/E Systems Integration Engineer'
  };
  const description = {
    fr: 'Portfolio de Jason Ghattas, ingénieur IVV/IVVQ spécialisé en intégration de systèmes E/E, validation ECU/HVAC, réseaux CAN/LIN et automatisation des tests.',
    en: 'Portfolio of Jason Ghattas, an IVVQ engineer focused on E/E systems integration, ECU/HVAC validation, CAN/LIN networks and test automation.'
  };
  const track = document.querySelector('.engineering-marquee-track');
  const sourceGroup = track && track.querySelector('.engineering-marquee-group');

  function rebuildMarquee() {
    if (!track || !sourceGroup) return;
    track.querySelectorAll('.engineering-marquee-group:not(:first-child)').forEach(function (node) { node.remove(); });
    const groupWidth = sourceGroup.getBoundingClientRect().width;
    if (!groupWidth) return;
    const copies = Math.max(2, Math.ceil(window.innerWidth / groupWidth) + 2);
    for (let i = 1; i < copies; i += 1) {
      const clone = sourceGroup.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
    track.style.setProperty('--marquee-distance', '-' + groupWidth + 'px');
    track.style.setProperty('--marquee-duration', Math.max(28, groupWidth / 55) + 's');
  }

  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'fr';
    root.lang = lang;
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
      if (el.classList.contains('designers')) el.setAttribute('data-text', el.textContent);
    });
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (el) { el.alt = el.getAttribute('data-alt-' + lang); });
    document.querySelectorAll('.lang-btn').forEach(function (button) {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.title = title[lang];
    document.querySelector('meta[name="description"]').content = description[lang];
    document.querySelector('meta[property="og:title"]').content = title[lang];
    document.querySelector('meta[property="og:description"]').content = description[lang];
    localStorage.setItem('jasonPortfolioLanguage', lang);
    requestAnimationFrame(rebuildMarquee);
  }

  document.querySelectorAll('.lang-btn').forEach(function (button) { button.addEventListener('click', function () { setLanguage(button.dataset.lang); }); });
  document.querySelectorAll('.main-menu a').forEach(function (link) { link.addEventListener('click', function () { document.querySelector('.main-menu').classList.remove('active'); document.querySelector('.header-bar').classList.remove('active'); }); });
  const menuButton = document.querySelector('.header-bar');
  if (menuButton) menuButton.addEventListener('click', function () { setTimeout(function () { menuButton.setAttribute('aria-expanded', String(menuButton.classList.contains('active'))); }, 0); });
  let resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(rebuildMarquee, 120); });
  if ('ResizeObserver' in window && sourceGroup) new ResizeObserver(rebuildMarquee).observe(sourceGroup);
  setLanguage(localStorage.getItem('jasonPortfolioLanguage') || 'fr');
  window.addEventListener('load', rebuildMarquee);
}());
