const handleError = (err, res, code) => res.status(code).json({ error: err.message });

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
        return `[${this.service}] - ${this.timeStamp()} - ${msg}`;
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

const trafficLogger = new TrafficLogger();

module.exports = {
    handleError,
    trafficLogger
};