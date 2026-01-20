import { updateImageSources } from "./utils/utils.js";
import { getSearchHistory, removeFromSearchHistory, clearSearchHistory } from "./search-history.js";

document.addEventListener("DOMContentLoaded", () => {
  updateImageSources();

  const searchList = document.getElementById('meteo-search-list');
  const emptyState = document.getElementById('meteo-empty-state');
  const clearActionsDiv = document.getElementById('meteo-clear-actions');
  const clearAllBtn = document.getElementById('meteo-clear-all');

  // Initialisation du gestionnaire de popin de confirmation
  PopinManager.init('popin-overlay-clear', 'popin-container-clear', 'popin-cancel-clear');

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

    console.log(`${history.length} recherche(s) affichée(s)`);
  }

  /**
   * Crée un élément de recherche
   * @param {Object} entry - L'objet {city, id}
   * @returns {HTMLElement} L'élément de liste
   */
  function createSearchItem(entry) {
    const li = document.createElement('li');
    li.className = 'meteo-search-item';
    li.setAttribute('data-id', entry.id); // Ajouter l'id comme attribut data

    // Contenu du lien
    const link = document.createElement('a');
    link.href = `results.html?meteo-search-localisation=${encodeURIComponent(entry.city)}`;
    link.className = 'meteo-search-item-link';
    link.textContent = entry.city;

    // Bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'meteo-search-item-delete';
    deleteBtn.setAttribute('aria-label', `Supprimer la recherche: ${entry.city}`);
    deleteBtn.innerHTML = '&times;'; // Croix

    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleDeleteSearch(entry.id, li);
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);

    return li;
  }

  /**
   * Gère la suppression d'une recherche
   * @param {number} entryId - L'id (timestamp) de l'entrée à supprimer
   * @param {HTMLElement} element - L'élément HTML à supprimer
   */
  function handleDeleteSearch(entryId, element) {
    removeFromSearchHistory(entryId);
    
    // Animation de suppression
    element.classList.add('removing');
    setTimeout(() => {
      element.remove();
      displaySearchHistory();
    }, 300);
  }

   // Gère le vidage complet de l'historique
  function handleClearAll() {
    // Affiche la popin de confirmation
    PopinManager.show();
  }


   // Confirme la suppression complète de l'historique

  function handleConfirmClearAll() {
    clearSearchHistory();
    displaySearchHistory();
    console.log('Historique complètement effacé');
    PopinManager.close();
  }

  // Événements
  clearAllBtn.addEventListener('click', handleClearAll);
  
  // Bouton de confirmation dans la popin
  const confirmBtn = document.getElementById('popin-confirm-clear');
  confirmBtn.addEventListener('click', handleConfirmClearAll);

  // Affichage initial
  displaySearchHistory();
});