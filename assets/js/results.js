import { updateImageSources, getCityFromURL } from "./utils/utils.js";
import { getWeatherByCoordinates } from "./meteo-weather.js";
import { getLocationCoordinates } from "./location/location-service.js";
import { renderWeatherResults, renderError } from "./meteo-dom.js";
import { addToSearchHistory } from "./search-history.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateImageSources();

  const cityName = getCityFromURL();

  if (!cityName) {
    console.error("Aucune ville trouvée dans l'URL");
    renderError("Aucune ville trouvée");
    return;
  }

  try {
    console.log(`🔍 Recherche de: ${cityName}`);

    // Étape 1: Récupérer les coordonnées via Nominatim
    const location = await getLocationCoordinates(cityName);

    if (!location) {
      console.error("❌ Ville non trouvée");
      renderError("Ville non trouvée");
      return;
    }

    console.log(`✅ Coordonnées trouvées: ${location.lat}, ${location.lon}`);

    // Étape 2: Récupérer la météo avec ces coordonnées
    const data = await getWeatherByCoordinates(location.lat, location.lon, location.displayName);

    if (!data || !data.main) {
      console.error("Données météo invalides");
      renderError();
      return;
    }

    // Étape 3: Afficher les résultats
    renderWeatherResults(data, location.displayName);

    // Étape 4: Ajouter à l'historique
    addToSearchHistory(cityName);
    
  } catch (err) {
    console.error("❌ Erreur lors du chargement:", err);
    renderError();
  }
});