import { getSearchHistory, removeFromSearchHistory, clearSearchHistory } from '../services/search-history.js';

// Récupère les données d'historique
export function getHistoryData() {
  return getSearchHistory();
}

// Supprime une entrée d'historique par ID
export function deleteHistoryEntry(entryId) {
  removeFromSearchHistory(entryId);
}

// Vide complètement l'historique
export function clearAllHistory() {
  clearSearchHistory();
}

// Crée un objet data pour un élément de recherche
export function createSearchItemData(entry) {
  return {
    id: entry.id,
    city: entry.city,
    url: `index.html?meteo-search-localisation=${encodeURIComponent(entry.city)}`
  };
}