const discord = require('discord.js');
const soquestion = require('../stackoverflow/soquestion');
const sosearcher = require('../stackoverflow/sosearcher');

module.exports = {
    help: {
        name: 'help',
        args: [],
        exec: async function (msg, input) {
        },
    },
    stackoverflow: {
        name: 'stackoverflow',
        args: [],
        exec: async function (msg, input) {
            const searchResult = await sosearcher(input.args);
            const selectionString = await searchResult.formatOutput();
            msg.awaitResponse(msg, selectionString, async (err, newMsg) => {
                let selection;
                try {
                    selection = Number(newMsg.content);
                } catch(err) {
                    await msg.reply(`"${newMsg.content}" is not a number.`);
                    return;
                }

                const question = await soquestion(searchResult.result[selection - 1].url);

                msg.reply(await question.formatOutput())

            })
        }
    }
};

