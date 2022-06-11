import {all} from "redux-saga/effects";
import {watchFetchPoint} from "./point";
import {watchTestEntity} from "./playground";
import { watchFetchWorkflow } from "./workflowSaga";

export default function* rootSaga() {
    yield all([
        watchTestEntity(),
        watchFetchPoint(),
        watchFetchWorkflow(),
    ]);
}