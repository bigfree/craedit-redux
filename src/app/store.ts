import {configureStore, createStore} from '@reduxjs/toolkit';
import WorkflowSlice from '../stores/workflows/workflowSlice';
import PointSlice from '../stores/point/pointSlice';
import TabNavigationSlice from '../stores/tabNavigation/tabNavigationSlice';
import TestSlice, {testAddOne, testRemoveAll, testSetAll, testUpdateOne} from '../stores/playground/testSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import {combineReducers} from 'redux';
import {PAUSE, PERSIST, persistReducer, persistStore} from 'redux-persist';
import undoable, {includeAction, UndoableOptions} from 'redux-undo';
import {PersistConfig} from "redux-persist/es/types";
import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas/saga";
import storage from 'redux-persist/lib/storage';
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import {FLUSH, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

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
const persistConfig: PersistConfig<any> & {deserialize: boolean} = {
    key: 'root',
    version: 1,
    storage: createIdbStorage({
        name: 'craedit',
        storeName: 'craeditstore',
        version: 1
    }),
    timeout: 0,
    // storage: storage,
    serialize: false,
    deserialize: false,
    debug: true,
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
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: false
    }).concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;