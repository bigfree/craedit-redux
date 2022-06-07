import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";
import {TestEntity} from "../playground/testSlice";

export type WorkflowState = {
    state: string;
}

export type WorkflowEntity = {
    id: string;
    name: string;
    data?: TestEntity[];
}

const workflowAdapter = createEntityAdapter<WorkflowEntity>({
    selectId: (workflow: WorkflowEntity) => workflow.id
});

export const workflowSlice = createSlice({
    name: 'workflow',
    initialState: workflowAdapter.getInitialState<WorkflowState>({
        state: 'idle'
    }),
    reducers: {
        workflowAddOne: workflowAdapter.addOne,
        workflowAddMany: workflowAdapter.addMany,
        workflowRemoveAll: workflowAdapter.removeAll,
        workflowUpdateOne: workflowAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            workflowAdapter.removeAll(state);
        })
    }
});

/** Export actions */
export const {workflowAddOne, workflowAddMany, workflowRemoveAll, workflowUpdateOne} = workflowSlice.actions;

/** Export selectors */
export const {
    selectById: selectWorkflowById,
    selectAll: selectAllWorkflow,
} = workflowAdapter.getSelectors<RootState>((state: RootState) => state.workflow);

/** Export reducer */
export default workflowSlice.reducer;