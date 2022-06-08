import {createEntityAdapter, createSelector, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
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
        tabSetActive: (state: Draft<TabNavigationStateWithAdapter>, data: PayloadAction<string>) => {
            Object.values(state.entities).map((tab: TabEntity | undefined) => {
                if (tab === undefined) {
                    return;
                }

                tab.active = data.payload === tab.slug;
            });
        }
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
    tabUpdateMany,
    tabSetAll,
    tabRemoveOne,
    tabSetActive,
} = tabNavigationSlice.actions;

/**
 * Export adapter selectors
 */
export const {
    selectEntities: selectAllTabEntities,
    selectAll: selectAllTabs,
    selectById: selectTabById,
} = tabNavigationAdapter.getSelectors<RootState>((state: RootState) => state.tabNavigation);

/**
 * Select tab by slug
 */
export const selectTabBySlug = createSelector(
    selectAllTabs,
    (state: TabNavigationStateWithAdapter, slug: string) => slug,
    (tabs: TabEntity[], slug: string) => {
        const tab = tabs.filter((tab: TabEntity) => {
            return slug === tab.slug;
        });
        return tab[0];
    });

/**
 * Export reducers
 */
export default tabNavigationSlice.reducer;