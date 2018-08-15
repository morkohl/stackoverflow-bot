class BotError {
    constructor({
            error,
            message = "Unexpected Error",
            stack = null,
            warn = true
        }) {
        this.stack = stack ? stack : Error.captureStackTrace(this, BotError);
        this.name = "BotError";
        this.error = error;
        this.message = message;
        this.warn = warn ? warn : false;
    }
}

module.exports = BotError;