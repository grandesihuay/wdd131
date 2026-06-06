/* ============================================================
   filtered-temples.js
   1. Temple data array (7 provided + 3 added)
   2. Dynamic card rendering via DOM manipulation
   3. Nav filter logic (Home / Old / New / Large / Small)
   4. Responsive hamburger menu
   5. Footer: copyright year & last modified
   ============================================================ */

'use strict';

/* ── ① TEMPLE DATA ────────────────────────────────────────── */

const temples = [
  /* ---------- original 7 ---------- */
  {
    templeName: "Aba Nigeria",
    location:   "Aba, Nigeria",
    dedicated:  "2005, August, 7",
    area:       11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location:   "Manti, Utah, United States",
    dedicated:  "1888, May, 21",
    area:       74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location:   "Payson, Utah, United States",
    dedicated:  "2015, June, 7",
    area:       96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location:   "Yigo, Guam",
    dedicated:  "2020, May, 2",
    area:       6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location:   "Kensington, Maryland, United States",
    dedicated:  "1974, November, 19",
    area:       156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location:   "Lima, Perú",
    dedicated:  "1986, January, 10",
    area:       9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location:   "Mexico City, Mexico",
    dedicated:  "1983, December, 2",
    area:       116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  /* ---------- 3 added temples ----------
     St. George → OLD (1877) + LARGE (142,000 sq ft)
     Colonia Juárez → SMALL (6,800 sq ft)
     Copenhagen → NEW (2004)
  ---------------------------------------- */
  {
    templeName: "St. George Utah",
    location:   "St. George, Utah, United States",
    dedicated:  "1877, April, 6",
    area:       142000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
  },
  {
    templeName: "Colonia Juárez Chihuahua",
    location:   "Colonia Juárez, Chihuahua, Mexico",
    dedicated:  "1999, March, 27",
    area:       6800,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/colonia-juarez-chihuahua-mexico-temple/colonia-juarez-chihuahua-mexico-temple-1601-main.jpg"
  },
  {
    templeName: "Copenhagen Denmark",
    location:   "Copenhagen, Denmark",
    dedicated:  "2004, May, 23",
    area:       25820,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/copenhagen-denmark-temple/copenhagen-denmark-temple-16169-main.jpg"
  }
];

/* ── ② HELPERS ────────────────────────────────────────────── */

/**
 * Parse the year from a dedicated string like "2005, August, 7"
 * @param {string} dedicatedStr
 * @returns {number}
 */
function getDedicatedYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(',')[0].trim(), 10);
}

/* ── ③ RENDER CARDS ──────────────────────────────────────── */

/**
 * Build and inject temple cards into the gallery.
 * Each card: info block (name, location, dedicated, size) + lazy image.
 * @param {Array} list  — array of temple objects to display
 */
function displayTemples(list) {
  const gallery   = document.getElementById('gallery');
  const countEl   = document.getElementById('temple-count');

  // Clear previous cards
  gallery.innerHTML = '';

  // Update subtitle counter
  if (countEl) {
    countEl.textContent =
      list.length === 0
        ? 'No temples match this filter.'
        : `${list.length} temple${list.length !== 1 ? 's' : ''} found`;
  }

  if (list.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'no-results';
    msg.textContent = 'No temples match this filter. Try another category.';
    gallery.appendChild(msg);
    return;
  }

  list.forEach((temple) => {
    // <figure>
    const figure = document.createElement('figure');

    // Info block
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><span class="label">Location:</span> ${temple.location}</p>
      <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
      <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    `;

    // Image
    const img    = document.createElement('img');
    img.src      = temple.imageUrl;
    img.alt      = `${temple.templeName} Temple`;
    img.loading  = 'lazy';
    img.width    = 400;
    img.height   = 250;

    figure.appendChild(info);
    figure.appendChild(img);
    gallery.appendChild(figure);
  });
}

/* ── NAV FILTERING ─────────────────────────────────────── */

const navLinks  = document.querySelectorAll('#main-nav a');
const titleEl   = document.getElementById('gallery-title');

const filterMap = {
  home:  { label: 'All Temples',   fn: () => temples },
  old:   { label: 'Old Temples',   fn: () => temples.filter(t => getDedicatedYear(t.dedicated) < 1900) },
  new:   { label: 'New Temples',   fn: () => temples.filter(t => getDedicatedYear(t.dedicated) > 2000) },
  large: { label: 'Large Temples', fn: () => temples.filter(t => t.area > 90000) },
  small: { label: 'Small Temples', fn: () => temples.filter(t => t.area < 10000) }
};

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Active class
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const key    = link.dataset.filter || 'home';
    const config = filterMap[key] || filterMap.home;

    // Update heading & cards
    if (titleEl) titleEl.textContent = config.label;
    displayTemples(config.fn());

    // Close mobile nav
    closeNav();
  });
});

// Initial render — all temples
displayTemples(temples);

/* ── ⑤ HAMBURGER MENU ────────────────────────────────────── */

const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav      = document.getElementById('main-nav');

function closeNav() {
  if (!mainNav || !hamburgerBtn) return;
  mainNav.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

function toggleNav() {
  const isOpen = mainNav.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
}

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener('click', toggleNav);

  // Escape key closes nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeNav();
      hamburgerBtn.focus();
    }
  });
}

/* ── ⑥ FOOTER: year & last modified ─────────────────────── */

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModSpan = document.getElementById('last-modified');
if (lastModSpan) {
  const modified = new Date(document.lastModified);
  lastModSpan.textContent = modified.toLocaleDateString('en-US', {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
