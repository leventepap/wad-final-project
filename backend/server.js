const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(express.json());

const bookRoutes = require("./routes/book");
const personRoutes = require("./routes/person");

app.use(cors());
app.use("/api/book", bookRoutes);
app.use("/api/person", personRoutes);

app.listen(PORT, () => {
    console.log(`Library backend server running on http://localhost:${PORT}`);
});