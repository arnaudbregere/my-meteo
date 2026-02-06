import { updateImageSources } from "./utils/utils.js";
import { getWeatherBatch, getRandomCities } from "./services/weather-service.js";
import { renderCitiesList, createSuggestionSkeleton } from "./ui/meteo-dom.js";
import { initSwipeGestures } from "./animations/swipe.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
  
    // Récupération de 4 villes aléatoires
    const randomCities = getRandomCities(4);
    
    // Récupération des données météo pour ces villes
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    
    // Génère 4 blocs UI vides
    createSuggestionSkeleton(4);
    
    // Affichage des suggestions
    renderCitiesList(weatherData);
    
    // Initialisation des gestes de swipe
    const listItems = document.querySelectorAll('.meteo-list-random-list li');
    await initSwipeGestures(listItems);
    
    // Au click sur une ville →  vers results.html avec URL formatté, exemple : /results.html?meteo-search-localisation=Paris
    const suggestionItems = document.querySelectorAll('.meteo-list-random-list li');
    suggestionItems.forEach((item) => {
      item.addEventListener('click', () => {
        const cityName = item.querySelector('.meteo-city span:first-child').textContent;
        if (cityName && cityName !== '--') {
          window.location.href = `results.html?meteo-search-localisation=${encodeURIComponent(cityName)}`;
        }
      });
    });
    
    // UPDATE DES IMAGES (une seule fois au chargement global)
    updateImageSources();
    
  } catch (err) {
    console.error("Erreur initialisation:", err);
  }
});