export class NoMoreQuestionsError extends Error {
    constructor() {
        super('No more questions');
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
