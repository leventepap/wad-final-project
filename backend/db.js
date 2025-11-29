const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../db/library.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Successfully connected to the Library DB.');
    }
});

module.exports = db;