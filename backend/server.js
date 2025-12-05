const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(express.json());

const bookRoutes = require("./routes/book");
const personRoutes = require("./routes/person");
const memberRoutes = require("./routes/member");
const loanRoutes = require("./routes/loan");
const authorRoutes = require("./routes/author");

app.use(cors());
app.use("/api/book", bookRoutes);
app.use("/api/person", personRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/author", authorRoutes);

app.listen(PORT, () => {
    console.log(`Library backend server running on http://localhost:${PORT}`);
});