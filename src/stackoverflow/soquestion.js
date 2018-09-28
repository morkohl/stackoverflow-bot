const request = require('request-promise');
const markupUtils = require('../util/markuputil');
const Xray = require('./xray');

class StackOverFlowQuestion {
    constructor(result, parser, url) {
        this.result = result;
        this.parser = parser;
        this.url = url;
    }

    static async create(url, options) {
        let html;
        if (url.startsWith('http')) {
            try {
                html = await request(url);
            } catch (err) {
                return Promise.reject(err);
            }

        } else {
            html = url;
        }

        try {
            const parser = Xray(options);
            const result = await parser(html, '.inner-content', {
                question: {
                    title: '#question-header h1',
                    upvotes: '.vote-count-post | valueOf',
                    //this is kind of ugly easiest solution would probably be to parse the mardown from '#question .post-text by ourselves...
                    questionTexts: ['#question .post-text p,#question .post-text pre, #question .post-text p code'],
                    questionMultiLineCodeText: ['#question .post-text pre'],
                    questionSingleLineCodeText: ['#question .post-text p code'],
                    tags: parser(html, '.post-taglist', ['.post-tag']),
                    metadata: ['#qinfo b'],
                },
                answers: parser(html, '.answer', [{
                    answerTexts: ['.answer .post-text p,.answer .post-text pre, #question .post-text p code'],
                    answerMultiLineCodeText: ['.answer .post-text pre'],
                    answerSingleLineCodeText: ['.answer .post-text p code'],
                    upvotes: '.vote-count-post | valueOf',
                    accepted: '.vote-accepted-on | isAccepted'
                }])
            });
            result.question.questionTexts = result.question.questionTexts.map(questionText => {
                if (result.question.questionMultiLineCodeText.includes(questionText)) {
                    return markupUtils.code.multiLineImplLanguage(questionText, 'js');
                } else if (result.question.questionSingleLineCodeText.includes(questionText)) {
                    return markupUtils.code.singleLine(questionText);
                }
                return questionText;
            });
            delete result.question.questionMultiLineCodeText;
            delete result.question.questionSingleLineCodeText;

            result.answers = result.answers.map(answer => {
                answer.answerTexts = answer.answerTexts.map(answerText => {
                    if (answer.answerMultiLineCodeText.includes(answerText)) {
                        return markupUtils.code.multiLineImplLanguage(answerText, 'js');
                    } else if (answer.answerSingleLineCodeText.includes(answerText)) {
                        return markupUtils.code.singleLine(answerText);
                    }
                    return answerText;
                });
                delete answer.answerMultiLineCodeText;
                delete answer.answerSingleLineCodeText;
                return answer;
            });

            const metadataNames = ['created', 'views', 'lastActive'];
            metadataNames.map((name, index) => {
                result.question[name] = result.question.metadata[index];
            });

            delete result.question.metadata;

            return new StackOverFlowQuestion(result, parser, url);
        } catch (err) {
            Promise.reject(err);
        }
    }

    formatOutput() {
        let output = `--- ${markupUtils.crossed_fat(this.result.question.title)} ---\n`;
        output = output + this.result.question.questionTexts.join('\n');
        output = output + `\n\n${markupUtils.crossed_fat('--- ACCEPTED ANSWER ---')}\n`;
        output = output + this.result.answers[0].answerTexts.join('\n');

        const urlFooter = `\n\n${markupUtils.fat('READ MORE AT:')} ${this.url}`;

        if (output.length > 2000) {
            const answerTooLong = `${markupUtils.fat('... answer too long ...')}`;
            output = output.substring(0, 2000 - answerTooLong.length - urlFooter.length);
            output = output + answerTooLong
        }
        output = output + urlFooter;
        return output;
    }
}

module.exports = StackOverFlowQuestion.create;