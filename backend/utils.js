class Logger {
    constructor(service) {
        this.service = service;
    }

    timeStamp() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const miliSeconds = String(now.getMilliseconds()).padStart(3, "0");
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const day = String(now.getDate()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}.${miliSeconds} ${year}-${month}-${day}`;
    }

    formatMessage(msg) {
        return `[${this.service}] - [${this.timeStamp()}] - ${msg}`;
    }

    info(msg) {
        console.log(this.formatMessage(msg));
    }

    warn(msg) {
        console.warn(this.formatMessage(msg));
    }

    error(msg) {
        console.error(this.formatMessage(msg));
    }
}

class TrafficLogger extends Logger {
    constructor() {
        super("HTTP");
    }

    formatMessage(req) {
        return `[${this.service}] - [${this.timeStamp()}] - ${req.host} requested ${req.method}${req.originalUrl}`;
    }
}

class Response {
    constructor() {
        this.dbLogger = new Logger("DB");
        this.errorLogger = new Logger("ERROR");
    }

    all(res, rows) {
        if (rows.length > 0) {
            this.dbLogger.info(`${rows.length} row(s) retrieved`);
            return res.json(rows);
        }
        this.dbLogger.warn("No data retrieved");
    }

    single(res, row, property) {
        this.dbLogger.info(`${row[`${property}`]} retrieved`);
        return res.json(row);
    }

    create(res, content, msg) {
        this.dbLogger.info(msg);
        return res.json(content);
    }

    error(err, res, code) {
        this.errorLogger.error(err);
        return res.status(code).json({ error: err.message });
    }
}

const sysLogger = new Logger("SYSTEM");
const trafficLogger = new TrafficLogger();
const response = new Response();

module.exports = {
    sysLogger,
    trafficLogger,
    response
};