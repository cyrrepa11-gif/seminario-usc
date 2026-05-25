// Módulo principal: login, logout, navegación
function verificarLogin() {
    const pass = document.getElementById('adminPassword').value;
    if (pass === 'usca2026') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').classList.add('active');
        cargarDatos();
        cambiarSeccion('dashboard');
    } else {
        document.getElementById('loginError').innerText = '❌ Contraseña incorrecta';
    }
}

function cerrarSesion() {
    detenerEscaner();
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').innerText = '';
}

function cambiarSeccion(seccion) {
    const content = document.getElementById('mainContent');
    if(seccion === 'dashboard') {
        content.innerHTML = renderDashboard();
        setTimeout(() => {
            const ctx = document.getElementById('chartInscritos')?.getContext('2d');
            if(ctx) {
                const confirmados = inscritos.filter(i => i.presente).length;
                new Chart(ctx, {
                    type: 'doughnut',
                    data: { labels: ['Confirmados', 'Pendientes'], datasets: [{ data: [confirmados, inscritos.length - confirmados], backgroundColor: ['#16c784', '#e94560'] }] }
                });
            }
        }, 50);
    } else if(seccion === 'evento') content.innerHTML = renderEvento();
    else if(seccion === 'agenda') content.innerHTML = renderAgenda();
    else if(seccion === 'auspiciantes') content.innerHTML = renderAuspiciantes();
    else if(seccion === 'inscritos') content.innerHTML = renderInscritos();
    else if(seccion === 'scanner') content.innerHTML = renderScanner();
    
    // Actualizar clase activa en el sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-tab="${seccion}"]`).classList.add('active');
    if(seccion !== 'scanner') detenerEscaner();
}

// Vincular eventos del sidebar
document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => cambiarSeccion(el.getAttribute('data-tab')));
});

// Exponer funciones necesarias globalmente
window.verificarLogin = verificarLogin;
window.cerrarSesion = cerrarSesion;
window.cambiarSeccion = cambiarSeccion;
window.exportarExcel = exportarExcel;
window.iniciarEscaner = iniciarEscaner;
window.detenerEscaner = detenerEscaner;
window.verImagen = verImagen;
window.cerrarModalImagen = cerrarModalImagen;

// Inicializar mostrando el login
window.onload = () => {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').classList.remove('active');
};