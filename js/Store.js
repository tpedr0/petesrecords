export class Store {
    static async getAlbums(queries) {
        const results = await Promise.all(queries.map(async (q) => {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=album&limit=1`);
            const data = await res.json();
            return data.results[0];
        }));
        return results.filter(Boolean);
    }

    static async getTrack(artist, album) {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + album)}&entity=song&limit=1`);
        const data = await res.json();
        return data.results[0];
    }
}