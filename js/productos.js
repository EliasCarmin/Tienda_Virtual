const productos = [
    {
        id: 1,
        nombre: "Camisa Casual Azul",
        precio: 39.99,
        imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        descripcion: "Camisa de algodón, elegante y cómoda."
    },
    {
        id: 2,
        nombre: "Pantalón Chino Gris",
        precio: 49.99,
        imagen: "images/pantalon_chino_gris.png",
        descripcion: "Pantalón versátil para cualquier ocasión."
    },
    {
        id: 3,
        nombre: "Blazer Negro",
        precio: 89.99,
        imagen: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        descripcion: "Blazer moderno, ideal para eventos formales."
    },
    {
        id: 4,
        nombre: "Polo Básico Blanco",
        precio: 24.99,
        imagen: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        descripcion: "Polo de algodón suave, perfecto para el día a día."
    },
    {
        id: 5,
        nombre: "Jeans Slim Fit",
        precio: 59.99,
        imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
        descripcion: "Jeans azul oscuro, corte moderno y cómodo."
    },
    {
        id: 6,
        nombre: "Casaca de Cuero",
        precio: 129.99,
        imagen: "images/cuero.jpg",
        descripcion: "Casaca de cuero genuino, estilo urbano y elegante."
    },
    {
        id: 7,
        nombre: "Camisa Formal Celeste",
        precio: 44.99,
        imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        descripcion: "Camisa formal, ideal para oficina o eventos."
    },
    {
        id: 8,
        nombre: "Chaleco Acolchado",
        precio: 39.99,
        imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        descripcion: "Chaleco ligero, perfecto para entretiempo."
    },
    {
        id: 9,
        nombre: "Short Deportivo",
        precio: 19.99,
        imagen: "images/short.jpg",
        descripcion: "Short cómodo para entrenar o descansar."
    },
    {
        id: 10,
        nombre: "Abrigo Largo Gris",
        precio: 109.99,
        imagen: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        descripcion: "Abrigo elegante para el invierno."
    },
    {
        id: 11,
        nombre: "Sweater Cuello Redondo",
        precio: 34.99,
        imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        descripcion: "Sweater suave y abrigador, ideal para días frescos."
    },
    {
        id: 12,
        nombre: "Camisa Estampada",
        precio: 42.99,
        imagen: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        descripcion: "Camisa con estampado moderno, destaca tu estilo."
    }
];

const grid = document.getElementById('productos-grid');
if(grid) {
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h2>${prod.nombre}</h2>
            <p>${prod.descripcion}</p>
            <span class="precio">$${prod.precio.toFixed(2)}</span>
            <button class="btn agregar-carrito" data-id="${prod.id}">Agregar al carrito</button>
        `;
        grid.appendChild(card);
    });
}
// Lógica de carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function agregarAlCarrito(productoId) {
    const carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === productoId);
    const existe = carrito.find(item => item.id === productoId);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
    guardarCarrito(carrito);
    animarBoton(productoId);
    mostrarModalResumen(producto, existe ? existe.cantidad : 1);
}

function mostrarModalResumen(producto, cantidad) {
    const modal = document.getElementById('modal-resumen');
    const resumen = document.getElementById('resumen-producto');
    if (modal && resumen) {
        resumen.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:80px;height:80px;object-fit:cover;">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Cantidad en carrito:</strong> ${cantidad}</p>
        `;
        modal.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-resumen');
    const cerrar = document.getElementById('cerrar-modal');
    const continuar = document.getElementById('continuar-comprando');
    if (cerrar) {
        cerrar.onclick = function() {
            modal.style.display = 'none';
        };
    }
    if (continuar) {
        continuar.onclick = function() {
            modal.style.display = 'none';
        };
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
function animarBoton(productoId) {
    const btn = document.querySelector(`.agregar-carrito[data-id='${productoId}']`);
    if (btn) {
        btn.classList.add('agregado');
        setTimeout(() => btn.classList.remove('agregado'), 700);
    }
}
// Evento para los botones
if (grid) {
    grid.addEventListener('click', function(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });
} 