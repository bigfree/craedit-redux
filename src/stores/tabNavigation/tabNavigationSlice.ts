import {createEntityAdapter, createSelector, createSlice, EntityState} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";
import {RootState} from "../../app/store";

/**
 * Tab navigation state
 */
export type TabNavigationState = {
    status?: string;
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
    selectId: (tab: TabEntity) => tab.id,
});

/**
 * Create tab navigation slice
 */
const tabNavigationSlice = createSlice({
    name: 'tabNavigation',
    initialState: tabNavigationAdapter.getInitialState<TabNavigationState>({
        status: 'idle',
    }),
    reducers: {
        tabAddOne: tabNavigationAdapter.addOne,
        tabUpdateOne: tabNavigationAdapter.updateOne,
        tabUpdateMany: tabNavigationAdapter.updateMany,
        tabSetAll: tabNavigationAdapter.setAll,
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
 * Select by slug selector
 */
// export const selectTabBySlug = createSelector(
//     [
//         (state: RootState) => state.tabNavigation,
//         (state: RootState, slug: string) => slug,
//     ],
//     (tabs: TabEntity[], slug: string) => {
//         return tabs.filter((tab: TabEntity) => {
//             return slug === tab.slug;
//         });
//     }
// );

// const selectOrganizationName = (id: string): Return =>
//     createSelector(
//         [(state: RootState) => organizationSelectors.selectById(state, id)],
//         (organization) => organization?.name
//     );


/**
 * Export tab navigation actions
 */
export const {
    tabAddOne,
    tabUpdateOne,
    tabUpdateMany,
    tabSetAll,
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

export const selectTabBySlug = createSelector(selectAllTabs, (state: any, slug: string) => slug, (tabs: TabEntity[], slug) => {
    const tab = tabs.filter((tab: TabEntity) => {
        return slug === tab.slug;
    });
    return tab[0];
});

/**
 * Export reducers
 */
export default tabNavigationSlice.reducer;