import actionCreatorFactory from 'typescript-fsa';
import { Question } from '../types/question';

const actionCreator = actionCreatorFactory('QUESTIONS');

export type QuestionAnswer = {
    questionId: number;
    answer: 'yes' | 'no';
};

export const loadRemainingQuestionsAction = actionCreator.async<void, Question[], Error>('LOAD_REMAINING_QUESTIONS');

export const answerQuestionAction = actionCreator<QuestionAnswer>('ANSWER_QUESTION');

export const saveRemainingQuestionsAction = actionCreator.async<Question[], void, Error>('SAVE_REMAINING_QUESTIONS');
