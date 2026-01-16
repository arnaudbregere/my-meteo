/**
 * Service de gestion de l'historique des recherches
 * Utilise localStorage pour persister les données
 */

const STORAGE_KEY = 'meteo_search_history';
const MAX_SEARCHES = 50; // Limite du nombre de recherches stockées

/**
 * Récupère tout l'historique des recherches
 * @returns {Array} Tableau d'objets {city, id}
 */
export function getSearchHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Erreur lors de la lecture de l\'historique:', err);
    return [];
  }
}

/**
 * Ajoute une ville à l'historique avec un timestamp comme id
 * Supprime les anciens doublons avant d'ajouter la nouvelle entrée
 * @param {string} cityName - Nom de la ville à ajouter
 * @returns {boolean} Succès de l'opération
 */
export function addToSearchHistory(cityName) {
  if (!cityName || typeof cityName !== 'string') {
    console.warn('Nom de ville invalide');
    return false;
  }

  try {
    let history = getSearchHistory();
    const trimmedCityName = cityName.trim();
    
    // Supprimer tous les doublons avec le même nom de ville (insensible à la casse)
    history = history.filter(entry => 
      entry.city.toLowerCase() !== trimmedCityName.toLowerCase()
    );
    
    // Créer un nouvel objet avec city et id (timestamp)
    const newEntry = {
      city: trimmedCityName,
      id: Date.now()
    };
    
    // Ajouter la recherche au début du tableau
    history.unshift(newEntry);
    
    // Limiter à MAX_SEARCHES entries
    history = history.slice(0, MAX_SEARCHES);
    
    // Sauvegarder
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log(`Recherche ajoutée: ${trimmedCityName}`);
    return true;
  } catch (err) {
    console.error('Erreur lors de l\'ajout à l\'historique:', err);
    return false;
  }
}

/**
 * Vide complètement l'historique
 */
export function clearSearchHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ Historique supprimé');
    return true;
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'historique:', err);
    return false;
  }
}

/**
 * Supprime une ville spécifique de l'historique par son id (timestamp)
 * @param {number} entryId - L'id (timestamp) de l'entrée à supprimer
 * @returns {boolean} Succès de l'opération
 */
export function removeFromSearchHistory(entryId) {
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