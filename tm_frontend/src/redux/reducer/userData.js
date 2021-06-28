import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
} from '../constants';

const initialState = {
    users: {}
}

const userRootReducer = (state = initialState, action) => {
    const {
        type
    } = action;
    switch (type) {
            case GET_USERS_SUCCESS:
            console.log({action})
            return {
                type: GET_USERS_SUCCESS,
                users: action.user
            }
            case GET_USERS_FAILED:
                console.log({action})
                return {
                    type: GET_USERS_FAILED,
                    users: []
                }
            default: return state
    }
}

export default userRootReducer;