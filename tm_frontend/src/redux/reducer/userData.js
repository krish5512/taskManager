import {
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    LOGOUT_USERS_SUCCESS,
    LOGOUT_USERS_FAILED,
    CREATE_USERS_SUCCESS,
    CREATE_USERS_FAILED,
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
                return {
                    type: GET_USERS_FAILED,
                    users: {}
                }
            case LOGOUT_USERS_SUCCESS : 
               return {
                type : LOGOUT_USERS_SUCCESS,
                users : {}
              }
              case LOGOUT_USERS_FAILED : 
              return {
               type : LOGOUT_USERS_FAILED,
               users : {}
             }
             case CREATE_USERS_SUCCESS : 
                return {
                    type : CREATE_USERS_SUCCESS,
                    users : action.users
                }
            case CREATE_USERS_FAILED : 
            return {
                type : CREATE_USERS_FAILED,
                users : {}
            }
            default: return state
    }
}

export default userRootReducer;