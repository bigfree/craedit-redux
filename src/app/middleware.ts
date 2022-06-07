// import {Action, Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
// import {RootState} from "./store";
// import {PayloadAction} from "@reduxjs/toolkit/src/createAction";
// import {testAddOne, TestEntity, TestStateWithAdapter} from "../stores/playground/testSlice";
//
// // export type MiddlewareTestParams<S> = {
// //     store: MiddlewareAPI<S>;
// //     next: Dispatch<S>;
// //     action: Action<S>
// // };
// //
// // export type MiddlewareTest<S> = {
// //     (params: MiddlewareTestParams<S>): Action<S>
// // };
// //
// // export const logger = <S>(
// //     test: MiddlewareTest<S>,
// //     ...args: {}[]
// // ): Middleware => {
// //     return ((store: MiddlewareAPI<S>) => {
// //         return (next: Dispatch<S>) => {
// //             return action => {
// //                 console.log(store.getState())
// //             }
// //         };
// //     }) as Middleware;
// // };
//
// // export interface ExtendedMiddleware<StateType> extends Middleware {
// //     <S extends StateType>(test: MiddlewareAPI<S>): (
// //         next: Dispatch<S>
// //     ) => Dispatch<S>;
// // }
// //
// // export const logger: ExtendedMiddleware<TestState> = <S extends TestState>(test: MiddlewareAPI<S>) =>
// //     (next: Dispatch<S>) =>
// //     <A extends Action>(action: A): A => {
// //     console.log("Before");
// //     const result = next(action);
// //     console.log("After", result);
// //     return result;
// // }
//
// // eslint-disable-next-line @typescript-eslint/ban-types
// export const logger: Middleware = (store: MiddlewareAPI<RootState>) => (next: Dispatch) => (action: Action) => {
//     // // console.log('store', store);
//     // // console.log('next', next);
//     // // console.log('action', action);
//     let result = next(action);
//     let resultPayload;
//     // console.log(result);
//     if (testAddOne.type === String(result.type)) {
//         resultPayload = (result as PayloadAction<TestStateWithAdapter>).payload;
//         resultPayload = {
//             ...resultPayload,
//             action: testAddOne.type
//         };
//         // console.log(payload.payload.id);
//     }
//     // const testState = {
//     //     ...store.getState().test,
//     //     present: {
//     //         ...store.getState().test.present,
//     //         action: testAddOne.type,
//     //         date: new Date().getDate(),
//     //     }
//     // };
//     // console.log(testState);
//     // console.log('store after', store.getState().test);
//     return {
//         ...result,
//         payload: {
//             result.payload,
//             ...resultPayload
//         }
//     };
// }