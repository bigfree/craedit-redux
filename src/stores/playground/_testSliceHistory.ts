// import {createSelector, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
// import {TestEntity} from "./testSlice";
// import {PURGE} from "redux-persist/es/constants";
// import {RootState} from "../../app/store";
//
// export type TestHistoryState = {
//     past: Array<TestEntity[]>,
//     present: Array<TestEntity>,
//     future: Array<TestEntity[]>
// }
//
// const initialState = {
//     past: [],
//     present: [],
//     future: [],
// } as TestHistoryState;
//
// export type TestAddHistoryPayload = Pick<TestHistoryState, "present">
//
// const testSliceHistory = createSlice({
//     name: 'testHistory',
//     initialState: initialState,
//     reducers: {
//         addHistory: (state: TestHistoryState, action: PayloadAction<TestAddHistoryPayload>) => {
//             const {present} = action.payload;
//             state.present = present;
//             state.past.push(present);
//         },
//         undo: (state: TestHistoryState) => {
//             const {past, present, future} = state;
//
//             const currentPast = current(past);
//             const currentPresent = current(present);
//             const currentFuture = current(future);
//
//             const previous = 0 === (currentPast.length - 1) ? [] : currentPast[currentPast.length - 1];
//             const newPast = currentPast.slice(0, currentPast.length - 1);
//
//             state = {
//                 past: newPast,
//                 present: previous,
//                 future: [currentPresent, ...currentFuture],
//             };
//
//             return state;
//         },
//         testHistoryRemoveAll: (state: TestHistoryState) => {
//             state = initialState;
//             return state;
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(PURGE, () => {
//             testSliceHistory.actions.testHistoryRemoveAll();
//         });
//     }
// });
//
// /** Export actions */
// export const {addHistory, undo, testHistoryRemoveAll} = testSliceHistory.actions;
//
// export const selectHistoryPresent = createSelector((state: RootState) => state.testHistory, (state: TestHistoryState) => state.present);
//
// /** Export reducer */
// export default testSliceHistory.reducer;
