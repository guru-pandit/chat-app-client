import { GET_USER_SUCCESS, GET_USER_FAILED, ADD_MESSAGE, GET_OLD_MESSAGES_SUCCESS, GET_OLD_MESSAGES_FAILED, GET_OTHER_USERS_SUCCESS, GET_OTHER_USERS_FAILED } from "../actions/chat.action";

const initialState = {
    chatUser: {},
    messages: [],
    otherUsers: []
}

const chatReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case GET_USER_SUCCESS:
            console.log("GET_USER_SUCCESS-payload:- ", payload);
            return {
                ...state,
                chatUser: {
                    id: payload.id,
                    Name: payload.name,
                    Phone: payload.phone,
                    SocketID: payload.socketID
                }
            }
        case GET_USER_FAILED:
            return {
                ...state,
            }
        case GET_OTHER_USERS_SUCCESS:
            console.log("GET_OTHER_USERS_SUCCESS-payload ", payload);
            return {
                ...state,
                otherUsers: [...payload]
            }
        case GET_OTHER_USERS_FAILED:
            return {
                ...state,
            }
        case GET_OLD_MESSAGES_SUCCESS:
            console.log("GET_OLD_MESSAGE_SUCCESS-payload", payload);
            return {
                ...state,
                messages: [...payload]
            }
        case GET_OLD_MESSAGES_FAILED:
            return {
                ...state,
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    payload
                ]
            }
        default:
            return state;
    }
}

export default chatReducer;
