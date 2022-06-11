import {ActionReducerMapBuilder, createEntityAdapter, createSlice, Draft, EntityState} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";
import {GlobalSliceState} from "../../types";

export type WorkflowState = GlobalSliceState

export type WorkflowEntity = {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type WorkflowStateAdapter = EntityState<WorkflowEntity> & WorkflowState;

const workflowAdapter = createEntityAdapter<WorkflowEntity>({
    selectId: (workflow: WorkflowEntity) => workflow.id
});

export const workflowSlice = createSlice({
    name: 'workflow',
    initialState: workflowAdapter.getInitialState<WorkflowState>({
        loading: false,
        error: null
    }),
    reducers: {
        workflowSetAll: workflowAdapter.setAll,
        workflowAddOne: workflowAdapter.addOne,
        workflowAddMany: workflowAdapter.addMany,
        workflowUpdateOne: workflowAdapter.updateOne,
        workflowUpsertOne: workflowAdapter.upsertOne,
        workflowRemoveAll: workflowAdapter.removeAll,
    },
    extraReducers: (builder: ActionReducerMapBuilder<WorkflowStateAdapter>) => {
        builder.addCase(PURGE, (state: Draft<WorkflowStateAdapter>) => {
            workflowAdapter.removeAll(state);
        })
    }
});

/**
 * Export actions
 */
export const {
    workflowSetAll,
    workflowAddOne,
    workflowAddMany,
    workflowUpdateOne,
    workflowUpsertOne,
    workflowRemoveAll
} = workflowSlice.actions;

/**
 *  Export selectors
 */
export const {
    selectById: selectWorkflowById,
    selectAll: selectAllWorkflows,
} = workflowAdapter.getSelectors<RootState>((state: RootState) => state.workflow);

/**
 * Export reducer
 */
export default workflowSlice.reducer;