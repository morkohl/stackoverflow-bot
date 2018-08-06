const config = require('../config');
const commandNameRegex = new RegExp(`^(${config.discord.prefix})([A-z]+)`);
const commands = require('./commands');

exports.processCommands = async function (msg) {
     const parsedCommand = await findWithArgs(msg);
     if(parsedCommand) parsedCommand.command.exec(msg, parsedCommand.args);
     return parsedCommand;
};

async function findWithArgs(msg) {
    if (msg.content.startsWith(config.discord.prefix)) {
        const commandMatch = commandNameRegex.exec(msg.content);

        if(commandMatch && commandMatch[2]) {
            const commandName = commandMatch[2];
            const allCommands = Object.keys(commands);

            if(allCommands.includes(commandName)) {
                const args = msg.content.replace(commandMatch[0], '').trim();
                const foundCommand = commands[commandName];
                return {
                    command: foundCommand,
                    args: args
                };
            }
        }
    }
}

exports.find = findWithArgs;