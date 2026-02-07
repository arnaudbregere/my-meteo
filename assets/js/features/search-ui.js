// Gestion de la recherche et autocomplétion de villes sur index.html
// UI uniquement

import { validateCityInput, fetchCitySuggestions, fetchWeatherForCity } from './search-manager.js';
import { renderWeatherResults, renderError } from '../ui/meteo-dom.js';
import { showSkeletonLoading, hideSkeletonLoading } from '../animations/skeleton-loader.js';
import { updateImageSources } from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', function() {

  // Récupération des éléments HTML
  const inputSearch = document.getElementById('meteo-search-localisation');
  const submitButton = document.getElementById('meteo-search-city');
  const autocompleteContainer = document.getElementById('meteo-autocomplete');
  const searchForm = document.getElementById('meteo-search-form');
  const searchResultsSection = document.getElementById('search-results-section');
  const newSearchBtn = document.getElementById('new-search-btn');

  // Initialisation Popin
  PopinManager.init('popin-overlay', 'popin-container', 'popin-close');

  let debounceTimer;

  // Affiche ou masque le message d'erreur/succès d'après la validation
  function updateValidationMessage(message = '', isValid = false, show = true) {
    let errorMsg = document.getElementById('validation-message');

    if (!errorMsg) {
      errorMsg = document.createElement('p');
      errorMsg.id = 'validation-message';
      errorMsg.className = 'meteo-validation-message';
      errorMsg.setAttribute('role', 'status');
      errorMsg.setAttribute('aria-live', 'polite');
      inputSearch.parentNode.insertBefore(errorMsg, inputSearch.nextSibling);
    }

    // Afficher et mettre à jour le message
    errorMsg.textContent = message;
    errorMsg.className = `meteo-validation-message ${isValid ? 'valid' : 'invalid'}`;
    errorMsg.style.display = show ? 'block' : 'none';
    
    if (show) {
      inputSearch.classList.toggle('has-error', !isValid);
      inputSearch.classList.toggle('has-success', isValid);
      inputSearch.setAttribute('aria-invalid', !isValid);
    } else {
      inputSearch.classList.remove('has-error', 'has-success');
      inputSearch.setAttribute('aria-invalid', 'false');
    }
  }

  // Affiche les suggestions dans le dropdown d'autocomplétion
  function displaySuggestions(suggestions, query) {
    autocompleteContainer.innerHTML = '';

    // Si aucune suggestion, masquer le dropdown et bloquer le bouton
    if (!suggestions.length) {
      autocompleteContainer.classList.remove('active');
      submitButton.disabled = true;
      updateValidationMessage('Veuillez saisir un nom de ville valide', false, true);
      return;
    }

    // Suggestions trouvées => activer le bouton
    submitButton.disabled = false;

    // Créer et afficher chaque suggestion
    suggestions.forEach(city => {
      const div = document.createElement('div');
      div.className = 'meteo-autocomplete-item';
      div.textContent = city.name;
      
      // Au clic sur une suggestion, la remplir dans l'input
      div.addEventListener('click', () => {
        inputSearch.value = city.name;
        autocompleteContainer.classList.remove('active');
        const validation = validateCityInput(city.name);
        if (validation.valid) {
          updateValidationMessage(validation.message, true, true);
          submitButton.disabled = false;
        }
      });
      
      autocompleteContainer.appendChild(div);
    });

    // Afficher le dropdown
    autocompleteContainer.classList.add('active');
  }

  // Affiche les résultats météo dans la section dédiée (colonne gauche)
  async function displayWeatherResults(cityName) {
    try {
      // Afficher le skeleton loader
      showSkeletonLoading();
      // Afficher la section résultats
      searchResultsSection.style.display = 'block';

      // Récupérer la météo
      const result = await fetchWeatherForCity(cityName);

      // Gestion erreur
      if (result.error) {
        renderError(result.error);
        return;
      }

      // Afficher les résultats
      renderWeatherResults(result.data, result.location);
      // Scroll vers les résultats
      searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    } finally {
      // Masquer le skeleton loader et le message de validation
      hideSkeletonLoading();
      updateValidationMessage('', false, false);
    }
  }

  // Ecouteurs

  // Autocomplétion avec debounce (300ms pour éviter trop d'appels API)
  inputSearch.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value;
    
    // Validation en temps réel
    const validation = validateCityInput(query);
    updateValidationMessage(validation.message, validation.valid, !!query);
    submitButton.disabled = !validation.valid;
    
    // Recherche avec debounce
    debounceTimer = setTimeout(async () => {
      if (validation.valid) {
        const suggestions = await fetchCitySuggestions(query);
        displaySuggestions(suggestions, query);
      }
    }, 300);
  });

  // Fermer suggestions au clic ailleurs
  document.addEventListener('click', (e) => {
    if (e.target !== inputSearch) {
      autocompleteContainer.classList.remove('active');
    }
  });

  // Validation et recherche au submit du formulaire
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Valider l'input
    const validation = validateCityInput(inputSearch.value);
    updateValidationMessage(validation.message, validation.valid, true);
    
    // Si invalide, afficher la popin
    if (!validation.valid) {
      PopinManager.show();
      return;
    }

    // Afficher les résultats
    const cityName = inputSearch.value.trim();
    displayWeatherResults(cityName);
  });

  // Bouton nouvelle recherche : réinitialiser le formulaire et les résultats
  newSearchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    inputSearch.value = '';
    autocompleteContainer.innerHTML = '';
    autocompleteContainer.classList.remove('active');
    searchResultsSection.style.display = 'none';
    updateValidationMessage(undefined, undefined, false); 
    submitButton.disabled = true;
    inputSearch.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // UPDATE DES IMAGES (une seule fois au chargement)
  updateImageSources();

  // Récupère la ville depuis l'URL et effectue la recherche si présente
  const urlParams = new URLSearchParams(window.location.search);
  const cityFromUrl = urlParams.get('meteo-search-localisation');
  
  if (cityFromUrl) {
    inputSearch.value = decodeURIComponent(cityFromUrl);
    displayWeatherResults(inputSearch.value);
  }
});