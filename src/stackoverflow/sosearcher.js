const Xray = require('./xray');
const markupUtils = require('../util/markuputil');

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
            let result = await parser(html, '.question-summary', [{
                votes: '.vote strong | valueOf',
                answerCount: '.answered-accepted | valueOrNone',
                question: '.summary h3 a | trim',
                url: '.summary h3 a@href | cutRef'
            }]);

            if(result.length > 5) {
                result = result.splice(0, 5);
            }

            return new StackOverFlowSearcher(result, parser, searchString, options)
        } catch (err) {
            Promise.reject(err);
        }
    }

    formatOutput() {
        let output = `--- FOUND ${this.result.length} QUESTIONS ---`;
        for(let i = 0; i < 5; i++) {
            output = output + `\n${markupUtils.fat(i + 1)} `;
            output = output + `| Answers: ${markupUtils.fat(this.result[i].answerCount)} `;
            output = output + `| Votes: ${markupUtils.fat(this.result[i].votes)} `;
            output = output + `| "${this.result[i].question}"`
        }
        return output;
    }
}

module.exports = StackOverFlowSearcher.create;