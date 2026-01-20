document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('dyslexia-toggle');

  if (!toggleBtn) return; // Sécurité si le bouton n'existe pas sur la page

  // Chargement de l'état sauvegardé
  if (localStorage.getItem('dyslexiaMode') === 'on') {
    body.classList.add('dyslexic-font');
    toggleBtn.classList.add('active');
  }

  // Gestion du clic
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dyslexic-font');
    toggleBtn.classList.toggle('active');
    const isOn = body.classList.contains('dyslexic-font');
    localStorage.setItem('dyslexiaMode', isOn ? 'on' : 'off');
  });

  // Gestion clavier Enter / Space
  toggleBtn.setAttribute('tabindex', '0');
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleBtn.click();
    }
  });
});