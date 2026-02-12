/**
 * Services liés à la géolocalisation via Nominatim (OSM)
 * - Centraliser tous les appels réseau Nominatim
 * - Normaliser les données retournées
 * - Gérer les erreurs et cas limites
 */

import { ACCEPTED_TYPES } from '../utils/utils.js';

import { NOMINATIM_API } from '../config/api-endpoints.js';


export async function searchCities(query, limit = 50) {
  try {
    const url = `${NOMINATIM_API.SEARCH}?q=${encodeURIComponent(query)}&format=json&limit=${limit}&countrycodes=fr`;
    const response = await fetch(url);

    // Check Response
    if (!response.ok) {
      throw new Error(`Erreur serveur Nominatim: ${response.status}`);
    }

    const data = await response.json();
    
    // Check Datas
    if (!Array.isArray(data)) {
      throw new Error('Format de réponse invalide');
    }

    return data;
  } catch (error) {
    console.error(`Erreur recherche villes: ${error.message}`);
    return [];
  }
}

/**
 * Récupère les coordonnées d'une ville via Nominatim
 */
export async function getLocationCoordinates(cityName) {
  try {
    const url = `${NOMINATIM_API.SEARCH}?q=${encodeURIComponent(cityName)}&format=json&limit=5&countrycodes=fr`;
    const response = await fetch(url);

    // Check response
    if (!response.ok) {
      throw new Error(`Erreur serveur Nominatim: ${response.status}`);
    }

    const data = await response.json();

    // Check data
    if (!data || data.length === 0) {
      console.warn(`Aucune ville trouvée pour: ${cityName}`);
      return null;
    }



    const result = data.find(item =>
      ACCEPTED_TYPES.includes(item.addresstype)
    );

    if (!result) {
      return null;
    }

    // Return lat & lon
    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      displayName: result.display_name.split(',')[0],
    };
  } catch (error) {
    // Gérer l'erreur sans bloquer l'exécution
    console.error(`Erreur récupération coordonnées: ${error.message}`);
    return null;
  }
}
