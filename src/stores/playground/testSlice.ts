import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";

/** Test state type */
export type TestState = {
    loading: boolean;
    error: string | null;
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
        loading: false,
        error: null,
    }),
    reducers: {
        testAddOne: testAdapter.addOne,
        testAddMany: testAdapter.addMany,
        testUpdateOne: testAdapter.updateOne,
        testSetAll: testAdapter.setAll,
        testRemoveAll: testAdapter.removeAll,
        setLoading: (state: Draft<TestStateWithAdapter>, data: PayloadAction<boolean>) => {
            state.loading = data.payload;
        },
        setError: (state: Draft<TestStateWithAdapter>, data: PayloadAction<string>) => {
            state.error = data.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state: TestStateWithAdapter) => {
            testAdapter.removeAll(state);
        });
    }
});

/** Export actions */
export const {
    testAddOne,
    testRemoveAll,
    testSetAll,
    testUpdateOne,
    setLoading,
    setError
} = testSlice.actions;

/** Export adapter selectors */
export const {
    selectAll: selectAllTest,
    selectById: selectTestById,
} = testAdapter.getSelectors<RootState>((state: RootState) => state.test.present);

/** Export reducer */
export default testSlice.reducer;