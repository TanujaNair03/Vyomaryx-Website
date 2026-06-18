/* Vyomaryx Aerospace — shared interactions */
(function () {
  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    var bars = toggle.querySelectorAll('span');
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) {
        bars[0].style.transform = 'translateY(6px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
      }
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        bars[0].style.transform = ''; bars[1].style.opacity = '1'; bars[2].style.transform = '';
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
  /* Backstop: ensure nothing stays hidden if observer misses anything */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 1200);
  });

  /* ---------- Footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML =
      '<footer class="border-t border-line bg-paper">' +
        '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-12">' +
          '<div class="md:col-span-5">' +
            '<div class="flex items-center gap-3 mb-4">'+'<span style="display:block;width:44px;height:30px;flex-shrink:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 56" fill="none"><line x1="0" y1="20" x2="20" y2="20" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="20" y1="20" x2="36" y2="48" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="36" y1="48" x2="52" y2="20" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="52" y1="20" x2="64" y2="10" stroke="#7A9E7E" stroke-width="2.8" stroke-linecap="round"/><line x1="64" y1="10" x2="72" y2="20" stroke="#7A9E7E" stroke-width="2.8" stroke-linecap="round"/><circle cx="36" cy="48" r="3.5" fill="#7A9E7E"/></svg></span>'+'<span class="font-display text-ink tracking-tight text-sm" style="font-weight:700;">VYOMARYX</span>' +
              '<span style="display:block;width:44px;height:30px;flex-shrink:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 56" fill="none"><line x1="0" y1="20" x2="20" y2="20" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="20" y1="20" x2="36" y2="48" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="36" y1="48" x2="52" y2="20" stroke="#1A1714" stroke-width="2.8" stroke-linecap="round"/><line x1="52" y1="20" x2="64" y2="10" stroke="#7A9E7E" stroke-width="2.8" stroke-linecap="round"/><line x1="64" y1="10" x2="72" y2="20" stroke="#7A9E7E" stroke-width="2.8" stroke-linecap="round"/><circle cx="36" cy="48" r="3.5" fill="#7A9E7E"/></svg></span>' +
            '</div>' +
            '<p class="text-ink-soft mt-4 max-w-xs leading-relaxed">Deep-tech autonomy for uncrewed aerial systems. Engineered in India for the Army, Navy, and Air Force.</p>' +
          '</div>' +
          '<div class="md:col-span-3">' +
            '<div class="eyebrow text-ink-soft mb-4">Navigate</div>' +
            '<ul class="space-y-2.5 text-sm">' +
              '<li><a class="link-underline text-ink pb-0.5" href="index.html">Home</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="services.html">Capabilities</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="about.html">About</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="md:col-span-4">' +
            '<div class="eyebrow text-ink-soft mb-4">Contact</div>' +
            '<p class="font-mono text-sm text-ink leading-relaxed">info@vyomaryxaerospace.in<br>+91 00000 00000<br>Hyderabad · Telangana · IN</p>' +
          '</div>' +
        '</div>' +
        '<div class="border-t border-line">' +
          '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between eyebrow text-ink-soft">' +
            '<span>© <span id="yr"></span> Vyomaryx Aerospace · Placeholder content</span>' +
            '<span class="text-signal">17.3850° N&nbsp;&nbsp;78.4867° E</span>' +
          '</div>' +
        '</div>' +
      '</footer>';
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.checkValidity();
      if (!ok) { form.reportValidity(); return; }
      form.classList.add('hidden');
      var done = document.getElementById('formSuccess');
      if (done) { done.classList.remove('hidden'); done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
    });
  }
})();
