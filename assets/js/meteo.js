import { updateImageSources } from "./utils/utils.js";
import { getWeather, getWeatherBatch, getRandomCities } from "./meteo-weather.js";
import { renderMainWeather, renderCitiesList } from "./meteo-dom.js";
import { initSwipeGestures } from "./swipe.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateImageSources();
  
  try {
    console.log("🔄 Chargement météo Paris...");
    const mainWeather = await getWeather("Paris");
    console.log("✅ Données reçues:", mainWeather); // AFFICHE LES DONNÉES
    
    renderMainWeather(mainWeather);
    
    const randomCities = getRandomCities(4);
    const weatherData = await getWeatherBatch(randomCities, 'fr');
    renderCitiesList(weatherData);
    
    const listItems = document.querySelectorAll('.meteo-list-random-list li');
    await initSwipeGestures(listItems);
  } catch (err) {
    console.error("❌ Erreur initialisation:", err);
  }
});