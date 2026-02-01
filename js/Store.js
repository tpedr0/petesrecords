const DISCOGS_TOKEN = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";

export class Store {
    constructor() {
        // Load from localStorage if it exists, otherwise start empty
        const saved = localStorage.getItem('pete_collection');
        this.records = saved ? JSON.parse(saved) : [];
    }

    async fetchFromDiscogs(releaseId) {
        try {
            const response = await fetch(`https://api.discogs.com/releases/${releaseId}?token=${DISCOGS_TOKEN}`, {
                headers: { 'User-Agent': 'PetesRecords/1.0' }
            });
            if (!response.ok) return null;
            const data = await response.json();

            return {
                uuid: crypto.randomUUID(), // Unique ID for deletion logic
                id: data.id,
                artist: data.artists[0].name,
                title: data.title,
                image: data.images ? data.images[0].resource_url : 'https://via.placeholder.com/600',
                genre: data.genres ? data.genres[0] : 'General',
                year: data.year
            };
        } catch (err) {
            return null;
        }
    }

    save() {
        localStorage.setItem('pete_collection', JSON.stringify(this.records));
    }

    async loadInitial(ids) {
        // Only load defaults if the user has a totally empty collection
        if (this.records.length === 0) {
            const results = await Promise.all(ids.map(id => this.fetchFromDiscogs(id)));
            this.records = results.filter(r => r !== null);
            this.save();
        }
        return this.records;
    }

    removeRecord(uuid) {
        this.records = this.records.filter(r => r.uuid !== uuid);
        this.save();
    }
}
