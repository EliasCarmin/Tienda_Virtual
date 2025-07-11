// Navegación responsiva
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Animación de scroll suave para los enlaces
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        // Si es navegación interna, cerrar menú en móvil
        if(window.innerWidth <= 900) {
            navLinks.classList.remove('active');
        }
    });
}); 