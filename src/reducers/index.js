import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import chatReducer from "./chat.reducer";
import commonReducer from "./common.reducer";

const allReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    common: commonReducer
});

export default allReducers

