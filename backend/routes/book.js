const express = require("express");
const router = express.Router();
const db = require("../db");
const { response } = require("../utils");

const isValidISBN = (isbn) => {
    const isbnRegex = /^\d{13}$/;
    return isbnRegex.test(isbn);
};

const isValidTitle = (title) => {
    return typeof title === 'string' && title.trim().length >= 1 && title.trim().length <= 255;
};

const isValidEdition = (edition) => {
    return typeof edition === 'string' && edition.trim().length >= 1 && edition.trim().length <= 50;
};

const isValidPublication = (date) => {
    const publicationDate = new Date(date);
    const today = new Date();
    return !isNaN(publicationDate) && publicationDate <= today;
};

router.get("/", (req, res) => {
    const query = "SELECT * FROM BOOK";
    db.all(query, [], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

router.post("/search", (req, res) => {
    const { SEARCH } = req.body;
    if (!SEARCH || typeof SEARCH !== 'string') {
        return response.error(new Error("Invalid search parameter."), res, 400);
    }
    
    const query = "SELECT * FROM BOOK WHERE TITLE LIKE ?";
    db.all(query, [SEARCH], (err, rows) => {
        if (err) return response.error(err, res, 500);
        response.all(res, rows);
    });
});

router.get("/:id", (req, res) => {
    if (!isValidISBN(req.params.id)) {
        return response.error(new Error("Invalid ISBN format."), res, 400);
    }

    const query = "SELECT * FROM BOOK WHERE ISBN = ?";
    db.get(query, [req.params.id], (err, row) => {
        if (err) return response.error(err, res, 500);
        response.single(res, row, "ISBN");
    });
});

router.post("/", (req, res) => {
    const { ISBN, TITLE, EDITION, PUBLICATION } = req.body;

    const validationErrors = [];

    if (!ISBN || !isValidISBN(ISBN)) {
        validationErrors.push("Invalid ISBN format: Must be 13 digits.");
    }
    
    if (!TITLE || !isValidTitle(TITLE)) {
        validationErrors.push("Invalid title: Must be between 1 and 255 characters.");
    }

    if (!EDITION || !isValidEdition(EDITION)) {
        validationErrors.push("Invalid edition: Must be between 1 and 50 characters.");
    }

    if (!PUBLICATION || !isValidPublication(PUBLICATION)) {
        validationErrors.push("Invalid publication date: Must be a valid date not in the future.");
    }

    if (validationErrors.length > 0) {
        return response.error(new Error(validationErrors.join(" ")), res, 400);
    }

    const query = "INSERT INTO BOOK (ISBN, TITLE, EDITION, PUBLICATION) VALUES (?, ?, ?, ?)";
    db.run(query, [ISBN, TITLE, EDITION, PUBLICATION], function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return response.error(new Error("ISBN already exists."), res, 409);
            }
            return response.error(err, res, 500);
        }
        response.create(res, { ISBN }, `Book ${ISBN} added successfully!`);
    });
});

router.patch("/:id", (req, res) => {
    if (!isValidISBN(req.params.id)) {
        return response.error(new Error("Invalid ISBN format."), res, 400);
    }

    const { TITLE, EDITION, PUBLICATION } = req.body;
    const fields = [];
    const values = [];
    const validationErrors = [];

    if (TITLE !== undefined) {
        if (!isValidTitle(TITLE)) {
            validationErrors.push("Invalid title: Must be between 1 and 255 characters.");
        } else {
            fields.push("TITLE = ?");
            values.push(TITLE);
        }
    }

    if (EDITION !== undefined) {
        if (!isValidEdition(EDITION)) {
            validationErrors.push("Invalid edition: Must be between 1 and 50 characters.");
        } else {
            fields.push("EDITION = ?");
            values.push(EDITION);
        }
    }

    if (PUBLICATION !== undefined) {
        if (!isValidPublication(PUBLICATION)) {
            validationErrors.push("Invalid publication date: Must be a valid date not in the future.");
        } else {
            fields.push("PUBLICATION = ?");
            values.push(PUBLICATION);
        }
    }

    if (validationErrors.length > 0) {
        return response.error(new Error(validationErrors.join(" ")), res, 400);
    }

    if (fields.length === 0) {
        return response.error(new Error("No valid fields to update."), res, 400);
    }

    values.push(req.params.id);
    const updateQuery = `UPDATE BOOK SET ${fields.join(", ")} WHERE ISBN = ?`;

    db.run(updateQuery, values, function(err) {
        if (err) return response.error(err, res, 500);
        if (this.changes === 0) {
            return response.error(new Error("Book not found."), res, 404);
        }

        const selectQuery = "SELECT * FROM BOOK WHERE ISBN = ?";
        db.get(selectQuery, [req.params.id], (err, row) => {
            if (err) return response.error(err, res, 500);
            response.single(res, row, "ISBN");
        });
    });
});

router.delete("/:id", (req, res) => {
    if (!isValidISBN(req.params.id)) {
        return response.error(new Error("Invalid ISBN format."), res, 400);
    }

    db.run("DELETE FROM BOOK WHERE ISBN = ?", [req.params.id], function(err) {
        if (err) return response.error(err, res, 500);
        if (this.changes === 0) {
            return response.error(new Error("Book not found."), res, 404);
        }
        response.create(res, { deletedRows: this.changes }, `Book ${req.params.id} deleted successfully!`);
    });
});

module.exports = router;