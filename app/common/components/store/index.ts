import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const rootReducer = combineReducers({});

const rootEpic = combineEpics();

export type ApplicationState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<Action, Action, ApplicationState>();

export const store = configureStore({ reducer: rootReducer, middleware: [epicMiddleware], devTools: false });

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
