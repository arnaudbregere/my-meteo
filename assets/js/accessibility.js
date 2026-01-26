/**
 * Gestion de la police dyslexique avec fallback
 */

import { getFromStorage, saveToStorage } from './utils/storage-service.js';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('dyslexia-toggle');

  if (!toggleBtn) return;

  /**
   * Applique le mode dyslexique au DOM
   */
  function applyDyslexiaMode(isEnabled) {
    if (isEnabled) {
      body.classList.add('dyslexic-font');
      toggleBtn.classList.add('active');
      toggleBtn.textContent = 'DYS Police'
    } else {
      body.classList.remove('dyslexic-font');
      toggleBtn.classList.remove('active');
       toggleBtn.textContent = 'CLASSIQUE Police'
    }
  }

  // ===== INITIALISATION =====
  const savedMode = getFromStorage('dyslexiaMode', false);
  applyDyslexiaMode(savedMode);

  // ===== GESTION DU CLIC =====
  toggleBtn.addEventListener('click', () => {
    const isCurrentlyEnabled = body.classList.contains('dyslexic-font');
    const newState = !isCurrentlyEnabled;
    
    applyDyslexiaMode(newState);
    saveToStorage('dyslexiaMode', newState);
    
    console.log(`Mode dyslexique: ${newState ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);
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