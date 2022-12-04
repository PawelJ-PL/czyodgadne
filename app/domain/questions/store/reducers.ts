import { combineReducers } from 'redux';
import { loadRemainingQuestionsAction, saveRemainingQuestionsAction } from './actions';
import { createReducer } from '../../../common/store/async/AsyncActionReducer';
import { updateAsyncResultIfFinished } from '../../../common/store/async/stateUtils';

const loadRemainingQuestionsReducer = createReducer(loadRemainingQuestionsAction)
    .case(saveRemainingQuestionsAction.done, (state, action) => updateAsyncResultIfFinished(state, () => action.params))
    .build();

const saveRemainingQuestionsReducer = createReducer(saveRemainingQuestionsAction).build();

export const questionsReducer = combineReducers({
    remainingQuestions: loadRemainingQuestionsReducer,
    saveQuestionsResult: saveRemainingQuestionsReducer,
});
