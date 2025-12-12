const express = require("express");
const router = express.Router();
const db = require("../db");
const { trafficLogger, errorResponse } = require("../utils");

router.get("/", (req, res) => {
    trafficLogger.info(req);
    const query = "SELECT a.PERSON_ID, p.NAME, COUNT(ab.book) as BOOKS FROM AUTHOR a LEFT JOIN PERSON p ON p.ID = a.PERSON_ID LEFT JOIN AUTHOR_BOOK ab ON a.PERSON_ID = ab.author GROUP BY a.PERSON_ID, p.NAME";
    db.all(query, [], function(err, rows) {
        if (err) return errorResponse.create(err, res, 500);
        res.json(rows);
    });
});

router.post("/search", (req, res) => {
    trafficLogger.info(req);
    const { SEARCH } = req.body;
    const query = "SELECT a.PERSON_ID, p.NAME, COUNT(ab.book) as BOOKS FROM AUTHOR a LEFT JOIN PERSON p ON p.ID = a.PERSON_ID LEFT JOIN AUTHOR_BOOK ab ON a.PERSON_ID = ab.author WHERE p.NAME LIKE ? GROUP BY a.PERSON_ID, p.NAME";
    db.all(query, [SEARCH], function(err, rows) {
        if (err) return errorResponse.create(err, res, 500);
        res.json(rows);
    })
});

router.get("/:id/books", (req, res) => {
    trafficLogger.info(req);
    const query = "SELECT * FROM BOOK JOIN AUTHOR_BOOK ON BOOK.ISBN = AUTHOR_BOOK.book WHERE AUTHOR_BOOK.author = ?";
    db.all(query, [req.params.id], function(err, rows) {
        if (err) return errorResponse.create(err, res, 500);
        res.json(rows);
    });
});

router.get("/persons", (req, res) => {
    trafficLogger.info(req);
    const query = "SELECT * FROM PERSON WHERE ID NOT IN (SELECT PERSON_ID FROM AUTHOR)";
    db.all(query, [], function(err, row) {
        if (err) return errorResponse.create(err, res, 500);
        res.json(row);
    });
});

router.post("/persons/search", (req, res) => {
    trafficLogger.info(req);
    const { SEARCH } = req.body;
    const query = "SELECT * FROM PERSON WHERE ID NOT IN (SELECT PERSON_ID FROM AUTHOR) AND NAME LIKE ? ORDER BY NAME";
    db.all(query, [SEARCH], function(err, row) {
        if (err) return errorResponse.create(err, res, 500);
        res.json(row);
    });
});

router.post("/add", (req, res) => {
    trafficLogger.info(req);
    const { AUTHOR_IDS } = req.body;
    if (!Array.isArray(AUTHOR_IDS) || AUTHOR_IDS.length === 0) {
        return errorResponse.create("Invalid input: AUTHOR_PERSON_IDS must be a non-empty array", res, 400);
    }
    const placeholders = AUTHOR_IDS.map(() => "(?)").join(",");
    const query = `INSERT INTO AUTHOR (PERSON_ID) VALUES ${placeholders}`;
    db.run(query, AUTHOR_IDS, function(err) {
        if (err) return errorResponse.create(err, res, 500);
        res.json({ INSERTED: AUTHOR_IDS });
    });
});

router.delete("/:id", (req, res) => {
    trafficLogger.info(req);
    const query = "DELETE FROM AUTHOR WHERE PERSON_ID = ?";
    db.run(query, [req.params.id], function(err) {
        if (err) return errorResponse.create(err, res, 500);
        res.json({ DELETED: this.changes });
    });
});

module.exports = router;