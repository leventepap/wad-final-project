const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const bookRoutes = require('./book');

app.use('/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Library backend server running on http://localhost:${PORT}`);
});