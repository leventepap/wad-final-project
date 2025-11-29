const express = require('express');
const router = express.Router();
const db = require('./db');

const handleError = (err, res, code) => res.status(code).json({ error: err.message });

router.get('/', (req, res) => {
    db.all('SELECT * FROM BOOK', [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM BOOK WHERE ISBN = ?', [req.params.id], (err, row) => {
        if (err) return handleError(err, res, 500);
        res.json(row);
    });
});

router.post('/', (req, res) => {
    const { isbn, title, edition, publication } = req.body;
    db.run(
        'INSERT INTO BOOK (ISBN, TITLE, EDITION, PUBLICATION) VALUES (?, ?, ?, ?)',
        [isbn, title, edition, publication],
        function (err) {
            if (err) return handleError(err, res, 500);
            res.json({ id: this.lastID });
        }
    );
});

router.patch('/:id', (req, res) => {
    const { title, edition, publication } = req.body;
    const fields = [];
    const values = [];

    if (title) {
        fields.push('TITLE = ?');
        values.push(title);
    }
    if (edition) {
        fields.push('EDITION = ?');
        values.push(edition);
    }
    if (publication) {
        fields.push('PUBLICATION = ?');
        values.push(publication);
    }

    if (fields.length === 0) {
        return handleError(new Error('No fields to update'), res, 400);
    }

    values.push(req.params.id); // ISBN at the end for the WHERE clause

    const query = `UPDATE BOOK SET ${fields.join(', ')} WHERE ISBN = ?`;

    db.run(query, values, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updatedRows: this.changes });
    });
});

router.delete('/:id', (req, res) => {
    db.run('DELETE FROM BOOK WHERE ISBN = ?', [req.params.id], function (err) {
        if (err) return handleError(err, res, 500);
        res.json({ deletedRows: this.changes });
    });
});

module.exports = router;
