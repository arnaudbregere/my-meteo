/**
 * Service de gestion de l'historique des recherches
 * Utilise storage-service.js pour localStorage
 */

import { getFromStorage, saveToStorage, removeFromStorage } from '../../utils/storage-service.js';

const STORAGE_KEY = 'meteo_search_history';
const MAX_SEARCHES = 50;

/**
 * Récupère tout l'historique
 */
export function getSearchHistory() {
  return getFromStorage(STORAGE_KEY, []);
}

/**
 * Ajoute une ville à l'historique
 */
export function addToSearchHistory(cityName) {
  if (!cityName || typeof cityName !== 'string') return false;

  try {
    let history = getSearchHistory();
    const trimmedCityName = cityName.trim();
    
    // Supprimer tous les doublons avec le même nom de ville 
    history = history.filter(entry => 
      entry.city.toLowerCase() !== trimmedCityName.toLowerCase()
    );
    
    // Ajouter au début
    history.unshift({
      city: trimmedCityName,
      id: Date.now()
    });
    
    // Limiter à 50
    history = history.slice(0, MAX_SEARCHES);
    
    saveToStorage(STORAGE_KEY, history);
    console.log(`Recherche ajoutée: ${trimmedCityName}`);
    return true;
  } catch (err) {
    console.error('Erreur lors de l\'ajout à l\'historique:', err);
    return false;
  }
}

/**
 * Vide l'historique
 */
export function clearSearchHistory() {
  return removeFromStorage(STORAGE_KEY);
}

/**
 * Supprime une entrée par ID
 */
export function removeFromSearchHistory(entryId) {
  try {
    let history = getSearchHistory();
    history = history.filter(entry => entry.id !== entryId);
    return saveToStorage(STORAGE_KEY, history);
  } catch (err) {
    console.error('Erreur lors de la suppression:', err);
    return false;
  }
}