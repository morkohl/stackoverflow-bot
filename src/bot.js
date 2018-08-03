const request = require('request');
const start = new Date().getMilliseconds();
request('https://stackoverflow.com/questions/9543518/creating-arrays-in-javascript', function (err, res, body) {
    console.log(body);
});

/*
flow:
command(link)
    getHTML(link)
        -> html string
        in object (resolver)
            resolver.getReply(html)
                -> returns string for discord with first answer, seconds answer, question and link
                    FLOW OF RESOLVER objects to json:
                        question -> string
                        parseAnswers -> answers[]
                            answer:
                                user:
                                answer:
                                upvotes
                                isApprovedanswer

                        format (string to string, code string to code...) (maybe write a formatter for different languages



 */

