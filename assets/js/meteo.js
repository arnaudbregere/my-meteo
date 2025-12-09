import { svgPath } from "./meteo-config.js";
import { getWeather } from "./meteo-api.js";

document.addEventListener("DOMContentLoaded", () => {

  // mise a jour des src d'images à partir de data-file
  document.querySelectorAll("img[data-file]").forEach(img => {
    const file = img.dataset.file; 
    img.src = svgPath + file;
  });

  // plus tard ajouter ici :
  // - gestion du formulaire
  // - favoris
  // - API météo
});


async function testWeatherAPI() {
  const data = await getWeather('Paris', 'fr');
  console.log(data);
}

 testWeatherAPI();