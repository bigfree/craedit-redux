import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    Draft,
    EntityState,
    nanoid,
    PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IWFEntityType, STATE_STATUS } from "../../types";
import { ArrowHeadType, Connection, Edge } from "react-flow-renderer";
import axios from "axios";

export type IEntitiesStateType = {
    status: STATE_STATUS.IDLE | STATE_STATUS.LOADING | STATE_STATUS.SUCCESS | STATE_STATUS.FAILED | STATE_STATUS.PENDING
}

export const fetchWorkflowById = createAsyncThunk(
    'entities/fetchByIdStatus',
    async (workflowId: string) => {
        const {data} = await axios.get(`/${workflowId}.json`);
        return data;
    }
)

/**
 * Create redux Element Adapter
 */
const entitiesAdapter = createEntityAdapter<IWFEntityType>({
    selectId: (element: IWFEntityType) => element.id,
});

// https://stackoverflow.com/a/69306749/883908
export const entitiesSlice = createSlice({
    name: 'workflowElements',
    initialState: entitiesAdapter.getInitialState<IEntitiesStateType>({
        status: STATE_STATUS.IDLE,
    }),
    reducers: {
        entityAdded: entitiesAdapter.addOne,
        entityUpdated: entitiesAdapter.updateOne,
        entitiesLoading(state: Draft<IEntitiesStateType>) {
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
            } as IWFEntityType;

            entitiesAdapter.addOne(state, connection);
        },
        entitiesReceived(state, action: PayloadAction<IWFEntityType[]>) {
            if (STATE_STATUS.PENDING === state.status) {
                entitiesAdapter.setAll(state, action.payload);
                state.status = STATE_STATUS.IDLE;
            }
        },
    },
    extraReducers: {
        [fetchWorkflowById.pending]: (state: RootState) => {
            state.status = STATE_STATUS.LOADING;
        },
        [fetchWorkflowById.fulfilled]: (state: RootState, action: PayloadAction<IWFEntityType[]>) => {
            console.log(state, action);
            entitiesAdapter.setAll(state, action.payload);
        }
        // builder.addCase(fetchWorkflowById.fulfilled, (state, action: PayloadAction<IWFEntityType[]>) => {
        //     console.log(action);
        //     entitiesAdapter.setAll(state, action.payload);
        // })
    }
});

/**
 * Reducer functions
 */
export const {entityAdded, entitiesLoading, entitiesReceived, entityUpdated, entitiesOnConnect} = entitiesSlice.actions;


export const entitiesSelector = entitiesAdapter.getSelectors<RootState>((state: RootState) => state.entities);

/**
 * Export reducer
 */
export default entitiesSlice.reducer;