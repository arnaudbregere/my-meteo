// Gestionnaire de popins/modales

const PopinManager = (() => {
  // État privé (non accessible de l'extérieur)
  let currentOverlay;
  let currentContainer;
  let currentCloseButton;

// Initialise une popin avec ses éléments DOM
  const init = (
    overlayId = 'popin-overlay',
    containerId = 'popin-container',
    closeButtonId = 'popin-close'
  ) => {
    currentOverlay = document.getElementById(overlayId);
    currentContainer = document.getElementById(containerId);
    currentCloseButton = document.getElementById(closeButtonId);

    // Vérification sécurité
    if (!currentOverlay || !currentContainer || !currentCloseButton) {
      console.error(`Erreur popin: éléments manquants (${overlayId}, ${containerId}, ${closeButtonId})`);
      return false;
    }

    // Fermer au clic bouton close
    currentCloseButton.addEventListener('click', close);

    // Fermer au clic overlay (fond sombre)
    currentOverlay.addEventListener('click', close);

    // Fermer à la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && currentOverlay.classList.contains('active')) {
        close();
      }
    });

    return true;
  };

// Affiche la popin
  const show = () => {
    if (!currentOverlay || !currentContainer) {
      console.error('Popin non initialisée');
      return false;
    }
    currentOverlay.classList.add('active');
    currentContainer.classList.add('active');
    currentCloseButton?.focus(); // Focus pour accessibilité
    return true;
  };

// Ferme la popin
  const close = () => {
    currentOverlay?.classList.remove('active');
    currentContainer?.classList.remove('active');
  };

  // Retourner API publique (pattern IIFE)
  return {
    init,
    show,
    close
  };
})();