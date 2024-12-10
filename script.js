// Recolectamos todos los botones "Reproducir"
const playButtons = document.querySelectorAll('.play-btn');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

// Control de volumen
const volumeControl = document.getElementById('volume');

// Variable para rastrear el botón de reproducción actual
let currentPlayButton = null;

// Añadimos eventos de clic a cada botón de "Reproducir"
playButtons.forEach(button => {
    button.addEventListener('click', function() {
        const audioFile = button.getAttribute('data-audio'); // Obtiene el archivo de audio

        // Si el audio ya está en reproducción y es el mismo archivo, lo pausamos
        if (audioPlayer.src === audioFile && !audioPlayer.paused) {
            audioPlayer.pause(); // Pausar la canción
            button.textContent = "Reproducir"; // Cambiar el texto del botón
            currentPlayButton = null; // Restablecer el botón actual
            return;
        }

        // Si estamos cambiando a un archivo diferente
        if (audioPlayer.src !== audioFile) {
            audioSource.src = audioFile; // Cambiar la fuente de audio
            audioPlayer.load(); // Cargar la nueva canción
            audioPlayer.play() // Reproducir la nueva canción
                .then(() => {
                    button.textContent = "Pausar"; // Cambiar el texto del botón a "Pausar"
                    // Si hay un botón anterior que estaba reproduciendo, cambiarlo a "Reproducir"
                    if (currentPlayButton && currentPlayButton !== button) {
                        currentPlayButton.textContent = "Reproducir";
                    }
                    currentPlayButton = button; // Actualizamos el botón actual
                })
                .catch(error => {
                    console.error('Error al intentar reproducir el audio:', error);
                });
        } else {
            // Si ya está reproduciéndose el mismo archivo, solo lo reanudamos si está pausado
            if (audioPlayer.paused) {
                audioPlayer.play(); // Reanudar la reproducción
                button.textContent = "Pausar"; // Cambiar el texto del botón a "Pausar"
                currentPlayButton = button; // Actualizamos el botón actual
            }
        }
    });
});

// Escuchamos errores en el reproductor de audio
audioPlayer.addEventListener('error', function(e) {
    console.error('Error al cargar el archivo de audio:', e);
});

// Manejo del control de volumen
volumeControl.addEventListener('input', function() {
    audioPlayer.volume = volumeControl.value; // Cambiar el volumen del reproductor
});







