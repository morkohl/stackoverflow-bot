const config = require('../config');
const commandNameRegex = new RegExp(`^(${config.discord.prefix})([A-z]+)`);
const commands = require('./commands');

module.exports = async function (msg) {

    if (msg.content.startsWith(config.discord.prefix)) {
        const commandNameMatch = commandNameRegex.exec(msg.content);

        if(commandNameMatch && commandNameMatch[2]) {
            const commandName = commandNameMatch[2];
            const commandNames = Object.keys(commands);

            if(commandNames.includes(commandName)) {
                const args = msg.content.replace(commandNameMatch[0], '').trim();
                await commands[commandName].exec(msg, args);
            }
        }
    }
};