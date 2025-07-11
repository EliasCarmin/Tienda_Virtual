const form = document.getElementById('form-contacto');
const mensajeDiv = document.getElementById('form-mensaje');

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mensajeDiv.textContent = '';
        let valido = true;
        const nombre = form.nombre.value.trim();
        const telefono = form.telefono.value.trim();
        const email = form.email.value.trim();
        const asunto = form.asunto.value.trim();
        const motivo = form.motivo.value;
        const mensaje = form.mensaje.value.trim();
        if(nombre.length < 2) {
            valido = false;
            mensajeDiv.textContent = 'Por favor, ingresa tu nombre completo.';
        } else if(telefono && !/^\d{9,15}$/.test(telefono)) {
            valido = false;
            mensajeDiv.textContent = 'El teléfono debe tener entre 9 y 15 dígitos.';
        } else if(!/^\S+@\S+\.\S+$/.test(email)) {
            valido = false;
            mensajeDiv.textContent = 'Por favor, ingresa un email válido.';
        } else if(asunto.length < 3) {
            valido = false;
            mensajeDiv.textContent = 'Por favor, ingresa un asunto válido.';
        } else if(!motivo) {
            valido = false;
            mensajeDiv.textContent = 'Selecciona un motivo de contacto.';
        } else if(mensaje.length < 5) {
            valido = false;
            mensajeDiv.textContent = 'El mensaje es demasiado corto.';
        }
        if(valido) {
            mensajeDiv.textContent = '¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.';
            mensajeDiv.style.color = 'green';
            form.reset();
        } else {
            mensajeDiv.style.color = 'red';
        }
    });
} 