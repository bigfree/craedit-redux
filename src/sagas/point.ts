import axios, {AxiosError, AxiosResponse} from "axios";
import {PointEntityNode, pointSetAll} from "../stores/point/pointSlice";
import {call, put, takeLatest} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";

export const pointSagaActions = {
    FETCH_ALL_POINTS: "FETCH_ALL_POINTS",
}

function* fetchPoints(action: PayloadAction<string>) {
    try {
        const {data}: AxiosResponse<PointEntityNode[]> = yield call(axios.get, `${action.payload}.json`);
        yield put({type: pointSetAll.type, payload: data});
    } catch (error) {
        console.log((error as AxiosError).message)
    }
}

export function* watchFetchPoint() {
    yield takeLatest(pointSagaActions.FETCH_ALL_POINTS, fetchPoints);
}