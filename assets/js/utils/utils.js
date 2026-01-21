import { svgPath } from "../meteo-config.js";

export function updateImageSources() {
  document.querySelectorAll("img[data-file]").forEach(img => {
    img.src = svgPath + img.dataset.file;
  });
}

export function formatDate(date) {
  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juilet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return `${jours[date.getDay()]} | ${date.getDate()} ${mois[date.getMonth()]}.`;
}

export function getCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('meteo-search-localisation');
}