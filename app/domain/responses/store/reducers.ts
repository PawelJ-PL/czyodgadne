import { combineReducers } from 'redux';
import { createReducer } from '../../../common/store/async/AsyncActionReducer';
import { updateAsyncResultIfFinished } from '../../../common/store/async/stateUtils';
import { loadRemainingResponsesAction, saveRemainingResponsesAction } from './actions';

const loadRemainingResponsesReducer = createReducer(loadRemainingResponsesAction)
    .case(saveRemainingResponsesAction.done, (state, action) => updateAsyncResultIfFinished(state, () => action.params))
    .build();

const saveRemainingResponsesReducer = createReducer(saveRemainingResponsesAction).build();

export const responsesReducer = combineReducers({
    remainingResponses: loadRemainingResponsesReducer,
    saveResponsesResult: saveRemainingResponsesReducer,
});
