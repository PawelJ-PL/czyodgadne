import { combineReducers } from 'redux';
import { createReducer } from '../../../common/components/store/async/AsyncActionReducer';
import { loadRemainingResponsesAction } from './actions';

const loadRemainingResponsesReducer = createReducer(loadRemainingResponsesAction).build();

export const responsesReducer = combineReducers({
    remainingResponses: loadRemainingResponsesReducer,
});
