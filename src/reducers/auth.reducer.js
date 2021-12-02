import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, CONNECTION_SUCCESS, CONNECTION_FAIL } from "../actions/auth.action";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user, isConnected: false }
    : { isLoggedIn: false, user: null, isConnected: false };

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
            // console.log("Login-Success:Payload:- ", payload);
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}

export default authReducer;
