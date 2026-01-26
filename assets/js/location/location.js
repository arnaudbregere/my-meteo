/**
 * Gestion de la recherche et autocomplétition de villes
 */

document.addEventListener('DOMContentLoaded', function() {
  const inputSearch = document.getElementById('meteo-search-localisation');
  const submitButton = document.getElementById('meteo-search-city');
  const autocompleteContainer = document.getElementById('meteo-autocomplete');
  const suggestionsContainer = document.getElementById('meteo-suggestions');
  
  // Initialisation de la popin de validation
  PopinManager.init('popin-overlay', 'popin-container', 'popin-close');

  /**
   * Récupère les suggestions depuis Nominatim
   */
  async function fetchSuggestions(query) {
    if (query.length < 2) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=50&countrycodes=fr`
      );

      const data = await response.json();
      displaySuggestions(data);
    } catch (error) {
      console.error('Erreur suggestions:', error);
      autocompleteContainer.classList.remove('active');
    }
  }

  /**
   * Filtre les suggestions (villes/communes uniquement)
   */
  function filterCities(suggestions) {
    const validTypes = ['city', 'town', 'village'];
    return suggestions.filter(s => validTypes.includes(s.addresstype));
  }

  /**
   * Affiche les suggestions d'autocomplétion
   */
  function displaySuggestions(suggestions) {
    autocompleteContainer.innerHTML = '';
    if (!suggestions.length) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    const uniqueSuggestions = filterCities(suggestions);

    uniqueSuggestions.forEach(suggestion => {
      const div = document.createElement('div');
      div.className = 'meteo-autocomplete-item';
      div.textContent = suggestion.display_name;
      
      div.addEventListener('click', () => {
        inputSearch.value = suggestion.name;
        autocompleteContainer.classList.remove('active');
      });
      
      autocompleteContainer.appendChild(div);
    });

    autocompleteContainer.classList.add('active');
  }

  // === ÉCOUTEURS ===

  // Autocomplétation au typing
  inputSearch.addEventListener('input', (e) => {
    fetchSuggestions(e.target.value);
  });

  // Fermer suggestions au clic ailleurs
  document.addEventListener('click', (e) => {
    if (e.target !== inputSearch) {
      autocompleteContainer.classList.remove('active');
    }
  });

  // Validation au submit (directement ici, pas de fonction séparée)
  submitButton.addEventListener('click', (event) => {
    if (!inputSearch.value.trim()) {
      event.preventDefault();
      PopinManager.show();
    }
  });

  // Suggestions statiques au clic
  suggestionsContainer?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      inputSearch.value = e.target.textContent;
    }
  });
});