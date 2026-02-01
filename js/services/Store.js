import { Record } from '../models/Record.js';

export class Store {
    constructor() {
        this.token = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";
        this.storageKey = 'pete_inventory';
    }

    getInventory() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved).map(data => new Record(data)) : [];
    }

    saveInventory(records) {
        localStorage.setItem(this.storageKey, JSON.stringify(records));
    }

    async fetchDiscogs(releaseId) {
        const url = `https://api.discogs.com/releases/${releaseId}?token=${this.token}`;
        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'PetesRecords/1.1' } });
            if (!response.ok) throw new Error("ID not found");
            const data = await response.json();
            
            return new Record({
                id: data.id,
                artist: data.artists[0].name,
                title: data.title,
                image: data.images?.[0]?.resource_url,
                genre: data.genres?.[0],
                year: data.year
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
