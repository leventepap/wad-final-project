const express = require('express');
const router = express.Router();
const db = require('./db');

const handleError = (err, res) => res.status(500).json({ error: err.message });

router.get('/', (req, res) => {
    db.all('SELECT * FROM BOOK', [], (err, rows) => {
        if (err) return handleError(err, res);
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM BOOK WHERE ISBN = ?', [req.params.id], (err, row) => {
        if (err) return handleError(err, res);
        res.json(row);
    });
});

router.post('/', (req, res) => {
    const { title, edition, publication } = req.body;
    db.run(
        'INSERT INTO BOOK (TITLE, EDITION, PUBLICATION) VALUES (?, ?, ?)',
        [title, edition, publication],
        function (err) {
            if (err) return handleError(err, res);
            res.json({ id: this.lastID });
        }
    );
});

module.exports = router;
