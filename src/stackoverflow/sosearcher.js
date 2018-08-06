const request = require('request-promise');
const markupUtils = require('../util/markuputil');
const Xray = require('./xray');


class StackOverFlowSearcher {

    constructor(result, parser, searchString, options) {
        this.result = result;
        this.parser = parser;
        this.searchString = searchString;
        this.options = options;
    }

    static async create(searchString, options) {
        let html;
        if (searchString.startsWith('<html')) {
            html = searchString;
        } else {
            html = `https://stackoverflow.com/search?q=${encodeURI(searchString)}`;
        }

        try {
            const parser = Xray(options);
            const result = await parser(html, '.question-summary', [{
                votes: '.vote strong | valueOf',
                answerCount: '.answered-accepted | valueOrNone',
                question: '.summary .result-link a@title',
                url: '.summary .result-link a@href | cutRef'
            }]);
            return new StackOverFlowSearcher(result, parser, searchString, options)
        } catch (err) {
            Promise.reject(err);
        }
    }

    async formatOutput() {
        let output = `--- FOUND ${this.result.length} QUESTIONS ---`;
        for(let i = 0; i <= 5; i++) {
            output = output + `${i + 1} 
            | Votes: ${this.result[i].votes} 
            | Answers: ${this.result[i].answerCount}
            | "${this.result[i].question}"`;
        }
        return output;
    }
}

module.exports = StackOverFlowSearcher.create;