const Discord = require('discord.js');
const safeEval = require('notevil');
const soquestion = require('../stackoverflow/soquestion');
const sosearcher = require('../stackoverflow/sosearcher');

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

            messageCollector.on("collect", async collectedMsg => {
                let selectionIndex;
                let selection;
                try {
                    selectionIndex = Number(collectedMsg.content - 1);
                } catch (err) {
                    return await msg.reply(`"${collectedMsg.content}" is not a number.`)
                }

                if (searchResult.result[selectionIndex]) {
                    selection = await soquestion(searchResult.result[selectionIndex].url);
                    return await msg.reply(selection.formatOutput())
                }

                await msg.reply('Please chose a number from the list above...')
            });
        }
    },
    javascript: {
        name: 'javascript',
        args: [],
        exec: async function (msg, args) {
            try {
                const result = safeEval(args);
                await msg.reply("Result: " + result);
            } catch (error) {
                await msg.reply(`${error.name}, Reason: ${error.message}`);
            }
        }
    },
    jsmultiline: {
        name: 'jsmultiline',
        args: [],
        exec: async function (msg, args) {
            try {
                const result = safeEval(args);
                await msg.reply("Result: " + result);
            } catch (error) {
                await msg.reply(`${error.name}, Reason: ${error.message}`);
            }
        }
    },
    reactions: {
        name: 'reactions',
        args: [],
        exec: async function (msg, args) {
            try {
                const chance = Math.random();
                if (chance < 0.15) {
                    const myArray = ["chrissean", "pepethinks", "pepesweating", "haha", "pepefedora", "pepehappy", "pepeanalysis"];
                    const rand = myArray[Math.floor(Math.random() * myArray.length)];
                    const reaction = await args.emojis.find("name", rand);
                    await msg.react(reaction);
                }

                if (msg.content.toLowerCase().includes("welcome")) {
                    let reaction = args.emojis.find("name", "doggo");
                    msg.react(reaction);
                    reaction = args.emojis.find("name", "blobrave");
                    msg.react(reaction);
                    reaction = args.emojis.find("name", "neko");
                    msg.react(reaction);
                    reaction = args.emojis.find("name", "birdvote");
                    msg.react(reaction);
                }

            } catch (error) {
                await msg.reply(`${error.name}, Reason: ${error.message}`);
            }
        }
    },
    skills: {
        name: 'skills',
        args: [],
        exec: async function (msg, args) {
            try {
                const member = msg.member;
                let role = await msg.guild.roles.find("name", args);
                await member.addRole(role).catch(console.error);
                await msg.reply("Added role: " + role);
            } catch (error) {
                await msg.reply(`${error.name}, Reason: ${error.message}`);
            }
        }
    }
};