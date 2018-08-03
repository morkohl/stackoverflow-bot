const chai = require('chai');
const expect = chai.expect;

const soparser = require('../src/stackoverflow/soparser');

const url = 'https://stackoverflow.com/questions/9543518/creating-arrays-in-javascript';

describe('StackoverflowQuestionParser', () => {
    describe('HTML parsing', () => {
        const answer = {};

        it('should fetch the html source code', () => {
            return soparser(url).then(resolver => {
                expect(resolver.url).to.not.equal(undefined);
                expect(resolver.url).to.be.a('string');
                expect(resolver.parser).to.not.equal(undefined);
                expect(resolver.body).to.not.equal(undefined);
                expect(resolver.body.length).to.be.at.least(1000);
            });
        });
    })
});
