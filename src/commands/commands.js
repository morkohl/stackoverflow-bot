const Discord = require('discord.js');
const soquestion = require('../stackoverflow/soquestion');
const sosearcher = require('../stackoverflow/sosearcher');

//Add args to each command so we can verify in commandparser if they exist?
module.exports = {
    help: {
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
            //start typing...
            //do something if no results found
            const searchResult = await sosearcher(args);

            await msg.reply(searchResult.formatOutput());

            const messageCollector = new Discord.MessageCollector(msg.channel, m => msg.author.id === m.author.id, { time: 10000, maxMatches: 1 });

            messageCollector.on("collect" , async collectedMsg => {
                let selectionIndex;
                let selection;
                try {
                    selectionIndex = Number(collectedMsg.content - 1);
                } catch(err) {
                    return await msg.reply(`"${collectedMsg.content}" is not a number.`)
                }

                if(searchResult.result[selectionIndex]) {
                    selection = await soquestion(searchResult.result[selectionIndex].url);
                    return await msg.reply(selection.formatOutput())
                }

                await msg.reply('Please chose a number from the list above...')
            });
        }
    }
};