import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

type Test = {
    testId: number,
    name: string,
    number?: number,
    isActive?: boolean,
}

const testAdapter = createEntityAdapter<Test>({
    selectId: (test:Test) => test.testId
});

export const testSlice = createSlice({
    name: 'test',
    initialState: testAdapter.getInitialState(),
    reducers: {
        testAdded: testAdapter.addOne,
    }
});

/**
 * Export actions
 */
export const {testAdded} = testSlice.actions;

/**
 * Export selectors
 * @type {EntitySelectors<Test, RootState>}
 */
export const testSelector = testAdapter.getSelectors<RootState>((state: RootState) => state.test);

/**
 * Export reducer
 */
export default testSlice.reducer;