import { updateImageSources, getCityFromURL } from "./utils/utils.js";
import { getWeather } from "./meteo-weather.js";
import { renderWeatherResults, renderError } from "./meteo-dom.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateImageSources();
  
  const cityName = getCityFromURL();
  
  if (!cityName) {
    console.error("Aucune ville trouvée dans l'URL");
    renderError();
    return;
  }
  
  try {
    const data = await getWeather(cityName, 'FR');
    
    if (!data || !data.main) {
      console.error("Données invalides reçues");
      renderError();
      return;
    }
    
    renderWeatherResults(data, cityName);
  } catch (err) {
    console.error("❌ Erreur lors du chargement:", err);
    renderError();
  }
});