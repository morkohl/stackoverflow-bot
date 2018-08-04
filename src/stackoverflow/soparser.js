const request = require('request-promise');
const question = require('./question');
const answer = require('./answer');
const Xray = require('x-ray');

class StackoverflowQuestionParser {
    constructor(url, body, parser) {
        this.url = url;
        this.parser = parser;
    }

    static async createStackoverflowParser(url) {
        const parser = new Xray();
        return new StackoverflowQuestionParser(url, parser);
    }

    async question() {
        this.question = await question(this);
        return null;
    }

    async answers() {
        this.answers = await answer(this);
        return null;
    }

    async formatOutput() {
        return null;
    }
}


module.exports = StackoverflowQuestionParser.createStackoverflowParser;