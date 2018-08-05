const soquestion = require('./stackoverflow/soquestion');

async function test() {
    const url = 'https://stackoverflow.com/questions/9543518/creating-arrays-in-javascript';
    const question = await soquestion(url);
    console.log(await question.formatOutput());
}

test();