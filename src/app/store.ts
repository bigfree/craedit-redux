import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../stores/counter/counterSlice';
import entitiesReducer from "../stores/entities/entitiesSlice";
import workflowsReducer from "../stores/workflows/workflowsSlice";
import { craEditApi } from "../stores/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

/**
 * App store
 */
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        entities: entitiesReducer,
        workflows: workflowsReducer,
        [craEditApi.reducerPath]: craEditApi.reducer,
    },
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
        return getDefaultMiddleware().concat(craEditApi.middleware);
    },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;