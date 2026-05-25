// Escáner QR (alterna asistencia)
let scannerActive = false, scannerStream = null, scannerAnimation = null;

function iniciarEscaner() {
    const video = document.getElementById('scannerVideo');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
        scannerStream = stream;
        video.srcObject = stream;
        video.play();
        document.getElementById('btnIniciar').style.display = 'none';
        document.getElementById('btnDetener').style.display = 'inline-block';
        scannerActive = true;
        escanearQR();
    }).catch(err => alert("Error cámara: " + err.message));
}

function detenerEscaner() {
    scannerActive = false;
    if(scannerAnimation) cancelAnimationFrame(scannerAnimation);
    if(scannerStream) { scannerStream.getTracks().forEach(t => t.stop()); scannerStream = null; }
    const video = document.getElementById('scannerVideo');
    if(video) video.srcObject = null;
    const btnIniciar = document.getElementById('btnIniciar');
    const btnDetener = document.getElementById('btnDetener');
    if(btnIniciar) btnIniciar.style.display = 'inline-block';
    if(btnDetener) btnDetener.style.display = 'none';
}

function escanearQR() {
    if(!scannerActive) return;
    const video = document.getElementById('scannerVideo');
    if(video.videoWidth === 0) { scannerAnimation = requestAnimationFrame(escanearQR); return; }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    if(code) {
        const inscrito = inscritos.find(i => i.id === code.data);
        const resultadoDiv = document.getElementById('scannerResultado');
        if(inscrito) {
            inscrito.presente = !inscrito.presente;
            guardarDatos();
            const nuevoEstado = inscrito.presente ? "presente" : "ausente";
            resultadoDiv.innerHTML = `<span style="color:green;">✅ Asistencia cambiada a ${nuevoEstado} para ${inscrito.nombre} ${inscrito.apellido}</span>`;
            setTimeout(() => resultadoDiv.innerHTML = '', 3000);
            detenerEscaner();
            if(window.cambiarSeccion) window.cambiarSeccion('inscritos');
        } else {
            resultadoDiv.innerHTML = `<span style="color:red;">❌ Código no válido</span>`;
            setTimeout(() => resultadoDiv.innerHTML = '', 2000);
        }
        return;
    }
    scannerAnimation = requestAnimationFrame(escanearQR);
}