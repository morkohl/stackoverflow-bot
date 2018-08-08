const BotError = require('./BotError');
const CommandError = require('./CommandError');
const client = require('../bot');
const logger = require('../util/logger');

async function handleError(err) {
    if (!(err instanceof BotError)) {
        err = createFrom(err);
    }

    if (err instanceof CommandError) {
        await err.discordMessage.channel.send(err.replyMessage);
    } else {
        const logMessage = `${err.error.name}, ${err.message}, ${err.stack}`;
        err.warn ? logger.warn(logMessage) : logger.error(logMessage);
    }
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