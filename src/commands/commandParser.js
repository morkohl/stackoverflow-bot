const config = require('../config');
const commandNameRegex = new RegExp(`^(${config.discord.prefix})([A-z]+)`);
const commands = require('./commands');
const CommandError = require('../error/CommandError');
const errorHandler = require('../error/errorHandler');

exports.processCommands = async function (msg) {
    const parsedCommand = await findWithArgs(msg);

    if (parsedCommand) {
        //check if the chosen command requires args and if they were supplied
        if (parsedCommand.command.args && !parsedCommand.suppliedArgs) {
            throw new CommandError(":warning: Incorrect command usage.", msg)
        }
        await parsedCommand.command.exec(msg, parsedCommand.suppliedArgs);
    }

    return parsedCommand;
};

async function findWithArgs(msg) {
    if (msg.content.startsWith(config.discord.prefix)) {
        const commandMatch = commandNameRegex.exec(msg.content);

        if (commandMatch && commandMatch[2]) {
            const commandName = commandMatch[2];
            const allCommands = Object.keys(commands);

            if (allCommands.includes(commandName)) {
                const args = msg.content.replace(commandMatch[0], '').trim();
                const foundCommand = commands[commandName];
                return {
                    command: foundCommand,
                    suppliedArgs: args
                };
            }
        }
    }
}

exports.find = findWithArgs;