export class Record {
    constructor(data) {
        this.uuid = data.uuid || crypto.randomUUID();
        this.id = data.id;
        this.artist = data.artist || "Unknown Artist";
        this.title = data.title || "Untitled Release";
        this.image = data.image || 'https://via.placeholder.com/600';
        this.genre = data.genre || 'General';
        this.year = data.year || 'N/A';
    }
}
