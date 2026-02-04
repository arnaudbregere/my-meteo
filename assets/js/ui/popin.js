/**
 * Gestion de la modal d'erreur de validation
 * Module popin
 */

const PopinManager = (() => {
  let currentOverlay;
  let currentContainer;
  let currentCloseButton;


  // Initialisation de la Popin
  function init(overlayId = 'popin-overlay', containerId = 'popin-container', closeButtonId = 'popin-close') {
    currentOverlay = document.getElementById(overlayId);
    currentContainer = document.getElementById(containerId);
    currentCloseButton = document.getElementById(closeButtonId);

    if (!currentOverlay || !currentContainer || !currentCloseButton) {
      console.error(`Erreur popin: éléments manquants (${overlayId}, ${containerId}, ${closeButtonId})`);
      return false;
    }

    // Fermer en cliquant le bouton
    currentCloseButton.addEventListener('click', close);

    // Fermer en cliquant sur l'overlay
    currentOverlay.addEventListener('click', close);

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && currentOverlay.classList.contains('active')) {
        close();
      }
    });

    return true;
  }

  /* Affiche la popin */
  function show() {
    if (!currentOverlay || !currentContainer) {
      console.error('Popin non initialisée');
      return;
    }
    currentOverlay.classList.add('active');
    currentContainer.classList.add('active');
    currentCloseButton?.focus();
  }

  /**
   * Ferme la popin
   */
  function close() {
    if (currentOverlay) currentOverlay.classList.remove('active');
    if (currentContainer) currentContainer.classList.remove('active');
  }

  return {
    init,
    show,
    close
  };
})();