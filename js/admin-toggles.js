// Funciones para alternar pago y asistencia
window.togglePago = function(id) {
    const idx = inscritos.findIndex(i => i.id === id);
    if (idx !== -1) {
        inscritos[idx].pagoVerificado = !inscritos[idx].pagoVerificado;
        guardarDatos();
        if (window.cambiarSeccion) window.cambiarSeccion('inscritos');
    }
};

window.toggleAsistencia = function(id) {
    const idx = inscritos.findIndex(i => i.id === id);
    if (idx !== -1) {
        inscritos[idx].presente = !inscritos[idx].presente;
        guardarDatos();
        if (window.cambiarSeccion) window.cambiarSeccion('inscritos');
    }
};