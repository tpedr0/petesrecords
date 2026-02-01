const DISCOGS_TOKEN = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";

export class Store {
    constructor() {
        this.records = [];
    }

    async fetchFromDiscogs(releaseId) {
        try {
            const response = await fetch(`https://api.discogs.com/releases/${releaseId}?token=${DISCOGS_TOKEN}`, {
                headers: { 'User-Agent': 'PetesRecords/1.0' }
            });
            if (!response.ok) return null;
            const data = await response.json();

            return {
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

    async loadInitial(ids) {
        const results = await Promise.all(ids.map(id => this.fetchFromDiscogs(id)));
        this.records = results.filter(r => r !== null);
        return this.records;
    }
}
