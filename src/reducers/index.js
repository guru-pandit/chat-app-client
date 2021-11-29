import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import chatReducer from "./chat.reducer";

const allReducers = combineReducers({
    auth: authReducer,
    chat: chatReducer
});

export default allReducers

