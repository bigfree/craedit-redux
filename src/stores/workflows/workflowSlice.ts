import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";
import {Test} from "../playground/test";

export type Workflow = {
    id: string;
    name: string;
    data?: Test[];
}

const workflowAdapter = createEntityAdapter<Workflow>({
    selectId: (workflow: Workflow) => workflow.id
});

export const workflowSlice = createSlice({
    name: 'workflow',
    initialState: workflowAdapter.getInitialState(),
    reducers: {
        workflowAddOne: workflowAdapter.addOne,
        workflowAddMany: workflowAdapter.addMany,
        workflowRemoveAll: workflowAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            workflowAdapter.removeAll(state);
        })
    }
});

/** Export actions */
export const {workflowAddOne, workflowAddMany, workflowRemoveAll} = workflowSlice.actions;

/** Export selectors */
export const workflowSelector = workflowAdapter.getSelectors<RootState>((state: RootState) => state.workflow);

/** Export reducer */
export default workflowSlice.reducer;