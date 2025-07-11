const form = document.getElementById('form-contacto');
const mensajeDiv = document.getElementById('form-mensaje');

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mensajeDiv.textContent = '';
        let valido = true;
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();
        if(nombre.length < 2) {
            valido = false;
            mensajeDiv.textContent = 'Por favor, ingresa un nombre válido.';
        } else if(!/^\S+@\S+\.\S+$/.test(email)) {
            valido = false;
            mensajeDiv.textContent = 'Por favor, ingresa un email válido.';
        } else if(mensaje.length < 5) {
            valido = false;
            mensajeDiv.textContent = 'El mensaje es demasiado corto.';
        }
        if(valido) {
            mensajeDiv.textContent = '¡Mensaje enviado correctamente!';
            mensajeDiv.style.color = 'green';
            form.reset();
        } else {
            mensajeDiv.style.color = 'red';
        }
    });
} 