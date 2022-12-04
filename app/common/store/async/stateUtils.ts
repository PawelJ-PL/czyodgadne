import { AsyncOperationResult } from './AsyncOperationResult';

export const updateAsyncResultIfFinished = <P, T, E>(
    asyncResult: AsyncOperationResult<P, T, E>,
    fn: (result: T) => T,
) => {
    if (asyncResult.status === 'FINISHED') {
        return { ...asyncResult, data: fn(asyncResult.data) };
    } else {
        return asyncResult;
    }
};
