import {
    CREATE_USERS_REQUEST,
} from "../constants";

const createUsers = (payloadBody) => {
    return {
        type: CREATE_USERS_REQUEST,
        payload: payloadBody
    }
};

export default createUsers;