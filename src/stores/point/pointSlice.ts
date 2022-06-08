import {Node,} from 'react-flow-renderer';
import {ActionReducerMapBuilder, createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";

export type PointState = {
    loading: boolean;
    error: string | null;
}

export type PointEntity = {
    id: string;
    name: string;
}

export type PointEntityNode = Node<PointEntity>;
export type PointStateAdapter = EntityState<PointEntityNode> & PointState;

/**
 * Store name
 */
export const pointSliceName = 'point';

/**
 * Create point adapter
 */
const pointAdapter = createEntityAdapter<PointEntityNode>({
    selectId: (point: PointEntityNode) => point.id,
});

const pointSlice = createSlice({
    name: pointSliceName,
    initialState: pointAdapter.getInitialState<PointState>({
        loading: false,
        error: null
    }),
    reducers: {
        pointSetAll: pointAdapter.setAll,
        pointRemoveAll: pointAdapter.removeAll,
    },
    extraReducers: (builder: ActionReducerMapBuilder<EntityState<PointEntityNode> & PointState>) => {
        builder.addCase(PURGE, (state: PointStateAdapter) => {
            pointAdapter.removeAll(state);
        });
    }
});

/**
 * Export point actions
 */
export const {
    pointSetAll,
    pointRemoveAll,
} = pointSlice.actions;

/**
 * Export adapter selectors
 */
export const {
    selectAll: selectAllPoints,
} = pointAdapter.getSelectors<RootState>((state: RootState) => state.point);

/**
 * Export reducers
 */
export default pointSlice.reducer;