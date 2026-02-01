export class UI {
    static showPage(id) {
        const pages = document.querySelectorAll('.page');
        const target = document.getElementById(id);
        if (!target) return;

        // 1. Smooth Fade Out all pages
        pages.forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });

        // 2. Setup Display Type
        target.style.display = id === 'home' ? 'flex' : 'block';
        
        // 3. GSAP Entrance Animation
        // This makes the whole page slide up and fade in elegantly
        gsap.fromTo(target, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        
        target.classList.add('active');

        // 4. If switching to Crates, trigger the staggered item animation
        if (id === 'crates') {
            this.animateCrateItems();
        }
    }

    static renderCrates(records) {
        const grid = document.getElementById('records-grid');
        if (!grid) return;

        grid.innerHTML = records.map((record, index) => {
            // Bento Logic: Every 5th record is "featured" (wider)
            const featuredClass = index % 5 === 0 ? 'featured' : '';
            
            return `
                <div class="record-card ${featuredClass}" 
                     data-tilt 
                     data-tilt-max="12" 
                     data-tilt-speed="400" 
                     data-tilt-glare 
                     data-tilt-max-glare="0.3">
                    <div class="art-container">
                        <img src="${record.image}" class="record-image" alt="${record.title}">
                        <div class="play-overlay">
                            <div class="play-btn">▶</div>
                        </div>
                    </div>
                    <div class="record-details">
                        <p class="mono">${record.artist.toUpperCase()}</p>
                        <h3>${record.title}</h3>
                    </div>
                </div>
            `;
        }).join('');

        // Update item count
        const countEl = document.getElementById('item-count');
        if (countEl) countEl.innerText = `${records.length} ITEMS`;

        // Initialize 3D Tilt on the newly created cards
        if (window.VanillaTilt) {
            VanillaTilt.init(document.querySelectorAll(".record-card"));
        }
    }

    static animateCrateItems() {
        // High-end staggered reveal for the grid
        gsap.from(".record-card", {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
            clearProps: "all" // Clears transform after animation so Tilt works
        });
    }

    static updatePlayer(track) {
        const bar = document.getElementById('player-bar');
        const audio = document.getElementById('audio-player');

        document.getElementById('track-name').innerText = track.trackName;
        document.getElementById('artist-name').innerText = track.artistName;

        audio.src = track.previewUrl;
        
        // Use GSAP to slide the player bar up
        bar.style.display = 'flex';
        gsap.fromTo(bar, { y: 100 }, { y: 0, duration: 0.5, ease: "back.out(1.7)" });
        
        audio.play();
    }
}
