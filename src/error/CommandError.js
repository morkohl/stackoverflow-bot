class CommandError {
    constructor({
                    replyMessage = "There was a problem registering your command",
                    discordMessage,
                }) {
        this.name = "CommandError";
        this.replyMessage = replyMessage;
        this.discordMessage = message;
    }
}