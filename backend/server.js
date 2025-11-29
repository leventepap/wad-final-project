const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('../db/library.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Successfully connected to the Library DB.');
    }
});

app.listen(PORT, () => {
    console.log(`Library backend server running on http://localhost:${PORT}`);

    app.get('/books', (req, res) => {
        db.all('SELECT * FROM BOOK', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    });
});
