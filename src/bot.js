const Discord = require('discord.js');
const commandParser = require('./commands/commandParser');
const errorHandler = require('./util/errorHandler');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', async msg => {
    try {
        await commandParser.processCommands(msg);
    } catch(err) {
        await errorHandler(err);
    }
});

client.on('error', async err => {
    await errorHandler(err);
});

module.exports = async (config) => {
    try {
        await client.login(config.discord.token);
    } catch(err) {
        await errorHandler(err);
    }
};
