const chai = require('chai');
const expect = chai.expect;
const prefix = require('../src/config').discord.prefix;
const fs = require('fs');

const sosearcher = require('../src/stackoverflow/sosearcher');

const searchString = 'javascript arrays';

describe('StackOverFlowSearcher', () => {
    describe('From URL', () => {
        describe('Search request', () => {
            let testResult;
            before(async () => {
                testResult = await sosearcher(searchString);
            });

            it('should find something', async () => {
                expect(testResult).to.not.equal(undefined);
                expect(testResult.result).to.not.equal(undefined);
                expect(testResult.result).to.be.an('array');
                expect(testResult.result.length).to.be.at.least(2);
            });

            it('should have the correct question attributes', async () => {
                expect(testResult.result[0].votes).to.be.a('number');
                expect(testResult.result[0].answerCount).to.satisfy(value => { return typeof value === 'number' || value === 'unknown' });
                expect(testResult.result[0].question).to.be.a('string');
                expect(testResult.result[0].url.startsWith('/question/'))
            });
        })
    });

    describe('From HTML', () => {
        describe('Searching', () => {
            let testResult;
            before(async () => {
                const htmlText = fs.readFileSync(__dirname + '/resources/sosearcher.test-site.txt').toString();
                testResult = await sosearcher(htmlText, { isHTML: true });
            });

            it('should find something', () => {
                expect(testResult).to.not.equal(undefined);
                expect(testResult.result).to.not.equal(undefined);
                expect(testResult.result).to.be.an('array');
                expect(testResult.result.length).to.be.at.least(2);
            });

            it('should have the correct question attributes', () => {
                expect(testResult.result[0].votes).to.be.a('number');
                expect(testResult.result[0].answerCount).to.satisfy(value => { return typeof value === 'number' || value === 'unknown' });
                expect(testResult.result[0].question).to.be.a('string');
            });

            it('should contain the correct attributes for an answer class', () => {
                expect(testResult.result[0].votes).to.equal(5979);
                expect(testResult.result[0].answerCount).to.equal('unknown');
                expect(testResult.result[0].question).to.equal('A: For-each over an array in JavaScript?');
                expect(testResult.result[0].url).to.equal('https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript');
            });

            it('should contain the correct attributes for a question class', () => {
                expect(testResult.result[2].votes).to.equal(920);
                expect(testResult.result[2].answerCount).to.equal(40);
                expect(testResult.result[2].question).to.equal('Q: How can I create a two dimensional array in JavaScript?');
                expect(testResult.result[2].url).to.equal('https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript');
            })
        })
    });
});