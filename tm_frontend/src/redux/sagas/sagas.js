import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'

import { CREATE_USERS_SUCCESS, GET_USERS_SUCCESS, LOGOUT_USERS_FAILED, LOGOUT_USERS_SUCCESS } from '../constants';

// API REQUESTS
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
const createUserApiCall = async req => {
    const url = '/users';
    const body = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    return body.json();
}

// SAGAS
function* createUserAccount(action) {
    try {
        const  users  = yield call(createUserApiCall, action.payload);
        yield put({
            type: CREATE_USERS_SUCCESS,
            users: users
        });
    } catch (e) {
        yield put({
            type: 'CREATE_USERS_FAILED',
            users: e
        });
    }
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
    yield takeEvery('CREATE_USERS_REQUEST',createUserAccount);

}

export default userSaga;