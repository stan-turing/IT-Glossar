const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    else console.log('Mit SQLite verbunden!');
});
module.exports = db;

const db = require('./database');
db.run(`
    CREATE TABLE IF NOT EXISTS terms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )
`);
