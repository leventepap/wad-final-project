const express = require("express");
const router = express.Router();
const db = require("./db");
const { handleError } = require("./utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM BOOK";
    db.all(query, [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const query = "SELECT * FROM BOOK WHERE ISBN = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return handleError(err, res, 500);
        res.json(row);
    });
});

router.post("/", (req, res) => {
    const { ISBN, TITLE, EDITION, PUBLICATION } = req.body;
    const query = "INSERT INTO BOOK (ISBN, TITLE, EDITION, PUBLICATION) VALUES (?, ?, ?, ?)";
    db.run(query, [ISBN, TITLE, EDITION, PUBLICATION], (err) => {
        if (err) return handleError(err, res, 500);
        res.json({ id: this.lastID });
    });
});

router.patch("/:id", (req, res) => {
    const { TITLE, EDITION, PUBLICATION } = req.body;
    const fields = [];
    const values = [];

    if (TITLE) {
        fields.push("TITLE = ?");
        values.push(TITLE);
    }
    if (EDITION) {
        fields.push("EDITION = ?");
        values.push(EDITION);
    }
    if (PUBLICATION) {
        fields.push("PUBLICATION = ?");
        values.push(PUBLICATION);
    }
    if (fields.length === 0) {
        return handleError(new Error("No fields to update"), res, 400);
    }

    values.push(req.params.id); // ISBN at the end for the WHERE clause
    const query = `UPDATE BOOK SET ${fields.join(", ")} WHERE ISBN = ?`;
    db.run(query, values, (err) => {
        if (err) return handleError(err, res, 500);
        res.json({ updatedRows: this.changes });
    });
});

router.delete("/:id", (req, res) => {
    db.run("DELETE FROM BOOK WHERE ISBN = ?", [req.params.id], (err) => {
        if (err) return handleError(err, res, 500);
        res.json({ deletedRows: this.changes });
    });
});

module.exports = router;
