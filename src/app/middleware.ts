import {Action, Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";

export const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    // console.log('store', store);
    // console.log('next', next);
    // console.log('action', action);
    const result = next(action);
    // result.payload.action = 'test';
    console.log('result', result);
    return result;
}