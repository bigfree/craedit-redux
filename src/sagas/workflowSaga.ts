import axios, {AxiosError, AxiosResponse} from "axios";
import {call, put, takeLatest, select } from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {selectWorkflowById, WorkflowEntity, workflowUpsertOne} from "../stores/workflows/workflowSlice";
import {store} from "../app/store";

export const workflowSagaActions = {
    FETCH_WORKFLOW: "FETCH_WORKFLOW",
}

function* fetchWorkflow(action: PayloadAction<string>) {
    if (!selectWorkflowById(store.getState(), action.payload)) {
        try {
            const {data}: AxiosResponse<WorkflowEntity> = yield call(axios.get, `${action.payload}-workflow.json`);
            yield put({type: workflowUpsertOne.type, payload: data});
        } catch (error) {
            console.log((error as AxiosError).message)
        }
    }
}

export function* watchFetchWorkflow() {
    yield takeLatest(workflowSagaActions.FETCH_WORKFLOW, fetchWorkflow);
}