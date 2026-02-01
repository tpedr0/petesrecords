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

    static renderAdminInventory(records) {
        const list = document.getElementById('admin-inventory-list');
        if (!list) return;

        list.innerHTML = records.map(r => `
            <div class="admin-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid var(--border);">
                <div style="display:flex; gap:15px; align-items:center;">
                    <img src="${r.image}" style="width:40px; height:40px; object-fit:cover;">
                    <div>
                        <p class="mono" style="font-size:0.8rem;">${r.title}</p>
                        <p style="font-size:0.6rem; opacity:0.5;">${r.artist} | ID: ${r.id}</p>
                    </div>
                </div>
                <button class="delete-btn" data-uuid="${r.uuid}" style="background:transparent; border:1px solid #ff4444; color:#ff4444; padding:5px 10px; cursor:pointer; font-family:'JetBrains Mono'; font-size:0.6rem;">DELETE</button>
            </div>
        `).join('');
    }

    static authAdmin(success) {
        const loginForm = document.getElementById('admin-login');
        const dashboard = document.getElementById('admin-dashboard');
        if (success) {
            gsap.to(loginForm, { opacity: 0, y: -20, onComplete: () => {
                loginForm.style.display = 'none';
                dashboard.style.display = 'block';
                gsap.fromTo(dashboard, { opacity: 0 }, { opacity: 1 });
            }});
        } else {
            gsap.to(loginForm, { x: 10, repeat: 3, yoyo: true, duration: 0.05 });
        }
    }

    static logSession(message) {
        const log = document.getElementById('session-updates');
        const entry = document.createElement('div');
        entry.innerText = `> ${message}`;
        log.prepend(entry);
    }
}
