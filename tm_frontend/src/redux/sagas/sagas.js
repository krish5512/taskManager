import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'

const getApi = async req => {
    // const request = action.payload;
    console.log({
        req
    })
    const url= '/users/login';
    console.log({url})
    const body =  await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(req),
    });  
    return body.json()
}

function* fetchUsers(action) {
    try {
        const users = yield call(getApi,action.payload);
        return users;
    } catch (e) {
        yield put({
            type: 'GET_USERS_FAILED',
            users: e
        });
    }
}

function* userSaga() {
    yield takeEvery('GET_USERS_REQUEST', fetchUsers);
}

export default userSaga;