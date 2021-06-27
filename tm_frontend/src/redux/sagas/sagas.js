import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'
import {
    http
} from 'http';

 async function getApi(action) {
    console.log({
        action
    })
    const request = action.payload;
    return await http({
                method: 'GET',
        url: 'http://localhost:3001/users/login',
        body: {
          ...request
        }
    });
    // console.log({
    //     users
    // })
    // return users
}

function* fetchUsers(action) {
    try {
        const users = yield call(getApi(action));
        console.log({
            users
        })
        console.log({users})
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