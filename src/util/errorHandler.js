class BotError {
    constructor({
        error,
        message = "Unexpected Error",
        errors = [],
        stack = null
    }) {
        this.name = "BotError";
        this.error = error;
        this.message = message;
        this.errors = errors;
        this.stack = stack ? stack :  Error.captureStacktrace(this, BotError);
    }
}

async function handleError(err) {
    if(!(err instanceof BotError)) {
        err = createFrom(err);
    }

    console.error(`[${new Date()}] ERROR: ${err.message}, ${err.stack}`);
}

function createFrom(err) {
    return new BotError({
        err: err,
        message: err.message,
        errors: err.errors,
        stack: err.stack
    })
}

module.exports = handleError;