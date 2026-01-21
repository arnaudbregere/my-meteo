/**
 * accessibility.js
 * Gestion de la police dyslexique avec fallback robuste
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('dyslexia-toggle');

  if (!toggleBtn) return; // Sécurité si le bouton n'existe pas sur la page

  /**
   * Récupère l'état depuis localStorage avec gestion d'erreur
   */
  function getSavedDyslexiaMode() {
    try {
      return localStorage.getItem('dyslexiaMode') === 'on';
    } catch (error) {
      console.warn('localStorage indisponible (mode privé ou restriction):', error.message);
      // Fallback : toujours retourner false si localStorage échoue
      return false;
    }
  }

  /**
   * Sauvegarde l'état avec gestion d'erreur
   */
  function saveDyslexiaMode(isEnabled) {
    try {
      localStorage.setItem('dyslexiaMode', isEnabled ? 'on' : 'off');
    } catch (error) {
      console.warn('Impossible de sauvegarder le mode dyslexique:', error.message);
      // L'application continue même si localStorage échoue
      // (le mode ne sera pas persistent, mais ça fonctionne)
    }
  }

  /**
   * Applique le mode dyslexique au DOM
   */
  function applyDyslexiaMode(isEnabled) {
    if (isEnabled) {
      body.classList.add('dyslexic-font');
      toggleBtn.classList.add('active');
    } else {
      body.classList.remove('dyslexic-font');
      toggleBtn.classList.remove('active');
    }
  }

  // ===== INITIALISATION =====
  const savedMode = getSavedDyslexiaMode();
  applyDyslexiaMode(savedMode);

  // ===== GESTION DU CLIC =====
  toggleBtn.addEventListener('click', () => {
    const isCurrentlyEnabled = body.classList.contains('dyslexic-font');
    const newState = !isCurrentlyEnabled;
    
    applyDyslexiaMode(newState);
    saveDyslexiaMode(newState);
    
    // Log pour debug
    console.log(`✓ Mode dyslexique: ${newState ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
  });

  // ===== GESTION CLAVIER (Enter / Space) =====
  toggleBtn.setAttribute('tabindex', '0');
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});