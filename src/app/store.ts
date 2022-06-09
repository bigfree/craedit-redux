import {configureStore} from '@reduxjs/toolkit';
import WorkflowSlice from '../stores/workflows/workflowSlice';
import PointSlice from '../stores/point/pointSlice';
import TabNavigationSlice from '../stores/tabNavigation/tabNavigationSlice';
import TestSlice, {testAddOne, testRemoveAll, testSetAll, testUpdateOne} from '../stores/playground/testSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import undoable, {includeAction, UndoableOptions} from 'redux-undo';
import {PersistConfig} from "redux-persist/es/types";
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/saga";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage/src";

/**
 * Initial saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

const undoableOptions: UndoableOptions = {
    limit: 100,
    ignoreInitialState: true,
    debug: false,
};

const reducers = combineReducers({
    test: undoable(TestSlice, {
        ...undoableOptions,
        undoType: 'TEST_UNDO',
        redoType: 'TEST_REDO',
        clearHistoryType: 'TEST_CLEAR_HISTORY',
        filter: includeAction([
            testSetAll.type,
            testAddOne.type,
            testUpdateOne.type,
            testRemoveAll.type,
        ])
    }),
    tabNavigation: TabNavigationSlice,
    point: PointSlice,
    workflow: WorkflowSlice,
});

// eslint-disable-next-line
const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage: createIdbStorage({name: 'myApp', storeName: 'keyval'}),
    serialize: false,
    stateReconciler: (state: RootState) => state,
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 * App store
 */
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: false
    }).concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;