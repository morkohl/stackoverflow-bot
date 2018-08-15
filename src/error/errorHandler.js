const BotError = require('./BotError');
const CommandError = require('./CommandError');
const logger = require('../util/logger');

async function handleError(err) {
    if (!(err instanceof BotError || err instanceof CommandError)) {
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
        error: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = handleError;