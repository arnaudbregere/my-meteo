import { updateImageSources } from "./utils/utils.js";
import { getWeatherBatch, getRandomCities } from "./services/meteo-weather.js";
import { renderCitiesList } from "./ui/meteo-dom.js";
import { initSwipeGestures } from "./animations/swipe.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
  
    // Récupération de 4 villes aléatoires
    const randomCities = getRandomCities(4);
    
    // Récupération des données météo pour ces villes
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    
    // Affichage des suggestions
    renderCitiesList(weatherData);
    
    // Initialisation des gestes de swipe
    const listItems = document.querySelectorAll('.meteo-list-random-list li');
    await initSwipeGestures(listItems);
    
    // UPDATE DES IMAGES (une seule fois au chargement global)
    updateImageSources();
    
  } catch (err) {
    console.error("Erreur initialisation:", err);
  }
});