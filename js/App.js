import { Store } from './Store.js';
import { UI } from './UI.js';

const store = new Store();
const MASTER_KEY = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";
const initialIDs = [249504, 151639, 1021469, 12558503];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Data (from LocalStorage or Defaults)
    const records = await store.loadInitial(initialIDs);
    UI.renderCrates(records);
    UI.renderAdminInventory(records);

    // 2. Navigation
    document.querySelectorAll('[data-link]').forEach(btn => {
        btn.onclick = () => UI.showPage(btn.dataset.link);
    });

    // 3. Admin Login
    document.getElementById('login-btn').onclick = () => {
        const val = document.getElementById('admin-token-input').value;
        if (val === MASTER_KEY) {
            UI.authAdmin(true);
            UI.logSession("System Access Granted.");
        } else {
            UI.authAdmin(false);
        }
    };

    // 4. Admin: Add Record
    document.getElementById('admin-add-btn').onclick = async () => {
        const input = document.getElementById('admin-id-input');
        UI.logSession(`Syncing ID: ${input.value}...`);
        
        const record = await store.fetchFromDiscogs(input.value);
        if (record) {
            store.records.unshift(record);
            store.save(); // Persist to localStorage
            UI.renderCrates(store.records);
            UI.renderAdminInventory(store.records);
            UI.logSession(`Added: ${record.title}`);
            input.value = '';
        } else {
            UI.logSession("Error: ID not found.");
        }
    };

    // 5. Admin: Delete Record (Event Delegation)
    document.getElementById('admin-inventory-list').onclick = (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const uuid = e.target.dataset.uuid;
            store.removeRecord(uuid);
            UI.renderCrates(store.records);
            UI.renderAdminInventory(store.records);
            UI.logSession("Item removed from inventory.");
        }
    };

    document.getElementById('logout-btn').onclick = () => location.reload();
});
