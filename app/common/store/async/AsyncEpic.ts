import { ApplicationState } from './../index';
import { StateObservable } from 'redux-observable';
import { Observable, ObservableInput, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { AnyAction, AsyncActionCreators } from 'typescript-fsa';

export const createEpic = <Params, Result, Error>(
    asyncActions: AsyncActionCreators<Params, Result, Error>,
    requestCreator: (params: Params, state: ApplicationState) => ObservableInput<Result>,
) => {
    return (actions$: Observable<AnyAction>, state$: StateObservable<ApplicationState>) =>
        actions$.pipe(
            filter(asyncActions.started.match),
            mergeMap((action) =>
                from(requestCreator(action.payload, state$.value)).pipe(
                    map((resp) => asyncActions.done({ result: resp, params: action.payload })),
                    catchError((err: Error) => {
                        return [asyncActions.failed({ params: action.payload, error: err })];
                    }),
                ),
            ),
        );
};
