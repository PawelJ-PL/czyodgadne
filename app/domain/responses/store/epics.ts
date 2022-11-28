import { allResponses } from './../data/responses';
import { combineEpics } from 'redux-observable';
import { loadRemainingResponsesAction } from './actions';
import { createEpic } from './../../../common/components/store/async/AsyncEpic';
import { ApplicationState } from '../../../common/components/store';
import { Action } from 'redux';
import { delayedPromise } from '../../../common/utils/delayedPromise';
import { getItem, setItem } from '../../../common/utils/storage/storage';
import { z } from 'zod';

const STORED_RESPONSES_KEY = 'remainingResponses';

// Imperative approach for performance reasons
const readAllResponseIds = async () => {
    const ids: number[] = [];

    for (const response of allResponses()) {
        await delayedPromise(() => undefined);
        ids.push(response.id);
    }

    return ids;
};

const genetAndStoreAllResponseIds = async () => {
    const responses = await readAllResponseIds();
    await setItem(STORED_RESPONSES_KEY, responses);
    return responses;
};

const loadRemainingResponsesEpic = createEpic(loadRemainingResponsesAction, async () => {
    const storedResponses =
        (await getItem(STORED_RESPONSES_KEY, z.number().array())) ?? (await genetAndStoreAllResponseIds());
    return storedResponses;
});

export const responsesEpic = combineEpics<Action, Action, ApplicationState>(loadRemainingResponsesEpic);
