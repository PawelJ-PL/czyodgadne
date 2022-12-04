import { saveRemainingResponsesAction } from './../../responses/store/actions';
import { delayedPromise } from './../../../common/utils/delayedPromise';
import { allQuestions } from './../data/questions';
import { Question, questionSchema } from './../types/question';
import { getItem, removeItem, setItem } from './../../../common/utils/storage/storage';
import { combineEpics, Epic } from 'redux-observable';
import { answerQuestionAction, loadRemainingQuestionsAction, saveRemainingQuestionsAction } from './actions';
import { createEpic } from './../../../common/store/async/AsyncEpic';
import { z } from 'zod';
import splitEvery from 'ramda/src/splitEvery';
import { NoMoreQuestionsError } from '../types/errors';
import { v4 as uuidv4 } from 'uuid';
import partition from 'ramda/src/partition';
import intersection from 'ramda/src/intersection';
import difference from 'ramda/src/difference';
import { AnyAction } from 'redux';
import { ApplicationState } from '../../../common/store';
import { EMPTY, filter, mergeMap, of } from 'rxjs';

const CHUNKS_LIST_KEY = 'questionsChunks';
const CURRENT_CHUNK_KEY = 'currentQuestionChunk';
const CHUNK_SIZE = 3;

const loadNewQuestions = async (): Promise<Question[]> => {
    const questions = allQuestions();
    await unsafeAsyncShuffle(questions);
    const partitions = splitEvery(CHUNK_SIZE)(questions);
    const currentChunk = partitions.shift();
    if (!currentChunk) {
        return Promise.reject(new NoMoreQuestionsError());
    }
    await setItem(CURRENT_CHUNK_KEY, currentChunk);
    const chunkIds = await Promise.all(partitions.map((part) => saveQuestions(part)));
    await setItem(CHUNKS_LIST_KEY, chunkIds);
    return currentChunk;
};

// Imperative and mutable for performance reason
const unsafeAsyncShuffle = async <T>(input: T[]): Promise<void> => {
    for (let i = input.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = input[i];
        input[i] = input[j];
        input[j] = temp;
        await delayedPromise(() => undefined);
    }
};

const saveQuestions = async (questions: Question[]): Promise<string> => {
    const chunkId = uuidv4();
    await setItem(chunkId, questions);
    return chunkId;
};

const setNextAsCurrent = async (): Promise<Question[]> => {
    const chunks = await getItem(CHUNKS_LIST_KEY, z.string().array());
    if (!chunks) {
        return Promise.reject(new Error('Missing chunks list'));
    }
    const nextChunk = chunks.shift();
    if (!nextChunk) {
        return Promise.reject(new NoMoreQuestionsError());
    }
    const questions = await getItem(nextChunk, questionSchema.array());
    if (!questions) {
        return Promise.reject(new Error(`No item found for chunk ${nextChunk}`));
    }
    await setItem(CURRENT_CHUNK_KEY, questions);
    await setItem(CHUNKS_LIST_KEY, chunks);
    await removeItem(nextChunk);
    return questions;
};

const loadRemainingQuestionsEpic = createEpic(loadRemainingQuestionsAction, async () => {
    const currentQuestions = await getItem(CURRENT_CHUNK_KEY, questionSchema.array());
    if (currentQuestions && currentQuestions.length > 0) {
        return currentQuestions;
    } else if (!currentQuestions) {
        return loadNewQuestions();
    } else {
        return setNextAsCurrent();
    }
});

const saveRemainingQuestionsEpic = createEpic(saveRemainingQuestionsAction, (questions) =>
    setItem(CURRENT_CHUNK_KEY, questions),
);

const answerQuestionEpic: Epic<AnyAction, AnyAction, ApplicationState> = (action$, state$) =>
    action$.pipe(
        filter(answerQuestionAction.match),
        mergeMap((action) => {
            if (
                state$.value.questions.remainingQuestions.status !== 'FINISHED' ||
                state$.value.responses.remainingResponses.status !== 'FINISHED'
            ) {
                return EMPTY;
            }
            const [matchingQuestions, nonMatchingQuestions] = partition<Question>(
                (q) => q.id === action.payload.questionId,
            )(state$.value.questions.remainingQuestions.data);
            const storeQuestionsAction = saveRemainingQuestionsAction.started(nonMatchingQuestions);
            const updatedResponses =
                action.payload.answer === 'yes'
                    ? intersection<number>(
                          state$.value.responses.remainingResponses.data,
                          matchingQuestions[0].answers.yes,
                      )
                    : difference<number>(
                          state$.value.responses.remainingResponses.data,
                          matchingQuestions[0].answers.yes,
                      );
            return of(saveRemainingResponsesAction.started(updatedResponses), storeQuestionsAction);
        }),
    );

const loadQuestionWhenSavedEmptyListEpic: Epic<AnyAction, AnyAction, ApplicationState> = (action$) =>
    action$.pipe(
        filter(saveRemainingQuestionsAction.done.match),
        mergeMap((action) => {
            if (action.payload.params.length > 0) {
                return EMPTY;
            }
            return of(loadRemainingQuestionsAction.started());
        }),
    );

export const questionsEpics = combineEpics(
    loadRemainingQuestionsEpic,
    answerQuestionEpic,
    saveRemainingQuestionsEpic,
    loadQuestionWhenSavedEmptyListEpic,
);
