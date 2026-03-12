// getdates.js – WDD 131 Dynamic Web Fundamentals

// 1. Populate the current copyright year dynamically
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// 2. Populate the last modified date of the document
document.getElementById("lastModified").innerHTML =
  "Last Modification: " + document.lastModified;
