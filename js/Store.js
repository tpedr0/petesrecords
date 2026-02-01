const DISCOGS_TOKEN = "SJfQMGrnfdgTUMLflEYrzJMMQMEhiEkANOGlDbUJ";

export class Store {
    constructor() {
        this.records = [];
    }

    // This grabs high-res data from Discogs using a Release ID
    async fetchFromDiscogs(releaseId) {
        try {
            const response = await fetch(`https://api.discogs.com/releases/${releaseId}?token=${DISCOGS_TOKEN}`, {
                headers: { 'User-Agent': 'PetesRecords/1.0' }
            });

            if (!response.ok) throw new Error("Discogs ID not found");

            const data = await response.json();

            // Transform Discogs data into your site's format
            return {
                id: data.id,
                artist: data.artists[0].name,
                title: data.title,
                image: data.images[0].resource_url, // High-res image
                year: data.year,
                genre: data.genres[0],
                tracklist: data.tracklist
            };
        } catch (err) {
            console.error("Fetch Error:", err);
            return null;
        }
    }

    // Use this to populate your "Crates"
    async loadCrates(ids) {
        const promises = ids.map(id => this.fetchFromDiscogs(id));
        const results = await Promise.all(promises);
        this.records = results.filter(r => r !== null);
        return this.records;
    }
}
