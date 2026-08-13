export function renderHeader(activePage = '') {
  const isRoot = activePage === 'home';
  const prefix = isRoot ? '' : '../';
  const ctaBtn = (activePage === 'tool' || activePage === 'emi')
    ? ''
    : ``;
  return `
<!-- Skip to main content (keyboard / screen-reader) -->
<a href="#main-content" class="sr-only"
  style="position:absolute;top:-99px;left:0;z-index:999;padding:0.5rem 1rem;background:var(--clr-accent);color:white;border-radius:0 0 var(--rad-sm) var(--rad-sm);transition:top 0.2s"
  onfocus="this.style.top='0'">Skip to main content</a>
<div class="offline-banner" id="offlineBanner" role="alert" aria-live="assertive">
  ⚡ You are offline — DailyNumberTask still works!
</div>
<header class="site-header" role="banner">
  <div class="container">
    <a href="${prefix}index.html" class="logo" aria-label="DailyNumberTask Home">
      <div class="logo__icon" aria-hidden="true">N</div>
      <span class="logo__name">DailyNumberTask</span>
    </a>
    <nav class="site-nav" id="siteNav" role="navigation" aria-label="Main navigation">
      <a href="${prefix}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}" aria-current="${activePage === 'home' ? 'page' : 'false'}">Home</a>
      <div class="nav-dropdown">
        <button class="nav-link nav-dropdown-btn ${['tool', 'unit', 'currency', 'base', 'cheque-writer'].includes(activePage) ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">Tools ▾</button>
        <div class="nav-dropdown-content">
          <a href="${prefix}pages/tool.html" class="nav-link ${activePage === 'tool' ? 'active' : ''}" aria-current="${activePage === 'tool' ? 'page' : 'false'}">Converter</a>
          <a href="${prefix}unit/index.html" class="nav-link ${activePage === 'unit' ? 'active' : ''}" aria-current="${activePage === 'unit' ? 'page' : 'false'}">Unit Converter</a>
          <a href="${prefix}currency/index.html" class="nav-link ${activePage === 'currency' ? 'active' : ''}" aria-current="${activePage === 'currency' ? 'page' : 'false'}">Currency Converter</a>
          <a href="${prefix}base/index.html" class="nav-link ${activePage === 'base' ? 'active' : ''}" aria-current="${activePage === 'base' ? 'page' : 'false'}">Base Converter</a>
          <a href="${prefix}pages/cheque-writer.html" class="nav-link ${activePage === 'cheque-writer' ? 'active' : ''}" aria-current="${activePage === 'cheque-writer' ? 'page' : 'false'}">Cheque Writer</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <button class="nav-link nav-dropdown-btn ${['emi', 'margin', 'bmi-calculator', 'fd-calculator'].includes(activePage) ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">Calculator ▾</button>
        <div class="nav-dropdown-content">
          <a href="${prefix}pages/emi-calculator.html" class="nav-link ${activePage === 'emi' ? 'active' : ''}" aria-current="${activePage === 'emi' ? 'page' : 'false'}">EMI Calc</a>
          <a href="${prefix}pages/margin-calculator.html" class="nav-link ${activePage === 'margin' ? 'active' : ''}" aria-current="${activePage === 'margin' ? 'page' : 'false'}">Margin Calc</a>
          <a href="${prefix}pages/fd-calculator.html" class="nav-link ${activePage === 'fd-calculator' ? 'active' : ''}" aria-current="${activePage === 'fd-calculator' ? 'page' : 'false'}">FD Calc</a>
          <a href="${prefix}pages/bmi-calculator.html" class="nav-link ${activePage === 'bmi-calculator' ? 'active' : ''}" aria-current="${activePage === 'bmi-calculator' ? 'page' : 'false'}">BMI Calc</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <button class="nav-link nav-dropdown-btn ${['age-calculator', 'date-difference', 'countdown', 'timezone', 'working-days'].includes(activePage) ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">Date & Time ▾</button>
        <div class="nav-dropdown-content">
          <a href="${prefix}age-calculator/index.html" class="nav-link ${activePage === 'age-calculator' ? 'active' : ''}" aria-current="${activePage === 'age-calculator' ? 'page' : 'false'}">Age Calculator</a>
          <a href="${prefix}date-difference/index.html" class="nav-link ${activePage === 'date-difference' ? 'active' : ''}" aria-current="${activePage === 'date-difference' ? 'page' : 'false'}">Date Difference</a>
          <a href="${prefix}countdown/index.html" class="nav-link ${activePage === 'countdown' ? 'active' : ''}" aria-current="${activePage === 'countdown' ? 'page' : 'false'}">Countdown Timer</a>
          <a href="${prefix}timezone/index.html" class="nav-link ${activePage === 'timezone' ? 'active' : ''}" aria-current="${activePage === 'timezone' ? 'page' : 'false'}">Time Zone Converter</a>
          <a href="${prefix}working-days/index.html" class="nav-link ${activePage === 'working-days' ? 'active' : ''}" aria-current="${activePage === 'working-days' ? 'page' : 'false'}">Working Days Calc</a>
        </div>
      </div>
      <div class="nav-dropdown">
        <button class="nav-link nav-dropdown-btn ${['password-generator', 'uuid-generator', 'hash-generator'].includes(activePage) ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">Security ▾</button>
        <div class="nav-dropdown-content">
          <a href="${prefix}password-generator/index.html" class="nav-link ${activePage === 'password-generator' ? 'active' : ''}" aria-current="${activePage === 'password-generator' ? 'page' : 'false'}">Password Generator</a>
          <a href="${prefix}uuid-generator/index.html" class="nav-link ${activePage === 'uuid-generator' ? 'active' : ''}" aria-current="${activePage === 'uuid-generator' ? 'page' : 'false'}">UUID Generator</a>
          <a href="${prefix}hash-generator/index.html" class="nav-link ${activePage === 'hash-generator' ? 'active' : ''}" aria-current="${activePage === 'hash-generator' ? 'page' : 'false'}">Hash Generator</a>
        </div>
      </div>
      <a href="${prefix}pages/about.html"          class="nav-link ${activePage === 'about' ? 'active' : ''}" aria-current="${activePage === 'about' ? 'page' : 'false'}">About</a>
      <a href="${prefix}pages/blog.html"           class="nav-link ${activePage === 'blog' ? 'active' : ''}" aria-current="${activePage === 'blog' ? 'page' : 'false'}">Blog</a>
      <a href="${prefix}pages/contact.html"        class="nav-link ${activePage === 'contact' ? 'active' : ''}" aria-current="${activePage === 'contact' ? 'page' : 'false'}">Contact</a>
      ${ctaBtn}
      
    </nav>
    <button class="hamburger" id="hamburger" aria-expanded="false" aria-controls="siteNav" aria-label="Open navigation menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
}
export function renderFooter() {
  const year = new Date().getFullYear();
  const isRoot = !([
    '/pages/',
    '/age-calculator/',
    '/date-difference/',
    '/countdown/',
    '/timezone/',
    '/working-days/',
    '/password-generator/',
    '/uuid-generator/',
    '/hash-generator/',
    '/unit/',
    '/currency/',
    '/base/'
  ].some(dir => window.location.pathname.includes(dir)));
  const prefix = isRoot ? '' : '../';
  return `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <!-- Footer Ad Slot (hidden via CSS .ad-slot { display:none }) -->
    <div class="ad-slot ad-slot--footer" aria-hidden="true">
      <ins class="adsbygoogle" style="display:block"
        data-ad-client="ca-pub-3643864519819772" data-ad-slot="FOOTER_AD_SLOT"
        data-ad-format="auto" data-full-width-responsive="true"></ins>
    </div>
    <div class="footer-grid">
      <!-- Brand + social -->
      <div class="footer-brand">
        <div class="footer-brand__name">DailyNumberTask</div>
        <p style="color:var(--clr-accent-0);">Fast, privacy-first conversion, calculation, and date tools. Works offline and does not require an account.</p>
      </div>
      <!-- Tools column — now includes EMI Calculator -->
      <div class="footer-col">
        <div class="footer-col__title">Number</div>
        <ul class="footer-links">
          <li><a href="${prefix}pages/tool.html">Number to Words</a></li>
          <li><a href="${prefix}pages/tool.html">Currency Words</a></li>
          <li><a href="${prefix}pages/cheque-writer.html">Cheque Writer</a></li>
          <li><a href="${prefix}pages/tool.html">Roman Numerals</a></li>
          <li><a href="${prefix}pages/tool.html">Bulk Converter</a></li>
          <li><a href="${prefix}pages/emi-calculator.html">EMI Calculator</a></li>
          <li><a href="${prefix}pages/fd-calculator.html">FD Calculator</a></li>
          <li><a href="${prefix}pages/bmi-calculator.html">BMI Calculator</a></li>
          <li><a href="${prefix}pages/margin-calculator.html">Margin Calculator</a></li>
          <li><a href="${prefix}unit/index.html">Unit Converter</a></li>
          <li><a href="${prefix}currency/index.html">Currency Converter</a></li>
          <li><a href="${prefix}base/index.html">Base Converter</a></li>
          <li><a href="${prefix}pages/blog.html">Blog</a></li>
        </ul>
      </div>
      <!-- Date & Time Column -->
      <div class="footer-col">
        <div class="footer-col__title">Date &amp; Time</div>
        <ul class="footer-links">
          <li><a href="${prefix}age-calculator/index.html">Age Calculator</a></li>
          <li><a href="${prefix}date-difference/index.html">Date Difference</a></li>
          <li><a href="${prefix}countdown/index.html">Countdown Timer</a></li>
          <li><a href="${prefix}timezone/index.html">Time Zone Converter</a></li>
          <li><a href="${prefix}working-days/index.html">Working Days Calc</a></li>
        </ul>
      </div>
      <!-- Security Column -->
      <div class="footer-col">
        <div class="footer-col__title">Security</div>
        <ul class="footer-links">
          <li><a href="${prefix}password-generator/index.html">Password Gen</a></li>
          <li><a href="${prefix}uuid-generator/index.html">UUID Generator</a></li>
          <li><a href="${prefix}hash-generator/index.html">Hash Generator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col__title">Company</div>
        <ul class="footer-links">
          <li><a href="${prefix}pages/about.html">About Us</a></li>
          <li><a href="${prefix}pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col__title">Legal</div>
        <ul class="footer-links">
          <li><a href="${prefix}pages/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="${prefix}pages/terms.html">Terms of Service</a></li>
          <li><a href="${prefix}pages/disclaimer.html">Disclaimer</a></li>
          <li><a href="${prefix}pages/cookie-policy.html">Cookie Policy</a></li>
          <li><a href="${prefix}pages/copyright.html">Copyright</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${year} DailyNumberTask. All rights reserved.</p>
      <p>Built with ❤️ · 100% browser-based · No data stored · Free forever</p>
    </div>
  </div>
</footer>
<!-- Toast notification -->
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<!-- Cookie Consent Banner (GDPR / AdSense compliance) -->
<div id="cookieBanner" role="dialog" aria-label="Cookie consent" aria-modal="false" style="
  display:none;position:fixed;bottom:0;left:0;right:0;
  background:var(--clr-ink);color:rgba(255,255,255,0.85);
  padding:1rem 1.5rem;z-index:200;
  box-shadow:0 -4px 20px rgba(0,0,0,0.2);">
  <div style="max-width:var(--max-w);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;">
    <p style="font-size:var(--sz-sm);margin:0;max-width:none;color:rgba(255,255,255,0.8);">
      We use cookies to serve ads and analyse traffic. By continuing, you agree to our
      <a href="${prefix}pages/cookie-policy.html" style="color:var(--clr-accent-0);">Cookie Policy</a> and
      <a href="${prefix}pages/privacy-policy.html" style="color:var(--clr-accent-0);">Privacy Policy</a>.
    </p>
    <div style="display:flex;gap:0.5rem;flex-shrink:0;">
      <button id="cookieDecline" class="btn btn--ghost btn--sm" style="color:rgba(255,255,255,0.6);border-color:rgba(255,255,255,0.2);">Decline</button>
      <button id="cookieAccept" class="btn btn--primary btn--sm">Accept &amp; Continue</button>
    </div>
  </div>
</div>`;
}
export function initLayout() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('siteNav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      hamburger.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu');
      nav.classList.toggle('mobile-menu', !open);
      nav.classList.toggle('open', !open);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        nav.classList.remove('mobile-menu', 'open');
        hamburger.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (hamburger.getAttribute('aria-expanded') === 'true'
        && !nav.contains(e.target)
        && !hamburger.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('mobile-menu', 'open');
      }
    });
  }
  const dropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dropdown = e.currentTarget.closest('.nav-dropdown');
      dropdown.classList.toggle('open');
      const expanded = dropdown.classList.contains('open');
      e.currentTarget.setAttribute('aria-expanded', String(expanded));
    });
  });
  const updateOnlineStatus = () => {
    document.body.classList.toggle('offline', !navigator.onLine);
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
  const adSlots = document.querySelectorAll('ins.adsbygoogle');
  try {
    adSlots.forEach(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  } catch (e) { }
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    const COOKIE_KEY = 'dnt_cookie_consent';
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setTimeout(() => { banner.style.display = 'block'; }, 1200);
    }
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        banner.style.display = 'none';
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'declined');
        banner.style.display = 'none';
      });
    }
  }
}
export function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = '';
  if (type === 'success') {
    toast.textContent = '✓ ' + message;
    toast.className = 'toast success show';
  } else {
    toast.textContent = message;
    toast.className = 'toast show';
  }
  setTimeout(() => { toast.className = 'toast'; }, 2400);
}