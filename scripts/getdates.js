// actual year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// last update of the document
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modification: " + lastModified;