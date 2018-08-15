const Discord = require('discord.js');
const soquestion = require('../stackoverflow/soquestion');
const sosearcher = require('../stackoverflow/sosearcher');

module.exports = {
    help: {
        args: null,
        name: 'help',
        exec: async function (msg, args) {
        },
    },
    stackoverflow: {
        name: 'stackoverflow',
        args: [],
        exec: async function (msg, args) {
            if (args.trim() === '') {
                return await msg.reply("Incorrect command usage. Add a search statement.")
            }
            const searchResult = await sosearcher(args);

            await msg.channel.send(searchResult.formatOutput());

            const messageCollector = new Discord.MessageCollector(msg.channel, m => msg.author.id === m.author.id, { time: 30000, maxMatches: 1 });

            messageCollector.on("collect" , async collectedMsg => {
                let selectionIndex;
                let selection;
                try {
                    selectionIndex = Number(collectedMsg.content - 1);
                } catch(err) {
                    return await msg.channel.send(`"${collectedMsg.content}" is not a number.`)
                }

                if(searchResult.result[selectionIndex]) {
                    selection = await soquestion(searchResult.result[selectionIndex].url);
                    return await msg.reply(selection.formatOutput())
                }

                await msg.channel.send('Please chose a number from the list above...')
            });
        }
    }
};