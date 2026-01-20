/**
 * Gestion de la modal d'erreur de validation
 * Module popin
 */

const PopinManager = (() => {
  let overlay;
  let container;
  let closeButton;

  /**
   * Initialise les éléments et les écouteurs d'événements
   */
  function init(overlayId = 'popin-overlay', containerId = 'popin-container', closeButtonId = 'popin-close') {
    overlay = document.getElementById(overlayId);
    container = document.getElementById(containerId);
    closeButton = document.getElementById(closeButtonId);

    if (!overlay || !container || !closeButton) {
      console.error('Erreur : Les éléments de la popin n\'ont pas pu être trouvés.');
      return false;
    }

    // Fermer la popin en cliquant le bouton "Fermer"
    closeButton.addEventListener('click', close);

    // Fermer la popin en cliquant sur l'overlay
    overlay.addEventListener('click', close);

    // Fermer la popin avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    return true;
  }

  /**
   * Affiche la popin d'erreur
   */
  function show() {
    overlay.classList.add('active');
    container.classList.add('active');
    // Focus sur le bouton de fermeture pour l'accessibilité
    closeButton.focus();
  }

  /**
   * Ferme la popin
   */
  function close() {
    overlay.classList.remove('active');
    container.classList.remove('active');
  }

  // API publique
  return {
    init,
    show,
    close
  };
})();