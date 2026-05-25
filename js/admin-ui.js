// Funciones de renderizado
function renderDashboard() {
    const total = inscritos.length, pagosVerificados = inscritos.filter(i=>i.pagoVerificado).length, confirmados = inscritos.filter(i=>i.presente).length;
    return `<div class="kpi-grid">
        <div class="kpi-card"><div><div class="kpi-number">${total}</div><div>Inscritos</div></div><i class="fas fa-users"></i></div>
        <div class="kpi-card"><div><div class="kpi-number">${pagosVerificados}</div><div>Pagos verificados</div></div><i class="fas fa-credit-card"></i></div>
        <div class="kpi-card"><div><div class="kpi-number">${confirmados}</div><div>Asistencia confirmada</div></div><i class="fas fa-check-circle"></i></div>
        <div class="kpi-card"><div><div class="kpi-number">${agenda.length}</div><div>Actividades</div></div><i class="fas fa-calendar"></i></div>
    </div><h3>Resumen del evento</h3><p>📅 ${new Date(eventInfo.fecha).toLocaleDateString('es-ES')} - ${eventInfo.horaInicio} a ${eventInfo.horaFin}</p><canvas id="chartInscritos" style="max-height:250px; margin-top:1rem;"></canvas>`;
}

function renderEvento() {
    return `<h3>Información del Evento</h3>
        <div class="form-group"><label>Descripción</label><textarea id="descEvento" rows="3">${eventInfo.descripcion}</textarea></div>
        <div class="form-group"><label>Fecha</label><input type="date" id="fechaEvento" value="${eventInfo.fecha}"></div>
        <div class="form-group"><label>Hora inicio</label><input type="time" id="horaInicio" value="${eventInfo.horaInicio}"></div>
        <div class="form-group"><label>Hora fin</label><input type="time" id="horaFin" value="${eventInfo.horaFin}"></div>
        <button class="btn" onclick="guardarEvento()">Guardar cambios</button>`;
}

function renderAgenda() {
    let html = `<h3>Agregar actividad</h3><div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
        <input type="time" id="nuevaHora" placeholder="Hora"><input type="text" id="nuevoTema" placeholder="Tema">
        <input type="text" id="nuevoSpeaker" placeholder="Expositor"><button class="btn" onclick="agregarActividad()">➕ Agregar</button>
    </div><h3>Actividades actuales</h3><div id="listaAgenda">`;
    agenda.forEach(a => { html += `<div class="list-item"><div><strong>${a.hora}</strong> - ${a.tema}<br><small>${a.speaker||''}</small></div><button class="btn btn-sm btn-danger" onclick="eliminarActividad('${a.id}')">🗑</button></div>`; });
    html += `</div>`; return html;
}

function renderAuspiciantes() {
    let html = `<h3>Agregar auspiciante con imagen</h3><div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
        <input type="text" id="nombreAuspiciante" placeholder="Nombre" style="flex:2;"><input type="file" id="imagenAuspiciante" accept="image/*" style="flex:2;">
        <button class="btn" onclick="agregarAuspiciante()">➕ Agregar</button>
    </div><h3>Auspiciantes actuales</h3><div id="listaAuspiciantes">`;
    auspiciantes.forEach(a => { html += `<div class="list-item"><div style="display:flex; align-items:center; gap:10px;">${a.imagen ? `<img src="${a.imagen}" style="height:40px;">` : '<i class="fas fa-building" style="font-size:2rem;"></i>'}<span><strong>${a.nombre}</strong></span></div><button class="btn btn-sm btn-danger" onclick="eliminarAuspiciante('${a.id}')">🗑</button></div>`; });
    html += `</div>`; return html;
}

function renderInscritos() {
    let html = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <h3>Lista de inscritos</h3>
                    <button class="btn" onclick="exportarExcel()"><i class="fas fa-file-excel"></i> Exportar a Excel</button>
                </div>
                <div id="listaInscritos">`;
    if(inscritos.length===0) html+=`<p>No hay inscritos</p>`;
    inscritos.forEach(i => {
        const imgPreview = i.comprobante ? `<img src="${i.comprobante}" class="img-thumb" onclick="verImagen('${i.comprobante}')" title="Ver comprobante">` : '<span>Sin imagen</span>';
        html += `<div class="list-item">
                    <div class="inscrito-info">
                        <strong>${i.nombre} ${i.apellido}</strong><br>CI: ${i.ci} | ${i.correo}
                        <div style="margin-top:5px;">${imgPreview}</div>
                    </div>
                    <div class="inscrito-actions">
                        <button class="btn btn-sm ${i.pagoVerificado ? 'btn-warning' : 'btn-success'}" onclick="togglePago('${i.id}')">
                            ${i.pagoVerificado ? '❌ Quitar pago' : '✅ Validar pago'}
                        </button>
                        <button class="btn btn-sm ${i.presente ? 'btn-warning' : 'btn-success'}" onclick="toggleAsistencia('${i.id}')">
                            ${i.presente ? '🚫 Quitar asistencia' : '✔ Marcar asistencia'}
                        </button>
                    </div>
                </div>`;
    });
    html += `</div>`; return html;
}

function renderScanner() {
    return `<h3>Escáner QR de Carnet</h3><p>Acerca el código QR del carnet para marcar/desmarcar asistencia (toggle).</p>
            <div class="scanner-container"><video id="scannerVideo" playsinline></video>
            <div class="scanner-controls"><button class="btn" id="btnIniciar" onclick="iniciarEscaner()"><i class="fas fa-video"></i> Iniciar cámara</button>
            <button class="btn btn-danger" id="btnDetener" onclick="detenerEscaner()" style="display:none;"><i class="fas fa-stop"></i> Detener</button></div>
            <div id="scannerResultado" style="margin-top:1rem;"></div></div>`;
}

function verImagen(base64) {
    document.getElementById('imgGrande').src = base64;
    document.getElementById('modalImagen').classList.add('active');
}

function cerrarModalImagen() {
    document.getElementById('modalImagen').classList.remove('active');
}