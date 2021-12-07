import { GET_OLD_MESSAGES_SUCCESS, GET_OLD_MESSAGES_FAILED, GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAILED, } from "../actions/chat.action";

const initialState = {
    searchedUsers: [],
    messages: [],
    conversations: []
}

const chatReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case GET_CONVERSATION_SUCCESS:
            // console.log("GET_CONVERSATION_SUCCESS-payload ", payload);
            return {
                ...state,
                conversations: [...payload]
            }
        case GET_CONVERSATION_FAILED:
            return {
                ...state,
            }
        case GET_OLD_MESSAGES_SUCCESS:
            // console.log("GET_OLD_MESSAGE_SUCCESS-payload", payload);
            return {
                ...state,
                messages: [...payload]
            }
        case GET_OLD_MESSAGES_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default chatReducer;
