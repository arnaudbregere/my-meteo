// Affichage et gestion de l'historique des recherches sur last_search.html
// UI uniquement

import { updateImageSources } from '../utils/utils.js';
import { getHistoryData, deleteHistoryEntry, clearAllHistory, createSearchItemData } from './history-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  updateImageSources();

  const searchList = document.getElementById('meteo-search-list');
  const emptyState = document.getElementById('meteo-empty-state');
  const clearActionsDiv = document.getElementById('meteo-clear-actions');
  const clearAllBtn = document.getElementById('meteo-clear-all');

  // Initialisation de la popin de confirmation
  PopinManager.init('popin-overlay-clear', 'popin-container-clear', 'popin-cancel-clear');

  // Affiche l'historique des recherches
  function displaySearchHistory() {
    const history = getHistoryData();

    if (history.length === 0) {
      searchList.innerHTML = '';
      emptyState.style.display = 'block';
      clearActionsDiv.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    clearActionsDiv.style.display = 'block';
    searchList.innerHTML = '';

    history.forEach(entry => {
      const li = createSearchItem(entry);
      searchList.appendChild(li);
    });

    console.log(`${history.length} recherche(s) affichée(s)`);
  }

  // Crée un élément de recherche avec lien et bouton de suppression
  function createSearchItem(entry) {
    const itemData = createSearchItemData(entry);
    const li = document.createElement('li');
    li.className = 'meteo-search-item';
    li.setAttribute('data-id', itemData.id);

    // Lien vers la page résultat
    const link = document.createElement('a');
    link.href = itemData.url;
    link.className = 'meteo-search-item-link';
    link.textContent = itemData.city;

    // Bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'meteo-search-item-delete';
    deleteBtn.setAttribute('aria-label', `Supprimer la recherche: ${itemData.city}`);
    deleteBtn.innerHTML = '&times;';

    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteHistoryEntry(itemData.id);
      li.classList.add('removing');
      setTimeout(() => {
        li.remove();
        displaySearchHistory();
      }, 300);
    });

    li.appendChild(link);
    li.appendChild(deleteBtn);
    return li;
  }

  // === ÉCOUTEURS ===

  clearAllBtn.addEventListener('click', () => {
    PopinManager.show();
  });
  
  // Confirmation du vidage complet
  const confirmBtn = document.getElementById('popin-confirm-clear');
  confirmBtn?.addEventListener('click', () => {
    clearAllHistory();
    displaySearchHistory();
    console.log('Historique complètement effacé');
    PopinManager.close();
  });

  // Affichage initial
  displaySearchHistory();
});