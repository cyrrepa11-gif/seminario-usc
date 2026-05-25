// CRUD: Evento
window.guardarEvento = function() {
    eventInfo.descripcion = document.getElementById('descEvento').value;
    eventInfo.fecha = document.getElementById('fechaEvento').value;
    eventInfo.horaInicio = document.getElementById('horaInicio').value;
    eventInfo.horaFin = document.getElementById('horaFin').value;
    guardarDatos();
    alert("Evento actualizado");
    if (window.cambiarSeccion) window.cambiarSeccion('dashboard');
};

// CRUD: Agenda
window.agregarActividad = function() {
    const hora = document.getElementById('nuevaHora').value;
    const tema = document.getElementById('nuevoTema').value;
    if(!hora || !tema) { alert("Completa hora y tema"); return; }
    agenda.push({ id: Date.now().toString(), hora, tema, speaker: document.getElementById('nuevoSpeaker').value });
    guardarDatos();
    if (window.cambiarSeccion) window.cambiarSeccion('agenda');
};

window.eliminarActividad = function(id) {
    agenda = agenda.filter(a => a.id !== id);
    guardarDatos();
    if (window.cambiarSeccion) window.cambiarSeccion('agenda');
};

// CRUD: Auspiciantes
window.agregarAuspiciante = function() {
    const nombre = document.getElementById('nombreAuspiciante').value.trim();
    if(!nombre) { alert("Ingrese nombre"); return; }
    const file = document.getElementById('imagenAuspiciante').files[0];
    const reader = new FileReader();
    reader.onload = e => {
        auspiciantes.push({ id: Date.now().toString(), nombre, imagen: e.target.result });
        guardarDatos();
        if (window.cambiarSeccion) window.cambiarSeccion('auspiciantes');
    };
    if(file) reader.readAsDataURL(file);
    else { auspiciantes.push({ id: Date.now().toString(), nombre, imagen: null }); guardarDatos(); if (window.cambiarSeccion) window.cambiarSeccion('auspiciantes'); }
    document.getElementById('nombreAuspiciante').value = '';
    document.getElementById('imagenAuspiciante').value = '';
};

window.eliminarAuspiciante = function(id) {
    auspiciantes = auspiciantes.filter(a => a.id !== id);
    guardarDatos();
    if (window.cambiarSeccion) window.cambiarSeccion('auspiciantes');
};