// Módulo de datos (localStorage)
let agenda = [], auspiciantes = [], inscritos = [], eventInfo = {};

function cargarDatos() {
    agenda = JSON.parse(localStorage.getItem('agenda_items') || '[{"id":"1","hora":"08:00","tema":"Bienvenida","speaker":"Director"},{"id":"2","hora":"09:00","tema":"Laparoscopia","speaker":"Dr. García"}]');
    auspiciantes = JSON.parse(localStorage.getItem('auspiciantes_items') || '[]');
    inscritos = JSON.parse(localStorage.getItem('inscritos_items') || '[]');
    eventInfo = JSON.parse(localStorage.getItem('evento_info') || '{"descripcion":"Evento de actualización quirúrgica","fecha":"2026-08-08","horaInicio":"08:00","horaFin":"17:00"}');
}

function guardarDatos() {
    localStorage.setItem('agenda_items', JSON.stringify(agenda));
    localStorage.setItem('auspiciantes_items', JSON.stringify(auspiciantes));
    localStorage.setItem('inscritos_items', JSON.stringify(inscritos));
    localStorage.setItem('evento_info', JSON.stringify(eventInfo));
}