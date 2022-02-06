import { createEntityAdapter, createSlice, Draft, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ArrowHeadType, Connection, Edge } from "react-flow-renderer";
import { RootState } from "../../app/store";
import { STATE_STATUS, WFEntityType } from "../../types";

export type EntitiesStateType = {
    loading: boolean;
    errors?: string;
    status: STATE_STATUS.IDLE | STATE_STATUS.LOADING | STATE_STATUS.SUCCESS | STATE_STATUS.FAILED | STATE_STATUS.PENDING
}

/**
 * Create redux Element Adapter
 */
const entitiesAdapter = createEntityAdapter<WFEntityType>({
    selectId: (element: WFEntityType) => element.id,
});

// https://stackoverflow.com/a/69306749/883908
export const entitiesSlice = createSlice({
    name: 'workflowElements',
    initialState: entitiesAdapter.getInitialState<EntitiesStateType>({
        loading: false,
        status: STATE_STATUS.IDLE,
        errors: undefined
    }),
    reducers: {
        entityAdded: entitiesAdapter.addOne,
        entityUpdated: entitiesAdapter.updateOne,
        entitiesLoading(state: Draft<EntitiesStateType>) {
            if (STATE_STATUS.IDLE === state.status) {
                state.status = STATE_STATUS.PENDING;
            }
        },
        entitiesOnConnect(state, action: PayloadAction<Edge | Connection>) {
            const connection = {
                id: nanoid(),
                arrowHeadType: ArrowHeadType.ArrowClosed,
                type: 'straight',
                ...action.payload
            } as WFEntityType;

            entitiesAdapter.addOne(state, connection);
        },
        entitiesReceived(state, action: PayloadAction<WFEntityType[]>) {
            entitiesAdapter.setAll(state, action.payload);
        },
    }
});

/** Export actions */
export const {entityAdded, entitiesLoading, entitiesReceived, entityUpdated, entitiesOnConnect} = entitiesSlice.actions;
/** Export selectors */
export const entitiesSelector = entitiesAdapter.getSelectors<RootState>((state: RootState) => state.entities);
/** Export reducers */
export default entitiesSlice.reducer;