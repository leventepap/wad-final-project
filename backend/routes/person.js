const express = require("express");
const router = express.Router();
const db = require("../db");
const { handleError } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM PERSON";
    db.all(query, [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const query = "SELECT * FROM PERSON WHERE ID = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return handleError(err, res, 500);
        res.json(row);
    });
});

router.post("/", (req, res) => {
    const { NAME, ADDRESS, EMAIL, PHONE_NUMBER } = req.body;
    const query = "INSERT INTO PERSON (NAME, ADDRESS, EMAIL, PHONE_NUMBER) VALUES (?, ?, ?, ?)";
    db.run(query, [NAME, ADDRESS, EMAIL, PHONE_NUMBER], (err) => {
        if (err) return handleError(err, res, 500);
        res.json({ id: this.lastID });
    });
});

router.patch("/:id", (req, res) => {
    const { NAME, ADDRESS, EMAIL, PHONE_NUMBER } = req.body;
    const fields = [];
    const values = [];

    if (NAME) {
        fields.push("NAME = ?");
        values.push(NAME);
    }
    if (ADDRESS) {
        fields.push("ADDRESS = ?");
        values.push(ADDRESS);
    }
    if (EMAIL) {
        fields.push("EMAIL = ?");
        values.push(EMAIL);
    }
    if (PHONE_NUMBER) {
        fields.push("PHONE_NUMBER = ?");
        values.push(PHONE_NUMBER);
    }
    if (fields.length === 0) {
        return handleError(new Error("No fields to update"), res, 400);
    }

    values.push(req.params.id); // ID at the end for the WHERE clause
    const updateQuery = `UPDATE PERSON SET ${fields.join(", ")} WHERE ID = ?`;
    
    db.run(updateQuery, values, function(err) {
        if (err) return handleError(err, res, 500);
        if (this.changes === 0) {
            return handleError(new Error("Person not found"), res, 404);
        }

        const selectQuery = "SELECT * FROM PERSON WHERE ID = ?";
        db.get(selectQuery, [req.params.id], (err, row) => {
            if (err) return handleError(err, res, 500);
            res.json(row);
        });
    });
});

router.delete("/:id", (req, res) => {
    db.run("DELETE FROM PERSON WHERE ID = ?", [req.params.id], (err) => {
        if (err) return handleError(err, res, 500);
        res.json({ deletedRows: this.changes });
    });
});

module.exports = router;