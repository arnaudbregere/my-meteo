/**
 * search-history.js
 * Service de gestion de l'historique des recherches
 * Utilise localStorage pour persister les données
 */

const STORAGE_KEY = 'meteo_search_history';
const MAX_SEARCHES = 50; // Limite du nombre de recherches stockées

/**
 * Récupère tout l'historique des recherches
 * @returns {Array} Tableau de villes recherchées
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
 * Ajoute une ville à l'historique
 * @param {string} cityName - Nom de la ville à ajouter
 */
export function addToSearchHistory(cityName) {
  if (!cityName || typeof cityName !== 'string') {
    console.warn('Nom de ville invalide');
    return false;
  }

  try {
    let history = getSearchHistory();
    
    // Ajouter la recherche au début du tableau (autant avoir la dernière recherche en première position, différent du .push() qui rajoute à la fin)
    history.unshift({city : cityName, id: Date.now()});
    
    // Limiter à MAX_SEARCHES entries
    history = history.slice(0, MAX_SEARCHES);
    
    // Sauvegarder
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log(`✅ Recherche ajoutée: ${cityName}`);
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
 * Supprime une ville spécifique de l'historique
 * @param {string} cityName - Nom de la ville à supprimer
 */
export function removeFromSearchHistory(cityName) {
  try {
    let history = getSearchHistory();
    history = history.filter(city => city !== cityName); // TODO => supprimer les doublons via une nouvelle entrée : id: {timestamp} dans mon Object (LS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log(`✅ Recherche supprimée: ${cityName}`);
    return true;
  } catch (err) {
    console.error('Erreur lors de la suppression:', err);
    return false;
  }
}