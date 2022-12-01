import { combineReducers } from 'redux';
import { loadRemainingQuestionsAction } from './actions';
import { createReducer } from '../../../common/store/async/AsyncActionReducer';

const loadRemainingQuestionsReducer = createReducer(loadRemainingQuestionsAction).build();

export const questionsReducer = combineReducers({
    remainingQuestions: loadRemainingQuestionsReducer,
});
