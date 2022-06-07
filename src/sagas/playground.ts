import {all, call, put, takeEvery} from 'redux-saga/effects'
import axios, {AxiosResponse} from "axios";
import {TestEntity, testSetAll} from "../stores/playground/testSlice";

const getTestEntity: () => Promise<AxiosResponse<TestEntity[]>> = () => axios.get('/playground.json');

function* fetchTestEntity() {
    const {data}: AxiosResponse<TestEntity[]> = yield call(getTestEntity);
    yield put({type: testSetAll.type, payload: data});
    console.log(data);
}

function* watchTestEntity() {
    yield takeEvery('FETCH_ALL_ENTITIES', fetchTestEntity);
}

export default function* rootSaga() {
    yield all([
        watchTestEntity(),
    ]);
}