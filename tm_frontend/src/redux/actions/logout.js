import {
    LOGOUT_USERS_REQUEST
} from "../constants";

const logoutUsers = () => {
    return {
        type : LOGOUT_USERS_REQUEST,
        payload : {}
    }
}
export default logoutUsers ;