const productos = [
    {
        id: 1,
        nombre: "Camisa Casual Azul",
        precio: 39.99,
        imagen: "images/camisa1.jpg",
        descripcion: "Camisa de algodón, elegante y cómoda."
    },
    {
        id: 2,
        nombre: "Pantalón Chino Gris",
        precio: 49.99,
        imagen: "images/pantalon1.jpg",
        descripcion: "Pantalón versátil para cualquier ocasión."
    },
    {
        id: 3,
        nombre: "Blazer Negro",
        precio: 89.99,
        imagen: "images/blazer1.jpg",
        descripcion: "Blazer moderno, ideal para eventos formales."
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
// Aquí se puede agregar la lógica para el carrito más adelante 