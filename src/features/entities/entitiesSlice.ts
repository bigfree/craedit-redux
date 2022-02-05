import { createAsyncThunk, createEntityAdapter, createSlice, Draft, nanoid, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ArrowHeadType, Connection, Edge } from "react-flow-renderer";
import { RootState } from "../../app/store";
import { STATE_STATUS, ValidationErrorsType, WFEntityType } from "../../types";

export type EntitiesStateType = {
    loading: boolean;
    errors?: string;
    status: STATE_STATUS.IDLE | STATE_STATUS.LOADING | STATE_STATUS.SUCCESS | STATE_STATUS.FAILED | STATE_STATUS.PENDING
}

export const fetchEntitiesByWfId = createAsyncThunk(
    'entities/fetchByIdStatus',
    async (workflowId: string, {rejectWithValue}) => {
        try {
            const {data}: AxiosResponse<WFEntityType[]> = await axios.get(`/${workflowId}.json`);
            return data;
        } catch (err) {
            const error: AxiosError<ValidationErrorsType> = err;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
)

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
            if (STATE_STATUS.PENDING === state.status) {
                entitiesAdapter.setAll(state, action.payload);
                state.status = STATE_STATUS.IDLE;
            }
        },
    },
    extraReducers: (builder) => {
        // [fetchWorkflowById.pending]: (state: RootState) => {
        //     state.status = STATE_STATUS.LOADING;
        // },
        // [fetchWorkflowById.fulfilled]: (state: RootState, action: PayloadAction<IWFEntityType[]>) => {
        //     console.log(state, action);
        //     entitiesAdapter.setAll(state, action.payload);
        // }
        builder.addCase(fetchEntitiesByWfId.fulfilled, (state, action: PayloadAction<WFEntityType[]>) => {
            console.log(action);
            entitiesAdapter.setAll(state, action.payload);
        })
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