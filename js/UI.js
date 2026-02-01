gsap.registerPlugin(Flip);

export class UI {
    static showPage(id) {
        const target = document.getElementById(id);
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });

        target.style.display = id === 'home' ? 'flex' : 'block';
        gsap.fromTo(target, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
        target.classList.add('active');
    }

    static renderCrates(records) {
        const grid = document.getElementById('records-grid');
        grid.innerHTML = records.map((r, i) => `
            <div class="record-card ${i % 5 === 0 ? 'featured' : ''}" data-genre="${r.genre}" data-tilt>
                <img src="${r.image}" class="record-image">
                <div class="record-details">
                    <p class="mono accent" style="font-size: 0.7rem;">${r.artist}</p>
                    <h3 class="syne-bold">${r.title}</h3>
                </div>
            </div>
        `).join('');

        document.getElementById('item-count').innerText = `${records.length} ITEMS`;
        VanillaTilt.init(document.querySelectorAll(".record-card"), { max: 10, speed: 400, glare: true, "max-glare": 0.2 });
    }

    static filterCrates(genre) {
        const cards = document.querySelectorAll('.record-card');
        const state = Flip.getState(cards);

        cards.forEach(card => {
            card.style.display = (genre === 'all' || card.dataset.genre === genre) ? 'flex' : 'none';
        });

        Flip.from(state, {
            duration: 0.6,
            ease: "power3.inOut",
            stagger: 0.05,
            onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1}),
            onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.8})
        });
    }
}
