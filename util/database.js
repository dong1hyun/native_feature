import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('places.db');

export function init() {
    return database.execAsync(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`
    );
};

export async function insertPlace(place) {
    try {
        await database.runAsync(`
            INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
            `,
            [place.title, place.imageUri, place.address, place.lat, place.lng]
        );
    } catch (error) {
        console.error(error);
    }
}