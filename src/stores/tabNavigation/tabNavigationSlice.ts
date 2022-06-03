import {createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";

/**
 * Tab navigation state
 */
export type TabNavigationState = {
    state?: string;
}

/**
 * Tab entity type
 */
export type TabEntity = {
    id: string;
    name: string;
    active: boolean;
    slug: string;
}

export type TabNavigationStateWithAdapter = EntityState<TabEntity> & TabNavigationState;

/**
 * Tab navigation adapter
 */
const tabNavigationAdapter = createEntityAdapter<TabEntity>({
    selectId: (tab: TabEntity) => tab.slug,
});

/**
 * Create tab navigation slice
 */
const tabNavigationSlice = createSlice({
    name: 'tabNavigation',
    initialState: tabNavigationAdapter.getInitialState<TabNavigationState>({
        state: 'idle'
    }),
    reducers: {
        tabAddOne: tabNavigationAdapter.addOne,
        tabUpdateOne: tabNavigationAdapter.updateOne,
        tabRemoveOne: tabNavigationAdapter.removeOne,
        tabRemoveAll: tabNavigationAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state: TabNavigationStateWithAdapter) => {
            tabNavigationAdapter.removeAll(state);
        });
    }
});

/**
 * Export tab navigation actions
 */
export const {
    tabAddOne,
    tabUpdateOne,
    tabRemoveOne,
    tabRemoveAll,
} = tabNavigationSlice.actions;

/**
 * Export adapter selectors
 */
export const {
    selectAll: selectAllTabs,
    selectById: selectTabById,
} = tabNavigationAdapter.getSelectors<RootState>((state: RootState) => state.tabNavigation);

/**
 * Export reducers
 */
export default tabNavigationSlice.reducer;