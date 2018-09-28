const config = require('../config');
const commandNameRegex = new RegExp(`^(${config.discord.prefix})([A-z]+)`);
const commands = require('./commands');
const CommandError = require('../error/CommandError');
const errorHandler = require('../error/errorHandler');

exports.processCommands = async function (msg, client) {
    const parsedCommand = await findWithArgs(msg, client);

    if (parsedCommand) {
        // check if the chosen command requires args and if they were supplied
        if (parsedCommand.command.args && !parsedCommand.suppliedArgs) {
            throw new CommandError(":warning: Incorrect command usage.", msg)
        }

        // Sends it to the commands.js exec method
        await parsedCommand.command.exec(msg, parsedCommand.suppliedArgs);
    }

    return parsedCommand;
};

async function findWithArgs(msg, client) {
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

    if (msg.content.startsWith(config.discord.javascript)) {
        const args = msg.content.substring(3);
        const allCommands = Object.keys(commands);

        if (allCommands.includes('javascript')) {
            const foundCommand = commands['javascript'];
            return {
                command: foundCommand,
                suppliedArgs: args
            };
        }
    }

    if (msg.content.substring(0, 3) == '```' &&
        msg.content.slice(-3) == '```') {
        const args = msg.content.slice(3).slice(0, -3);
        const allCommands = Object.keys(commands);

        if (allCommands.includes('jsmultiline')) {
            const foundCommand = commands['jsmultiline'];
            return {
                command: foundCommand,
                suppliedArgs: args
            };
        }
    }

    if (msg.content.startsWith(config.discord.addskill)) {
        const args = msg.content.substring(10);
        const allCommands = Object.keys(commands);

        if (allCommands.includes('skills')) {
            const foundCommand = commands['skills'];
            return {
                command: foundCommand,
                suppliedArgs: args
            };
        }
    }

    if (msg.content) {
        const allCommands = Object.keys(commands);

        if (allCommands.includes('reactions')) {
            const foundCommand = commands['reactions'];
            return {
                command: foundCommand,
                suppliedArgs: client
            };
        }
    }
}

exports.find = findWithArgs;