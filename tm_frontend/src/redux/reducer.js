import {
    LOAD_USERS_SUCCESS
} from "./actions";

const initialState = {
    data: [],
};

export default function reduxSagaReducer(state = initialState, action) {
    switch (action.type) {

        case LOAD_USERS_SUCCESS: {
            return {
                ...state,
                data: action.payload,

            }
        }

        default: {
            return state;
        }
    }
}