const markupUtils = require('../util/markuputil');

class CommandError {
    constructor({
            discordMessage,
            replyMessage = 'There was a problem processing your command!'
        }) {
        this.name = "CommandError";
        this.replyMessage = `:warning: ${markupUtils.fat(replyMessage)} :warning:`;
        this.discordMessage = discordMessage;
    }
}

module.exports = CommandError;