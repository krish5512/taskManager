import {
    GET_USERS_REQUEST,
    LOGOUT_USERS
} from "../constants";

const getUsers = (payloadBody) => {
    return {
        type: GET_USERS_REQUEST,
        payload: payloadBody
    }
};

const logoutUsers = (payloadBody) => {
    return {
        type : LOGOUT_USERS,
        payload : {}
    }
}
const usersObj = { getUsers, logoutUsers};
export default usersObj ;