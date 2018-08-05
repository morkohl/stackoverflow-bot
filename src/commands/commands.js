const soquestion = require('../stackoverflow/soquestion');

module.exports = {
    help: {
        args: [],
        exec: async function (msg, input) {
        },
    },
    stackoverflow: {
        args: [],
        exec: async function (msg, input) {
            const question = await soquestion(input);
            msg.reply(question.formatOutput());
        }
    }
};