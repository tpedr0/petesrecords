import { Store } from './Store.js';
import { UI } from './UI.js';

// Initialize the Store (Data Layer)
const store = new Store();

// Initial IDs to populate your shop (Replace with your favorite Discogs Release IDs)
const initialIDs = [249504, 151639, 1021469, 12558503, 1120630, 232915];

// Your Discogs Token for Admin validation
const MASTER_KEY = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. INITIAL DATA LOAD
    // Fetch records from Discogs and render the Bento Grid
    const records = await store.loadInitial(initialIDs);
    UI.renderCrates(records);

    // 2. MAIN NAVIGATION
    // Controls the page switching logic with GSAP transitions
    document.querySelectorAll('[data-link]').forEach(btn => {
        btn.onclick = () => {
            const pageId = btn.dataset.link;
            UI.showPage(pageId);
        };
    });

    // 3. CRATES FILTERING
    // Uses GSAP Flip to rearrange the grid cards elegantly
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            // Update Active UI State
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Execute the Flip animation
            UI.filterCrates(btn.dataset.genre);
        };
    });

    // 4. ADMIN ACCESS (The Gatekeeper)
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = () => {
            const inputToken = document.getElementById('admin-token
