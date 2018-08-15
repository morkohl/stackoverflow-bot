const config = require('../config');
const commandNameRegex = new RegExp(`^(${config.discord.prefix})([A-z]+)`);
const commands = require('./commands');
const CommandError = require('../error/CommandError');
const markupUtils = require('../util/markuputil');

exports.processCommands = async function (msg) {
    if (hasPrefix(msg)) {
        const parsedCommand = await findWithArgs(msg);

        if (parsedCommand.command.args && !parsedCommand.suppliedArgs) {
            throw new CommandError({
                replyMessage: `Incorrect command usage. try ${markupUtils.code.singleLine(`${config.discord.prefix}help ${parsedCommand.command.name}`)} for more information!`,
                discordMessage: msg
            })
        }

        await parsedCommand.command.exec(msg, parsedCommand.suppliedArgs);
        return parsedCommand;
    }
};

async function findWithArgs(msg) {
    const commandMatch = commandNameRegex.exec(msg.content);
    if (commandMatch && commandMatch[2]) {
        const potentialArgs = commandMatch[0];
        const commandName = commandMatch[2];

        if (isKnownCommand(commandName)) {
            const args = getArgs(msg, potentialArgs);
            const foundCommand = commands[commandName];
            return {
                command: foundCommand,
                suppliedArgs: args
            };
        }
    }
    throw new CommandError({
        discordMessage: msg,
        replyMessage: `Unknown command. Use ${markupUtils.code.singleLine('help')} to find out more about my commands`
    })
}

function getArgs(msg, potentialArgs) {
    return msg.content.replace(potentialArgs, '').trim()
}

function isKnownCommand(commandName) {
    return Object.keys(commands).includes(commandName);
}

function hasPrefix(msg) {
    return msg.content.startsWith(config.discord.prefix)
}

exports.find = findWithArgs;