import { } from "../actions/chat.action";

const initialState = {}

const chatReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case "":
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default chatReducer;
