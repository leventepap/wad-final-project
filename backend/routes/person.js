const express = require("express");
const router = express.Router();
const db = require("../db");
const { response } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM PERSON";
    db.all(query, [], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

router.get("/overview", (req, res) => {
    const query = "SELECT p.ID, p.NAME, p.ADDRESS, a.PERSON_ID as AUTHOR_PERSON_ID, m.PERSON_ID as MEMBER_PERSON_ID, s.PERSON_ID as STAFF_PERSON_ID FROM PERSON p LEFT JOIN AUTHOR a ON p.ID = a.PERSON_ID LEFT JOIN MEMBER m ON p.ID = m.PERSON_ID LEFT JOIN STAFF s ON p.ID = s.PERSON_ID";
    db.all(query, [], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    })
});

router.post("/search", (req, res) => {
    const { SEARCH } = req.body;
    const query = "SELECT p.ID, p.NAME, p.ADDRESS, a.PERSON_ID as AUTHOR_PERSON_ID, m.PERSON_ID as MEMBER_PERSON_ID, s.PERSON_ID as STAFF_PERSON_ID FROM PERSON p LEFT JOIN AUTHOR a ON p.ID = a.PERSON_ID LEFT JOIN MEMBER m ON p.ID = m.PERSON_ID LEFT JOIN STAFF s ON p.ID = s.PERSON_ID WHERE p.NAME LIKE ? OR p.ADDRESS LIKE ? OR p.EMAIL LIKE ? OR p.PHONE_NUMBER LIKE ? ORDER BY p.NAME";
    db.all(query, [SEARCH], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    })
});

router.get("/:id", (req, res) => {
    const query = "SELECT * FROM PERSON WHERE ID = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return response.error(err, res, 500);
        response.single(res, row, "ID");
    });
});

router.post("/", (req, res) => {
    const { NAME, ADDRESS, EMAIL, PHONE_NUMBER } = req.body;
    const query = "INSERT INTO PERSON (NAME, ADDRESS, EMAIL, PHONE_NUMBER) VALUES (?, ?, ?, ?)";
    db.run(query, [NAME, ADDRESS, EMAIL, PHONE_NUMBER], function(err) {  // Changed to regular function
        if (err) return response.error(err, res, 500);
        response.create(res, { ID: this.lastID }, `Person ${this.lastID} added successfully!`);
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
        return response.error(new Error("No fields to update"), res, 400);
    }

    values.push(req.params.id); // ID at the end for the WHERE clause
    const updateQuery = `UPDATE PERSON SET ${fields.join(", ")} WHERE ID = ?`;
    
    db.run(updateQuery, values, function(err) {
        if (err) return response.error(err, res, 500);
        if (this.changes === 0) {
            return response.error(new Error("Person not found"), res, 404);
        }

        const selectQuery = "SELECT * FROM PERSON WHERE ID = ?";
        db.get(selectQuery, [req.params.id], (err, row) => {
            if (err) return response.error(err, res, 500);
            response.single(res, row, "ID");
        });
    });
});

router.delete("/:id", (req, res) => {
    db.run("DELETE FROM PERSON WHERE ID = ?", [req.params.id], (err) => {
        if (err) return response.error(err, res, 500);
        response.create(res, { deletedRows: this.changes }, `Person ${req.params.id} deleted successfully!`);
    });
});

module.exports = router;