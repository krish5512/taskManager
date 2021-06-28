import {
    GET_USERS_REQUEST
} from "../constants";

const getUsers = (payloadBody) => {
    return {
        type: GET_USERS_REQUEST,
        payload: payloadBody
    }
};

export default getUsers;