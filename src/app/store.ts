import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import testReducer from '../stores/playground/test';
import WorkflowSlice from '../stores/workflows/workflowSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const reducers = combineReducers({
    test: testReducer,
    workflow: WorkflowSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * App store
 */
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;