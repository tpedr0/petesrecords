export class UI {
    static showPage(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(id);
        target.style.display = (id === 'home' ? 'flex' : 'block');
        setTimeout(() => target.classList.add('active'), 50);
    }

    static updatePlayer(track) {
        const bar = document.getElementById('player-bar');
        const audio = document.getElementById('audio-player');
        document.getElementById('track-name').innerText = track.trackName;
        document.getElementById('artist-name').innerText = track.artistName;
        audio.src = track.previewUrl;
        bar.style.display = 'flex';
        audio.play();
    }
}