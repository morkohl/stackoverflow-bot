const Discord = require('discord.js');
const config = require('./config');
const commandParser = require('./commands/commandParser');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', async msg => {
    await commandParser.processCommands(msg);
});

client.login(config.discord.token);