import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'

import { GET_USERS_SUCCESS,LOGOUT_USERS } from '../constants';

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
    const url = '/users/logout';
    const body = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return body.json();
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
function* logoutUser(action) {
    try {
        yield call(logoutCurrUser, action.payload);
        yield put({
            type: LOGOUT_USERS,
            users: {}
        });
    } catch (e) {
        yield put({
            type: LOGOUT_USERS,
            users: e
        });
    }
}

function* userSaga() {
    yield takeEvery('GET_USERS_REQUEST', fetchUsers);
    yield takeEvery('GET_USERS_REQUEST', logoutUser);

}

export default userSaga;