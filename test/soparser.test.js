const chai = require('chai');
const expect = chai.expect;

const soparser = require('../src/stackoverflow/soparser');

const url = 'https://stackoverflow.com/questions/9543518/creating-arrays-in-javascript';

describe('StackoverflowQuestionParser', () => {
    describe('HTML parsing', () => {

/*
        it('should fetch the html source code', () => {
            return soparser(url).then(soparser => {
                expect(soparser.url).to.not.equal(undefined);
                expect(soparser.url).to.be.a('string');
                expect(soparser.parser).to.not.equal(undefined);
                expect(soparser.body).to.not.equal(undefined);
                expect(soparser.body.length).to.be.at.least(1000);
            });
        });
*/

        it('should return the main div', () => {
        })
    })
});
