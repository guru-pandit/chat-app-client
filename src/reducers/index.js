import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import chatReducer from "./chat.reducer";
import commonReducer from "./common.reducer";
import { LOGOUT_SUCCESS } from "../actions/auth.action";

// Combining all reducers
const allReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    common: commonReducer
});

// resetting the state of redux store
const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined
    }
    return allReducers(state, action);
}

export default rootReducer;

