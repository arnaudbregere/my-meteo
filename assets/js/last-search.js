import { updateImageSources } from "./utils/utils.js";
import { getSearchHistory, removeFromSearchHistory, clearSearchHistory } from "./search-history.js";

document.addEventListener("DOMContentLoaded", () => {
  updateImageSources();

  const searchList = document.getElementById('meteo-search-list');
  const emptyState = document.getElementById('meteo-empty-state');
  const clearActionsDiv = document.getElementById('meteo-clear-actions');
  const clearAllBtn = document.getElementById('meteo-clear-all');

  /**
   * Affiche l'historique des recherches
   */
  function displaySearchHistory() {
    const history = getSearchHistory();

    if (history.length === 0) {
      searchList.innerHTML = '';
      emptyState.style.display = 'block';
      clearActionsDiv.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    clearActionsDiv.style.display = 'block';
    searchList.innerHTML = '';

    history.forEach(cityName => {
      const li = createSearchItem(cityName);
      searchList.appendChild(li);
    });

    console.log(`📋 ${history.length} recherche(s) affichée(s)`);
  }

  /**
   * Crée un élément de recherche
   * @param {string} cityName - Nom de la ville
   * @returns {HTMLElement} L'élément de liste
   */
  function createSearchItem(cityName) {
    const li = document.createElement('li');
    li.className = 'meteo-search-item';

    // Contenu du lien
    const link = document.createElement('a');
    link.href = `results.html?meteo-search-localisation=${encodeURIComponent(cityName)}`;
    link.className = 'meteo-search-item-link';
    link.textContent = cityName;

    // Bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'meteo-search-item-delete';
    deleteBtn.setAttribute('aria-label', `Supprimer la recherche: ${cityName}`);
    deleteBtn.innerHTML = '&times;'; // Croix

    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleDeleteSearch(cityName, li);
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);

    return li;
  }

  /**
   * Gère la suppression d'une recherche
   * @param {string} cityName - Nom de la ville
   * @param {HTMLElement} element - L'élément HTML à supprimer
   */
  function handleDeleteSearch(cityName, element) {
    removeFromSearchHistory(cityName);
    
    // Animation de suppression
    element.classList.add('removing');
    setTimeout(() => {
      element.remove();
      displaySearchHistory();
    }, 300);
  }

  /**
   * Gère le vidage complet de l'historique
   */
  function handleClearAll() {
    const confirmed = confirm('Êtes-vous sûr ? Cette action est irréversible.');
    if (confirmed) {
      clearSearchHistory();
      displaySearchHistory();
      console.log('🗑️ Historique complètement effacé');
    }
  }

  // Événements
  clearAllBtn.addEventListener('click', handleClearAll);

  // Affichage initial
  displaySearchHistory();
});