import {
    combineReducers
} from "redux";
import userRootReducer from './userData';

const rootReducer = combineReducers({
    userData: userRootReducer,
});

export default rootReducer;