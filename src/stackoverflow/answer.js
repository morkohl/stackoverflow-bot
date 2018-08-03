class Answer {
    constructor(upvotes, content) {
        this.upvotes = upvotes;
        this.content = content;
    }

    static async createAnswer(resolver) {

        return new Answer(null, null);
    };
}

module.exports = Answer.createAnswer;