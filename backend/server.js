const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(express.json());

const bookRoutes = require("./book");

app.use(cors());
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Library backend server running on http://localhost:${PORT}`);
});