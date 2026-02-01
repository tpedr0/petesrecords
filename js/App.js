import { Store } from './Store.js';
import { UI } from './UI.js';

class App {
    constructor() {
        this.queries = ['Justice Cross', 'Tame Impala Currents', 'Daft Punk Discovery', 'Miles Davis Kind of Blue', 'Nas Illmatic', 'The Smiths Meat is Murder'];
        this.init();
    }

    async init() {
        // Navigation listener
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) UI.showPage(link.dataset.link);
        });

        // Load and Render records
        const albums = await Store.getAlbums(this.queries);
        const grid = document.getElementById('records-grid');

        grid.innerHTML = albums.map(alb => `
            <div class="item" data-artist="${alb.artistName}" data-album="${alb.collectionName}">
                <div class="art-container">
                    <img src="${alb.artworkUrl100.replace('100x100', '600x600')}" class="art-img">
                    <div class="play-overlay"><div class="play-btn">▶</div></div>
                </div>
                <h3>${alb.collectionName}</h3>
                <p style="font-family:'JetBrains Mono'; font-size:0.7rem; color:#888;">${alb.artistName}</p>
            </div>
        `).join('');

        // Playback listener
        grid.addEventListener('click', async (e) => {
            const item = e.target.closest('.item');
            if (item) {
                const track = await Store.getTrack(item.dataset.artist, item.dataset.album);
                if (track) UI.updatePlayer(track);
            }
        });
    }
}

new App();