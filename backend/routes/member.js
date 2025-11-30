const express = require("express");
const router = express.Router();
const db = require("../db");
const { handleError } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM PERSON INNER JOIN MEMBER ON PERSON.ID = MEMBER.PERSON_ID";
    db.all(query, [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

module.exports = router;