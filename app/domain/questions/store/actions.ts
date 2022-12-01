import actionCreatorFactory from 'typescript-fsa';
import { Question } from '../types/question';

const actionCreator = actionCreatorFactory('QUESTIONS');

export const loadRemainingQuestionsAction = actionCreator.async<void, Question[], Error>('LOAD_REMAINING_QUESTIONS');
