document.addEventListener('DOMContentLoaded', function() {
  const inputSearch = document.getElementById('meteo-search-localisation');
  const submitButton = document.getElementById('meteo-search-city');
  const autocompleteContainer = document.getElementById('meteo-autocomplete');
  const suggestionsContainer = document.getElementById('meteo-suggestions');
  
  // Éléments de la popin
  const popinOverlay = document.getElementById('popin-overlay');
  const popinContainer = document.getElementById('popin-container');
  const popinCloseButton = document.getElementById('popin-close');

  /**
   * Affiche la popin d'erreur
   */
  function showPopin() {
    popinOverlay.classList.add('active');
    popinContainer.classList.add('active');
  }

  /**
   * Ferme la popin
   */
  function closePopin() {
    popinOverlay.classList.remove('active');
    popinContainer.classList.remove('active');
  }

  /**
   * Récupère les suggestions depuis Nominatim
   */
  async function fetchSuggestions(query) {
    const options = {
      limitResponse: 50,
      france: 'fr',
      jsonFormat: 'json'
    };

    if (query.length < 2) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=${options.jsonFormat}&limit=${options.limitResponse}&countrycodes=${options.france}`
      );

      const data = await response.json();
      displaySuggestions(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      autocompleteContainer.classList.remove('active');
    }
  }

  /**
   * Filtre les suggestions (villes/communes, villages)
   */
  function filterCities(suggestions) {
    const validTypes = ['city', 'town', 'village'];
    return suggestions.filter(suggestion => validTypes.includes(suggestion.addresstype));
  }

  /**
   * Affiche les suggestions d'autocomplétation
   */
  function displaySuggestions(suggestions) {
    autocompleteContainer.innerHTML = '';
    
    if (suggestions.length === 0) {
      autocompleteContainer.classList.remove('active');
      return;
    }

    const uniqueSuggestions = filterCities(suggestions);

    uniqueSuggestions.forEach(suggestion => {
      const div = document.createElement('div');
      div.className = 'meteo-autocomplete-item';
      
      const displayName = suggestion.display_name;
      const cityName = suggestion.name;
      
      div.textContent = displayName;
      
      div.addEventListener('click', () => {
        inputSearch.value = cityName;
        autocompleteContainer.classList.remove('active');
      });
      
      autocompleteContainer.appendChild(div);
    });

    autocompleteContainer.classList.add('active');
  }

  /**
   * Valide le formulaire
   */
  function validateForm() {
    if (inputSearch.value.trim() === '') {
      showPopin();
      return false;
    }
    return true;
  }

  // Écouteur sur l'input pour l'autocomplétation
  inputSearch.addEventListener('input', (e) => {
    fetchSuggestions(e.target.value);
  });

  // Fermer les suggestions quand on clique ailleurs
  document.addEventListener('click', (e) => {
    if (e.target !== inputSearch) {
      autocompleteContainer.classList.remove('active');
    }
  });

  // Validation du formulaire au clic du bouton
  submitButton.addEventListener('click', function(event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  // Fermer la popin en cliquant le bouton "Fermer"
  popinCloseButton.addEventListener('click', closePopin);

  // Fermer la popin en cliquant sur l'overlay
  popinOverlay.addEventListener('click', closePopin);

  // Charger les suggestions statiques au chargement
  suggestionsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
      inputSearch.value = e.target.textContent;
    }
  });
});