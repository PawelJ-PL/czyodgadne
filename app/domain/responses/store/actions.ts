import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('RESPONSES');

export const loadRemainingResponsesAction = actionCreator.async<void, number[], Error>('LOAD_REMAINING_RESPONSES');
