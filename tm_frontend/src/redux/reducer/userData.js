import {
    GET_USERS_SUCCESS,GET_USERS_FAILED
} from '../constants';

const initialState = {
    users: []
}

const userRootReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    console.log({
        state,
        type,
        payload
    })
    switch (type) {
        case GET_USERS_SUCCESS:
            return {
                type: GET_USERS_SUCCESS,
                users: payload
            }
            case GET_USERS_FAILED:
                return {
                    type: GET_USERS_FAILED,
                    users: []
                }
            default:
                return state
    }
}

export default userRootReducer;