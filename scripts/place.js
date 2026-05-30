
'use strict';

/* ── 1. FOOTER: CURRENT YEAR ──────────────────────────────────── */

document.getElementById('current-year').textContent = new Date().getFullYear();

/* ── 2. FOOTER: LAST MODIFIED DATE ───────────────────────────── */

document.getElementById('last-modified').textContent = document.lastModified;

/* ── 3. WIND CHILL ────────────────────────────────────────────── */

// Static values — must match the temperature and wind speed
// displayed in the Weather section of the HTML.
const temperature = 8;    // °C   (Cusco, partly cloudy conditions)
const windSpeed   = 12;   // km/h

/**
 * Calculates wind chill using the Environment Canada metric formula.
 *
 * Formula (metric):
 *   WC = 13.12 + 0.6215·T − 11.37·V^0.16 + 0.3965·T·V^0.16
 *
 * @param {number} temp  – Air temperature in °C  (must be ≤ 10 °C)
 * @param {number} wind  – Wind speed in km/h      (must be > 4.8 km/h)
 * @returns {string}       Wind chill rounded to one decimal place
 */
function calculateWindChill(temp, wind) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

/*
 * Viable Wind Chill Conditions (metric):
 *   Temperature  ≤ 10 °C
 *   Wind speed   >  4.8 km/h
 *
 * Only call calculateWindChill when both conditions are met;
 * otherwise display "N/A" (not applicable).
 */
const windChillEl = document.getElementById('wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillEl.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillEl.textContent = 'N/A';
}
