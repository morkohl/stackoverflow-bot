const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const soquestion = require('../src/stackoverflow/soquestion');

const url = 'https://stackoverflow.com/questions/9543518/creating-arrays-in-javascript';

describe('StackOverFlowQuestion', () => {
    describe('From URL', () => {
        let testquestion;
        before(async () => {
            testquestion = await soquestion(url);
        });

        describe('Question parsing', () => {

            it('should get the question and the correct attributes', () => {
                expect(testquestion).to.not.equal(undefined);
                expect(testquestion.result.question.title).to.equal('Creating arrays in Javascript');
                expect(testquestion.result.question.questionTexts.length).to.be.at.least(2);
                expect(testquestion.result.question.tags).to.deep.equal([ 'javascript', 'arrays', 'multidimensional-array' ]);
                expect(testquestion.result.question.upvotes).to.equal(3);
            });

            it('should get answers', () => {
                expect(testquestion.result.answers.length).to.be.at.least(3);
            });

            it('should get the correct answer attributes for the accepted answer', () => {
                const index = 0;
                expect(testquestion.result.answers[index].answerTexts.length).to.be.at.least(2);
                expect(testquestion.result.answers[index].upvotes).to.equal(14);
                expect(testquestion.result.answers[index].accepted).to.equal(true);
            });

            it('should get the correct attributes for any other answer', () => {
                const index = 1;
                expect(testquestion.result.answers[index].answerTexts.length).to.be.at.least(2);
                expect(testquestion.result.answers[index].upvotes).to.equal(2);
                expect(testquestion.result.answers[index].accepted).to.equal(false);
            })
        })
    });

    describe('From HTML', () => {
        let testquestion;
        before(async () => {
            const htmlText = fs.readFileSync(__dirname + '/resources/stackoverflow.test-site.txt').toString();
            testquestion = await soquestion(htmlText);
        });

        it('should get the question and the correct attributes', () => {
            expect(testquestion).to.not.equal(undefined);
            expect(testquestion.result.question.title).to.equal('Creating arrays in Javascript');
            expect(testquestion.result.question.questionTexts.length).to.be.at.least(2);
            expect(testquestion.result.question.tags).to.deep.equal([ 'javascript', 'arrays', 'multidimensional-array' ]);
            expect(testquestion.result.question.upvotes).to.equal(3);
        });

        it('should get answers', () => {
            expect(testquestion.result.answers.length).to.be.at.least(3);
        });

        it('should get the correct answer attributes for the accepted answer', () => {
            const index = 0;
            expect(testquestion.result.answers[index].answerTexts.length).to.be.at.least(2);
            expect(testquestion.result.answers[index].upvotes).to.equal(14);
            expect(testquestion.result.answers[index].accepted).to.equal(true);
        });

        it('should get the correct attributes for any other answer', () => {
            const index = 1;
            expect(testquestion.result.answers[index].answerTexts.length).to.be.at.least(2);
            expect(testquestion.result.answers[index].upvotes).to.equal(2);
            expect(testquestion.result.answers[index].accepted).to.equal(false);
        })
    })
});
