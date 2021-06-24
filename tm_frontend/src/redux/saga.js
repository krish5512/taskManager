import {
    put,
    takeEvery
} from 'redux-saga/effects'
import {
    LOAD_USERS
} from "./actions";
import {
    fetchUsersRequest
} from './request'

async function fetchAsync(func) {
    const response = await func();
    console.log({
        response
    })
    if (response.ok) {
        return await response.json();
    }

    throw new Error("Unexpected error!!!");
}

function* fetchUserRequestSaga() {
    try {
        const users = yield fetchAsync(fetchUsersRequest);
        yield put({
            type: LOAD_USERS,
            data: users
        });
    } catch (e) {
        yield put({
            type: LOAD_USERS,
            error: e.message
        });
    }
}

export function* usersSaga() {
    // Allows concurrent fetches of users
    yield takeEvery(LOAD_USERS, fetchUserRequestSaga);

    // Does not allow concurrent fetches of users
    // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default usersSaga;