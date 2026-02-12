import { SVG_PATH } from "../config/weather-config.js";

/* Normalise une chaîne : minuscules sans accents */
export const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const ACCEPTED_TYPES = ['city', 'town', 'village', 'hamlet', 'suburb']

/* Met à jour les sources des images basées sur data-file */
export function updateImageSources() {
  document.querySelectorAll("img[data-file]").forEach(img => {
    img.src = SVG_PATH + img.dataset.file;
  });
}

/* Formate une date en français */
export function formatDate(date) {
  const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return `${jours[date.getDay()]} | ${date.getDate()} ${mois[date.getMonth()]}.`;
}

/* Récupère le paramètre city depuis l'URL */
export function getCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('meteo-search-localisation');
}