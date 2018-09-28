const Discord = require('discord.js');
const commandParser = require('./commands/commandParser');
const errorHandler = require('./error/errorHandler');
const config = require('./config');
const logger = require('./util/logger');

const client = new Discord.Client();

client.on('ready', () => {
    logger.info("Ready!")
});

client.on('message', async msg => {
    try {
        await commandParser.processCommands(msg, client);
    } catch (err) {
        await errorHandler(err);
    }
});

client.on('error', async (err) => {
    await errorHandler(err);
});

module.exports = async (config) => {
    try {
        await client.login(config.discord.token);
    } catch (err) {
        await errorHandler(err);
    }
};

client.login(config.discord.token);
require('http').createServer().listen(3000);


module.exports = client;