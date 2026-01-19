import { updateImageSources } from "./utils/utils.js";
import { getWeatherBatch, getRandomCities } from "./meteo-weather.js";
import { renderCitiesList } from "./meteo-dom.js";
import { initSwipeGestures } from "./swipe.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateImageSources();
  
  try {
    console.log("Chargement des suggestions météo...");
    
    // Récupération de 4 villes aléatoires
    const randomCities = getRandomCities(4);
    
    // Récupération des données météo pour ces villes
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    
    // Affichage des suggestions
    renderCitiesList(weatherData);
    
    // Initialisation des gestes de swipe pour la liste
    const listItems = document.querySelectorAll('.meteo-list-random-list li');
    await initSwipeGestures(listItems);
    
    console.log("Suggestions météo chargées OK !");
  } catch (err) {
    console.error("Erreur initialisation:", err);
  }
});