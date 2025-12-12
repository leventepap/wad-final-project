const express = require("express");
const router = express.Router();
const db = require("../db");
const { response } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID";
    db.all(query, [], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

router.post("/search", (req, res) => {
    const { SEARCH } = req.body;
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID WHERE NAME LIKE ?";
    db.all(query, [SEARCH], function(err, rows) {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

router.get("/:id", (req, res) => {
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID WHERE PERSON_ID = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return response.error(err, res, 500);
        response.single(res, row, "ID");
    });
});

module.exports = router;