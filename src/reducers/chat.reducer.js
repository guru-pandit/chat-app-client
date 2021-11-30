import { GET_USER_SUCCESS, GET_USER_FAILED, ADD_MESSAGE } from "../actions/chat.action";

const initialState = {
    user: { id: "5", name: "Guruprasad Pandit", phone: "1212121212", socketID: "" },
    messages: []
}

const chatReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case GET_USER_SUCCESS:
            console.log("GET_USER_SUCCESS-payload:- ", payload);
            return {
                ...state, user: {
                    id: payload.id,
                    name: payload.name,
                    phone: payload.phone,
                    socketID: payload.socketID
                }
            }
        case GET_USER_FAILED:
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
