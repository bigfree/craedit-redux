import {createEntityAdapter, createSelector, createSlice, EntityState} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";
import {ActionCreators} from "redux-undo";

/** Test state type */
export type TestState = {
    state: string;
}

/** Test entity type */
export type TestEntity = {
    id: string;
    name: string;
}

/** Test state with adapter state type */
export type TestStateWithAdapter = EntityState<TestEntity> & TestState;

const testAdapter = createEntityAdapter<TestEntity>({
    selectId: (test: TestEntity) => test.id,
});

const testSlice = createSlice({
    name: 'test',
    initialState: testAdapter.getInitialState<TestState>({
        state: 'idle'
    }),
    reducers: {
        testAddOne: testAdapter.addOne,
        testAddMany: testAdapter.addMany,
        testUpdateOne: testAdapter.updateOne,
        testSetAll: testAdapter.setAll,
        testRemoveAll: testAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state: TestStateWithAdapter) => {
            testAdapter.removeAll(state);
            ActionCreators.clearHistory();
        });
    }
});

/** Export actions */
export const {testAddOne, testAddMany, testRemoveAll, testSetAll, testUpdateOne} = testSlice.actions;

/** Export adapter selectors */
export const {
    selectAll: selectAllTest,
} = testAdapter.getSelectors<RootState>((state: RootState) => state.test.present);

/** Export reducer */
export default testSlice.reducer;