/* ============================================================
   temples.js
   1. Footer — dynamic copyright year & last-modified date
   2. Hamburger — responsive toggle with accessible ARIA state
   ============================================================ */

'use strict';

/* ── 1. Footer: copyright year & last modified ── */

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById('last-modified');
if (lastModifiedSpan) {
  const modified = new Date(document.lastModified);

  const options = {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  lastModifiedSpan.textContent = modified.toLocaleDateString('en-US', options);
}

/* ── 2. Hamburger toggle ── */

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav      = document.getElementById('main-nav');

/**
 * Opens or closes the mobile navigation.
 * Toggles .open on both the button (for the X animation)
 * and the nav (for the max-height reveal).
 * Also keeps aria-expanded in sync for accessibility.
 */
function toggleNav() {
  const isOpen = mainNav.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
}

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener('click', toggleNav);

  /* Close the menu when a nav link is clicked (single-page anchor jumps) */
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on Escape key for better keyboard accessibility */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.focus();
    }
  });
}
