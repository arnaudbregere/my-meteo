
// Gestion du Menu

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.meteo-menu-button');
  const closeBtn = document.querySelector('.meteo-menu-close-button');
  const nav = document.querySelector('nav');
  const body = document.body;

  if (menuBtn && closeBtn && nav) {
    // Ouvrir le menu
    menuBtn.addEventListener('click', () => {
      nav.style.display = 'block';
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
      body.style.overflow = 'hidden'; // Empêcher le scroll du body
    });

    // Fermer le menu
    closeBtn.addEventListener('click', () => {
      nav.style.display = 'none';
      menuBtn.style.display = 'block';
      closeBtn.style.display = 'none';
      body.style.overflow = 'auto'; // Réactiver le scroll
    });

    // Fermer le menu au clic sur un lien
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.style.display = 'none';
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
        body.style.overflow = 'auto';
      });
    });
    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
      if (nav.style.display === 'block' && !nav.contains(e.target) && e.target !== menuBtn) {
        nav.style.display = 'none';
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
        body.style.overflow = 'auto';
      }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.style.display === 'block') {
        nav.style.display = 'none';
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
        body.style.overflow = 'auto';
      }
    });
  }
});