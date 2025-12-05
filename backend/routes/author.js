const express = require("express");
const router = express.Router();
const db = require("../db");
const { handleError } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT a.PERSON_ID, p.NAME, COUNT(ab.book) as BOOKS FROM AUTHOR a LEFT JOIN PERSON p ON p.ID = a.PERSON_ID LEFT JOIN AUTHOR_BOOK ab ON a.PERSON_ID = ab.author GROUP BY a.PERSON_ID, p.NAME";
    db.all(query, [], function(err, rows) {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.post("/search", (req, res) => {
    const { SEARCH } = req.body;
    const query = "SELECT a.PERSON_ID, p.NAME, COUNT(ab.book) as BOOKS FROM AUTHOR a LEFT JOIN PERSON p ON p.ID = a.PERSON_ID LEFT JOIN AUTHOR_BOOK ab ON a.PERSON_ID = ab.author WHERE p.NAME LIKE ? GROUP BY a.PERSON_ID, p.NAME";
    db.all(query, [SEARCH], function(err, rows) {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    })
});

router.get("/:id/books", (req, res) => {
    const query = "SELECT * FROM BOOK JOIN AUTHOR_BOOK ON BOOK.ISBN = AUTHOR_BOOK.book WHERE AUTHOR_BOOK.author = ?";
    db.all(query, [req.params.id], function(err, rows) {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

module.exports = router;