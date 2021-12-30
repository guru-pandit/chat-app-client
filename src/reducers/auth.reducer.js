import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, CONNECTION_SUCCESS, CONNECTION_FAIL } from "../actions/auth.action";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    isLoggedIn: false,
    user: {
        id: null,
        Name: null,
        Phone: null,
        Email: null,
        Avatar: null
    },
    isConnected: false
};

const authReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case CONNECTION_SUCCESS:
            return {
                ...state,
                isConnected: true
            }
        case CONNECTION_FAIL:
            return {
                ...state,
                isConnected: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: { id: payload.id, Name: payload.Name, Phone: payload.Phone, Email: payload.Email, Avatar: payload.Avatar },
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;
