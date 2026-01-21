/**
 * Service de gestion de l'historique des recherches
 * Utilise localStorage pour persister les données
 */

const STORAGE_KEY = 'meteo_search_history';
const MAX_SEARCHES = 50;

/**
 * Test si localStorage est disponible
 */
function isLocalStorageAvailable() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage indisponible');
    return false;
  }
}

/**
 * Récupère tout l'historique
 */
export function getSearchHistory() {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Erreur lecture historique:', err);
    return [];
  }
}

/**
 * Ajoute une ville à l'historique
 */
export function addToSearchHistory(cityName) {
  if (!cityName || typeof cityName !== 'string') return false;
  if (!isLocalStorageAvailable()) {
    console.warn('Historique non sauvegardé (localStorage indisponible)');
    return false;
  }

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
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
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
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Historique supprimé');
    return true;
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'historique:', err);
    return false;
  }
}

/**
 * Supprime une entrée par ID
 */
export function removeFromSearchHistory(entryId) {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    let history = getSearchHistory();
    history = history.filter(entry => entry.id !== entryId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log(`Recherche supprimée (id: ${entryId})`);
    return true;
  } catch (err) {
    console.error('Erreur lors de la suppression:', err);
    return false;
  }
}