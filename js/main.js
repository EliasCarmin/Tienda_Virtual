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

// Mostrar carrito en carrito.html
const carritoDiv = document.getElementById('carrito-items');
if (carritoDiv) {
    mostrarCarrito();
}
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }
    let total = 0;
    carritoDiv.innerHTML = '<ul class="carrito-lista"></ul>';
    const ul = carritoDiv.querySelector('.carrito-lista');
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.className = 'carrito-item';
        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img">
            <span class="carrito-nombre">${item.nombre}</span>
            <div class="carrito-cantidad-controles">
                <button class="cantidad-menos" data-id="${item.id}">-</button>
                <span class="carrito-cantidad">${item.cantidad}</span>
                <button class="cantidad-mas" data-id="${item.id}">+</button>
            </div>
            <span class="carrito-precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
            <button class="eliminar-item" data-id="${item.id}">Eliminar</button>
        `;
        ul.appendChild(li);
    });
    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrito-total';
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    carritoDiv.appendChild(totalDiv);
    // Botón para vaciar carrito
    const vaciarBtn = document.createElement('button');
    vaciarBtn.className = 'vaciar-carrito';
    vaciarBtn.textContent = 'Vaciar carrito';
    vaciarBtn.onclick = vaciarCarrito;
    carritoDiv.appendChild(vaciarBtn);
    ul.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-item')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm('¿Seguro que deseas eliminar este producto del carrito?')) {
                eliminarDelCarrito(id);
            }
        }
        if (e.target.classList.contains('cantidad-mas')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            cambiarCantidad(id, 1);
        }
        if (e.target.classList.contains('cantidad-menos')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            cambiarCantidad(id, -1);
        }
    });
}
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function vaciarCarrito() {
    if (confirm('¿Seguro que deseas vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}
function cambiarCantidad(id, delta) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad < 1) item.cantidad = 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}
// Notificación flotante al agregar producto
function mostrarNotificacion(mensaje) {
    let notif = document.createElement('div');
    notif.className = 'notificacion-flotante';
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('visible');
    }, 10);
    setTimeout(() => {
        notif.classList.remove('visible');
        setTimeout(() => notif.remove(), 400);
    }, 1800);
}
// Modifico animarBoton para mostrar notificación
if (typeof animarBoton === 'function') {
    const oldAnimarBoton = animarBoton;
    animarBoton = function(productoId) {
        oldAnimarBoton(productoId);
        mostrarNotificacion('¡Producto agregado al carrito!');
    }
} 