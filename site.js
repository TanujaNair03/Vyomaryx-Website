/* Vyomaryx Aerospace - shared interactions */
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
            '<div class="flex items-center gap-3 mb-4">'+'<span style="display:block;width:36px;height:36px;flex-shrink:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><text x="40" y="68" font-family="Times New Roman, Georgia, serif" font-weight="700" font-size="74" fill="#16130E" text-anchor="middle">V</text><path d="M40,40 L32,26 L40,31 L48,26 Z" fill="#FFFFFF"/><g><rect x="35.5" y="9" width="9" height="8" rx="1.4" fill="#16130E"/><g stroke="#16130E" stroke-width="2.4" stroke-linecap="round"><line x1="37" y1="11" x2="28" y2="5"/><line x1="43" y1="11" x2="52" y2="5"/><line x1="37" y1="15" x2="29" y2="20"/><line x1="43" y1="15" x2="51" y2="20"/></g></g></svg></span>'+'<span class="font-display text-ink tracking-tight text-sm" style="font-weight:700;">VYOMARYX</span>' +
            '</div>' +
            '<p class="text-ink-soft mt-4 max-w-xs leading-relaxed">Autonomous uncrewed systems for allied and democratic forces. Sovereign by design.</p>' +
          '</div>' +
          '<div class="md:col-span-3">' +
            '<div class="eyebrow text-ink-soft mb-4">Navigate</div>' +
            '<ul class="space-y-2.5 text-sm">' +
              '<li><a class="link-underline text-ink pb-0.5" href="index.html">Home</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="services.html">Focus Areas</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="about.html">About</a></li>' +
              '<li><a class="link-underline text-ink pb-0.5" href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="md:col-span-4">' +
            '<div class="eyebrow text-ink-soft mb-4">Contact</div>' +
            '<p class="font-mono text-sm text-ink leading-relaxed">tanuja@vyomaryxaerospace.in<br>Hyderabad · Telangana · IN</p>' +
          '</div>' +
        '</div>' +
        '<div class="border-t border-line">' +
          '<div class="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between eyebrow text-ink-soft">' +
            '<span>© <span id="yr"></span> Vyomaryx Aerospace</span>' +
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
