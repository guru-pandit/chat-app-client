import { GET_CONVERSATION_SUCCESS, GET_CONVERSATION_FAILED, SET_CURRENT_CHAT_USER, SET_MESSAGES_FOR_CURRENT_CHAT_USER } from "../actions/chat.action";

const initialState = {
    searchedUsers: [],
    currentChat: null,
    messages: [],
    conversations: []
}

const chatReducer = (state = initialState, action) => {
    let { type, payload } = action;
    // console.log("ChatReducer-action:-" + type + "-:payload:-" + payload);

    switch (type) {
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: [...payload]
            }
        case GET_CONVERSATION_FAILED:
            return {
                ...state,
                conversations: []
            }
        case SET_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChat: payload
            }
        case SET_MESSAGES_FOR_CURRENT_CHAT_USER:
            return {
                ...state,
                messages: payload
            }
        default:
            return state;
    }
}

export default chatReducer;
