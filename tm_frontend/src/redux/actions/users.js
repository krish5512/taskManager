import {
    GET_USERS_REQUEST
} from "../constants";

const getUsers = (payloadBody) => {
    console.log (
        {payloadBody
        })
    return {
        type: GET_USERS_REQUEST,
        payload: payloadBody
    }
};

export default getUsers;