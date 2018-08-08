class BotError {
    constructor({
                    error,
                    message = "Unexpected Error",
                    errors = [],
                    stack = null,
                    warn = true
                }) {
        this.stack = stack ? stack : Error.captureStackTrace(this, BotError);
        this.name = "BotError";
        this.error = error;
        this.message = message;
        this.errors = errors;
        this.warn = warn ? warn : false;
    }
}

module.exports = BotError;