const express = require("express");
const router = express.Router();
const db = require("../db");
const { response } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT * FROM COPY";
    db.all(query, [], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});


router.get("/:id", (req, res) => {
    const query = "SELECT * FROM COPY WHERE ISBN = ?";
    db.all(query, [req.params.id], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

module.exports = router;
