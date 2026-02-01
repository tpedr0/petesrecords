import { Store } from './Store.js';
import { UI } from './UI.js';

const store = new Store();
const initialIDs = [249504, 151639, 1021469, 12558503, 1120630, 232915];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Data
    const records = await store.loadInitial(initialIDs);
    UI.renderCrates(records);

    // 2. Navigation
    document.querySelectorAll('[data-link]').forEach(btn => {
        btn.onclick = () => UI.showPage(btn.dataset.link);
    });

    // 3. Filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            UI.filterCrates(btn.dataset.genre);
        };
    });

    // 4. Admin Add
    document.getElementById('admin-add-btn').onclick = async () => {
        const input = document.getElementById('admin-id-input');
        const record = await store.fetchFromDiscogs(input.value);
        if (record) {
            store.records.unshift(record);
            UI.renderCrates(store.records);
            input.value = '';
        }
    };
});
