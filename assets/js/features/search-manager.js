import { searchCities } from '../services/location-service.js';
import { getWeatherByCoordinates } from '../services/weather-service.js';
import { getLocationCoordinates } from '../services/location-service.js';
import { addToSearchHistory } from '../services/search-history.js';

// Regex : accepte les lettres (avec accents), espaces et tirets, minimum 2 caractères
const cityPattern = /^[a-zA-Z\u00C0-\u024F\s\-']{2,}$/;

// Valide le format du champ saisie
export function validateCityInput(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: 'Veuillez saisir une ville' };
  }

  if (trimmed.length < 2) {
    return { valid: false, message: 'Minimum 2 caractères requis' };
  }

  if (!cityPattern.test(trimmed)) {
    return { valid: false, message: 'Caractères non autorisés. Lettres et tirets uniquement (pas de chiffres)' };
  }

  return { valid: true, message: '✓ Format valide' };
}

// Récupère les suggestions de villes depuis Nominatim
export async function fetchCitySuggestions(query) {
  if (query.length < 2) return [];
  
  const data = await searchCities(query);
  return filterCities(data, query);
}

// Filtre et organise les villes : lieux habités uniquement, pas de doublons, priorité aux noms commençant par la recherche
function filterCities(suggestions, query) {
  const queryLower = query.toLowerCase();
  const acceptedTypes = ['city', 'town', 'village', 'hamlet'];

  const results = [];
  const seenNames = {};

  suggestions.forEach(suggestion => {
    const name = suggestion.name;
    const nameLower = name.toLowerCase();

    if (!acceptedTypes.includes(suggestion.addresstype)) return;
    if (!nameLower.startsWith(queryLower.substring(0, 2))) return;
    if (seenNames[nameLower]) return;

    seenNames[nameLower] = true;

    if (nameLower.startsWith(queryLower)) {
      results.unshift(suggestion);
    } else {
      results.push(suggestion);
    }
  });

  return results;
}

// Récupère la météo pour une ville et l'ajoute à l'historique
export async function fetchWeatherForCity(cityName) {
  try {
    const location = await getLocationCoordinates(cityName);

    if (!location) {
      return { error: 'Ville non trouvée' };
    }

    const data = await getWeatherByCoordinates(location.lat, location.lon, location.displayName);

    if (!data?.main) {
      return { error: 'Données météo invalides' };
    }

    await addToSearchHistory(cityName);

    return { data, location: location.displayName };
  } catch (err) {
    console.error('Erreur lors du chargement:', err);
    return { error: 'Erreur lors du chargement' };
  }
}