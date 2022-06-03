import {configureStore} from '@reduxjs/toolkit';
import WorkflowSlice from '../stores/workflows/workflowSlice';
import TabNavigationSlice from '../stores/tabNavigation/tabNavigationSlice';
import TestSlice from '../stores/playground/testSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import undoable, {UndoableOptions} from 'redux-undo';
import {PersistConfig} from "redux-persist/es/types";
import {CurriedGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const undoableOptions: UndoableOptions = {
    limit: 100,
    ignoreInitialState: true,
    debug: true,
};

const reducers = combineReducers({
    test: undoable(TestSlice, {
        ...undoableOptions,
        undoType: 'TEST_UNDO',
        redoType: 'TEST_REDO',
        clearHistoryType: 'TEST_CLEAR_HISTORY',
    }),
    tabNavigation: TabNavigationSlice,
    workflow: WorkflowSlice,
});

const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
    debug: true,
    timeout: 0,
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
    }), //.concat(logger),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;