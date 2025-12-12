const express = require("express");
const app = express();
const cors = require("cors");
const { sysLogger, trafficLogger } = require("./utils");
const SERVER_HOST = "http://localhost";
const SERVER_PORT = 3001;
const SERVER_URL = `${SERVER_HOST}:${SERVER_PORT}`;
const CLIENT_HOST = "http://localhost";
const CLIENT_PORT = 3000;
const CLIENT_URL = `${CLIENT_HOST}:${CLIENT_PORT}`;

app.use(express.json());

const bookRoutes = require("./routes/book");
const personRoutes = require("./routes/person");
const memberRoutes = require("./routes/member");
const loanRoutes = require("./routes/loan");
const authorRoutes = require("./routes/author");

app.use(cors({
    origin: CLIENT_URL,
}));

app.use((req, res, next) => {
    trafficLogger.info(req);
    next();
});

app.use("/api/book", bookRoutes);
app.use("/api/person", personRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/author", authorRoutes);

app.listen(SERVER_PORT, () => {
    sysLogger.info(`Library Management System backend server running on ${SERVER_URL}`);
});