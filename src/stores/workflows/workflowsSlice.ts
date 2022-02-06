import { STATE_STATUS, WorkflowType } from "../../types";
import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

/**
 * Workflows state type
 */
export type WorkflowsStateType = {
    loading: boolean;
    errors?: string;
    status: STATE_STATUS.IDLE | STATE_STATUS.LOADING | STATE_STATUS.SUCCESS | STATE_STATUS.FAILED | STATE_STATUS.PENDING
}

/**
 * Workflows Adapter
 */
const workflowsAdapter = createEntityAdapter<WorkflowType>({
    selectId: (model: WorkflowType) => model.id,
    sortComparer: (a: WorkflowType, b: WorkflowType) => a.name.localeCompare(b.name),
});

/**
 * Workflows store
 */
const workflowsSlice = createSlice({
    name: 'workflows',
    initialState: workflowsAdapter.getInitialState<WorkflowsStateType>({
        loading: false,
        status: STATE_STATUS.IDLE,
        errors: undefined,
    }),
    reducers: {
        workflowAdded: workflowsAdapter.addOne,
        workflowsReceived(state: EntityState<WorkflowType>, action: PayloadAction<WorkflowType[]>) {
            workflowsAdapter.setAll(state, action.payload);
        }
    }
});

/** Export actions */
export const {workflowAdded, workflowsReceived} = workflowsSlice.actions;
/** Export selectors */
export const workflowsSelector = workflowsAdapter.getSelectors<RootState>((state: RootState) => state.workflows);
/** Export reducers */
export default workflowsSlice.reducer;