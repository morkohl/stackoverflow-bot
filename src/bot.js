const Discord = require('discord.js');
const config = require('./config');
const commandExecuter = require('./commands/commandExecutor');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', async msg => {
    await commandExecuter(msg);
    //do something else afterwards..
});

client.login(config.discord.token);