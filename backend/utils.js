const handleError = (err, res, code) => res.status(code).json({ error: err.message });

module.exports = {
    handleError
};