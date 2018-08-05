const soquestion = require('./stackoverflow/soquestion');

async function test() {
    const url = '.';
    const question = await soquestion(url);
    console.log(await question.formatOutput());
}

test();