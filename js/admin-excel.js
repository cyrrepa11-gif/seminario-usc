// Exportar a Excel con logo, colores, sin columna firma, asistencia como Presente/Ausente
function exportarExcel() {
    const logoImg = document.querySelector('.admin-header img')?.src || 'assets/logo.png';
    const fechaFormateada = new Date(eventInfo.fecha).toLocaleDateString('es-ES');
    let tablaHtml = `<html><head><meta charset="UTF-8"><title>Lista Asistencia - Seminario USCA</title>
    <style>
        body { font-family: 'Poppins', 'Arial', sans-serif; }
        .header { background-color: #0f3460; color: white; padding: 15px; text-align: center; }
        .logo { max-height: 50px; vertical-align: middle; margin-right: 10px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th { background-color: #0f3460; color: white; padding: 10px; border: 1px solid #ddd; }
        td { padding: 8px; border: 1px solid #ddd; }
        .subheader { background-color: #e94560; color: white; text-align: center; padding: 8px; font-weight: bold; }
    </style>
    </head><body>
    <div class="header"><img src="${logoImg}" class="logo"> <h2>III SEMINARIO DE ACTUALIZACIÓN QUIRÚRGICA</h2><p>${fechaFormateada} - ${eventInfo.horaInicio} a ${eventInfo.horaFin}</p></div>
    <div class="subheader">HOJA DE ASISTENCIA</div>
    <table><thead><tr><th>N°</th><th>Nombre completo</th><th>Cédula</th><th>Email</th><th>Pago verificado</th><th>Asistencia</th></tr></thead><tbody>`;
    inscritos.forEach((i, idx) => {
        const asistenciaTexto = i.presente ? "Presente" : "Ausente";
        tablaHtml += `<tr><td>${idx+1}</td><td>${i.nombre} ${i.apellido}</td><td>${i.ci}</td><td>${i.correo}</td><td>${i.pagoVerificado ? 'Sí' : 'No'}</td><td>${asistenciaTexto}</td></tr>`;
    });
    tablaHtml += `</tbody></table><p style="margin-top:20px; font-size:12px; text-align:center;">Documento generado automáticamente - Seminario USCA</p></body></html>`;
    const blob = new Blob([tablaHtml], { type: "application/vnd.ms-excel" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lista_asistencia_${eventInfo.fecha}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
}