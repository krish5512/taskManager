import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'

import { GET_USERS_SUCCESS, LOGOUT_USERS_FAILED, LOGOUT_USERS_SUCCESS } from '../constants';

const getApi = async req => {
    const url = '/users/login';
    const body = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    return body.json();
}

const logoutCurrUser = async () => {
    console.log('LOgout HIt')
    const url = '/users/logout';
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
function* fetchUsers(action) {
    try {
        const  users  = yield call(getApi, action.payload);
        yield put({
            type: GET_USERS_SUCCESS,
            users: users
        });
    } catch (e) {
        yield put({
            type: 'GET_USERS_FAILED',
            users: e
        });
    }
}
function* logoutUser() {
    try {
        yield call(logoutCurrUser);
        yield put({
            type: LOGOUT_USERS_SUCCESS,
            users: {}
        });
    } catch (e) {
        console.log({e})
        yield put({
            type: LOGOUT_USERS_FAILED,
            users: e
        });
    }
}

function* userSaga() {
    yield takeEvery('GET_USERS_REQUEST', fetchUsers);
    yield takeEvery('LOGOUT_USERS_REQUEST', logoutUser);

}

export default userSaga;