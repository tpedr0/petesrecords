import { Store } from './Store.js';
import { UI } from './UI.js';

const recordStore = new Store();

// Initial collection (IDs from Discogs)
const initialCollection = [249504, 151639, 1021469, 12558503];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initial Load
    const data = await recordStore.loadCrates(initialCollection);
    UI.renderCrates(data);

    // 2. Navigation
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = e.target.getAttribute('data-link');
            UI.showPage(pageId);
        });
    });

    // 3. Admin Functionality
    document.getElementById('admin-add-btn').addEventListener('click', async () => {
        const idInput = document.getElementById('admin-id-input');
        const newRecord = await recordStore.fetchFromDiscogs(idInput.value);
        
        if (newRecord) {
            recordStore.records.unshift(newRecord); // Add to start of list
            UI.renderCrates(recordStore.records); // Re-render with animations
            idInput.value = '';
        } else {
            alert("Invalid Discogs ID");
        }
    });
});
