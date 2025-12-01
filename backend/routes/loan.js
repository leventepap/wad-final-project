const express = require("express");
const router = express.Router();
const db = require("../db");
const { handleError } = require("../utils");

router.get("/", (req, res) => {
    const query = "SELECT LOAN.ID AS LOAN_ID, BOOK.TITLE, LOAN.BORROW_DATE, LOAN.DUE_DATE, LOAN.RETURN_DATE, MEMBER_ID, PERSON.NAME AS BORROWER FROM LOAN INNER JOIN BOOK ON LOAN.COPY_ID_ISBN = BOOK.ISBN INNER JOIN PERSON ON LOAN.MEMBER_ID = PERSON.ID";
    db.all(query, [], (err, rows) => {
        if (err) return handleError(err, res, 500);
        res.json(rows);
    });
});

module.exports = router;