export const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = (payloadBody) =>  {
    return({
        type: LOAD_USERS,
        payload: payloadBody
    });
};