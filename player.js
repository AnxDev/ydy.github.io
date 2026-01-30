const audio = new Audio();
let isPlaying = false;
let currentTrackIndex = 0;

// 1. DEFINISCI LA TUA PLAYLIST (Deve seguire l'ordine dell'HTML)
const playlist = [
    "LOVE ME",
    "TRACK 2",
    "BLOOD OF CHRIST",
    "TRACK 4",
    "TRACK 5",
    "TRACK 6",
    "TRACK 7",
    "TRACK 8",
    "TRACK 9",
    "TRACK 10",
    "TRACK 11",
    "TRACK 12",
    "WE LOVE YOU FEAT. NORTH",
    "TRACK 14",
    "TRACK 15",
    "TRACK 16"
];

const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const nowPlaying = document.getElementById('now-playing');
const timeDisplay = document.getElementById('track-time');

// Funzione per caricare una traccia dall'indice
function loadTrack(index) {
    currentTrackIndex = index;
    const trackName = playlist[index];
    nowPlaying.innerText = trackName.toUpperCase();
    audio.src = "audio/" + trackName + ".wav"; 
    
    // --- NUOVO: Evidenzia la traccia ---
    // Rimuovi la classe 'active' da tutte le tracce
    document.querySelectorAll('.track').forEach(t => t.classList.remove('active-track'));
    // Aggiungila a quella corrente
    const allTracks = document.querySelectorAll('.track');
    if(allTracks[index]) allTracks[index].classList.add('active-track');
    if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: playlist[index],
        artist: 'YDY',
        album: 'JESUS LORD III',
        artwork: [
            { src: 'cover.jpg', sizes: '512x512', type: 'image/jpg' }
        ]
    });

    navigator.mediaSession.setActionHandler('play', playTrack);
    navigator.mediaSession.setActionHandler('pause', pauseTrack);
    navigator.mediaSession.setActionHandler('previoustrack', prev);
    navigator.mediaSession.setActionHandler('nexttrack', next);
}
}

// Chiamata dall'HTML: onclick="selectTrack('01 LOVE ME')"
function selectTrack(name) {
    const index = playlist.indexOf(name);
    if (index !== -1) {
        loadTrack(index);
        playTrack();
    }
}

function togglePlay() {
    if (!audio.src) loadTrack(0);
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    audio.play().then(() => {
        isPlaying = true;
        playBtn.innerText = "PAUSE";
    }).catch(e => console.warn("File non trovato."));
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.innerText = "PLAY";
}

// --- LOGICA NEXT E PREV ---

function next() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Torna a 0 dopo l'ultima
    loadTrack(currentTrackIndex);
    playTrack();
}

function prev() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; // Va all'ultima se sei sulla prima
    loadTrack(currentTrackIndex);
    playTrack();
}

// Passa alla prossima automaticamente quando finisce la canzone
audio.addEventListener('ended', next);

// --- AGGIORNAMENTO UI ---

audio.addEventListener('loadedmetadata', () => {
    timeDisplay.innerText = `0:00 / ${formatTime(audio.duration)}`;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progress.value = pct;
        timeDisplay.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    }
});

progress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}