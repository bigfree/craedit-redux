import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {PURGE} from "redux-persist/es/constants";

export type Test = {
    testId: string,
    name: string,
    number?: number,
    isActive?: boolean,
}

const testAdapter = createEntityAdapter<Test>({
    selectId: (test: Test) => test.testId
});

export const testSlice = createSlice({
    name: 'test',
    initialState: testAdapter.getInitialState(),
    reducers: {
        testAdd: testAdapter.addOne,
        testAddMany: testAdapter.addMany,
        testUpdateOne: testAdapter.updateOne,
        testSetAll: testAdapter.setAll,
        testRemoveAll: testAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            testAdapter.removeAll(state);
        })
    }
});

/**
 * Export actions
 */
export const {testAdd, testAddMany, testRemoveAll, testSetAll, testUpdateOne} = testSlice.actions;

/**
 * Export selectors
 * @type {EntitySelectors<Test, RootState>}
 */
export const testSelector = testAdapter.getSelectors<RootState>((state: RootState) => state.test);

/**
 * Export reducer
 */
export default testSlice.reducer;