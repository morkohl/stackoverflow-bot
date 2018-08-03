class Question {
    constructor(upvotes, content) {
        this.upvotes = upvotes;
        this.content = content;
    }

    static async createQuestion(resolver) {

        return new Question(null, null);
    }
}

module.exports = Question.createQuestion;