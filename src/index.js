const Xray = require('x-ray');
const x = new Xray();
const request = require('request-promise');

//testing..
request('https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js').then(html => {
    //question
    x(html, '#question-header', 'h1')((err, result) => {
        console.log(result);
    });

    //upvotes
    x(html, '.vote-count-post')((err, result) => {
        console.log(result);
    });

    //question text
    x(html, '.post-text')((err, result) => {
        console.log(result);
    });

    //question code
    x(html, '.post-text', 'code')((err, result) => {
        console.log(result);
    });

    //post tags
    x(html, '.post-taglist')((err, result) => {
        console.log(result);
    });

    //...asked
    //...viewed
    //...26 days ago

    //the accepted answer (remember, optional)
    x(html, '.answer.accepted-answer')((err, result) => {
        console.log(result);
    });
    //add more..
});
