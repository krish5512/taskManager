import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    LOGOUT_USERS,
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
            return {
                type: GET_USERS_SUCCESS,
                users: action.users
            }
            case GET_USERS_FAILED:
                console.log({action})
                return {
                    type: GET_USERS_FAILED,
                    users: []
                }
            case LOGOUT_USERS : 
            return {
                type : LOGOUT_USERS,
                users : {}
            }
            default: return state
    }
}

export default userRootReducer;