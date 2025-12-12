const express = require("express");
const router = express.Router();
const db = require("../db");
const { handleError, trafficLogger } = require("../utils");

router.get("/", (req, res) => {
    trafficLogger.info(req);
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID";
    db.all(query, [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.post("/search", (req, res) => {
    trafficLogger.info(req);
    const { SEARCH } = req.body;
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID WHERE NAME LIKE ?";
    db.all(query, [SEARCH], function(err, rows) {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    trafficLogger.info(req);
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID WHERE PERSON_ID = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return handleError(err, res, 500);
        res.json(row);
    });
});

module.exports = router;