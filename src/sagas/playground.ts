import {call, put, takeEvery} from 'redux-saga/effects'
import axios, {AxiosError, AxiosResponse} from "axios";
import {setError, setLoading, TestEntity, testSetAll} from "../stores/playground/testSlice";

export const playgroundSagaActions = {
    FETCH_ALL_ENTITIES: "FETCH_ALL_ENTITIES",
};


const getTestEntity: () => Promise<AxiosResponse<TestEntity[]>> = () => axios.get('/playground.json');

function* fetchTestEntity() {
    yield put({type: setLoading.type, payload: true});
    yield put({type: setError.type, payload: null});

    try {
        const {data}: AxiosResponse<TestEntity[]> = yield call(getTestEntity);
        yield put({type: testSetAll.type, payload: data});
    } catch (error) {
        yield put({type: setError.type, payload: (error as AxiosError).message});
    } finally {
        yield put({type: setLoading.type, payload: false});
    }
}

export function* watchTestEntity() {
    yield takeEvery(playgroundSagaActions.FETCH_ALL_ENTITIES, fetchTestEntity);
}