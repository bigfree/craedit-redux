import { createEntityAdapter, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IWFEntityType, STATE_STATUS } from "../../types";

export type IEntitiesStateType = {
    loading: STATE_STATUS.IDLE | STATE_STATUS.PENDING
}

/**
 * Create redux Element Adapter
 */
const entitiesAdapter = createEntityAdapter<IWFEntityType>({
    selectId: (element: IWFEntityType) => element.id,
});

export const entitiesSlice = createSlice({
    name: 'workflowElements',
    initialState: entitiesAdapter.getInitialState<IEntitiesStateType>({
        loading: STATE_STATUS.IDLE,
    }),
    reducers: {
        entityAdded: entitiesAdapter.addOne,
        entityUpdated: entitiesAdapter.updateOne,
        entitiesLoading(state: Draft<IEntitiesStateType>) {
            if (STATE_STATUS.IDLE === state.loading) {
                state.loading = STATE_STATUS.PENDING;
            }
        },
        entitiesReceived(state, action: PayloadAction<IWFEntityType[]>) {
            if (STATE_STATUS.PENDING === state.loading) {
                entitiesAdapter.setAll(state, action.payload);
                state.loading = STATE_STATUS.IDLE;
            }
        },
    }
});

/**
 * Reducer functions
 */
export const { entityAdded, entitiesLoading, entitiesReceived, entityUpdated } = entitiesSlice.actions;

/**
 * Select Entities
 * @type {EntitySelectors<IWFEntityType, RootState>}
 */
export const selectEntities = entitiesAdapter.getSelectors<RootState>((state: RootState) => state.entities);

/**
 * Export reducer
 */
export default entitiesSlice.reducer;