import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/auth.action";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
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
            console.log("Login-Success:Payload:- ", payload);
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
        default:
            return state;
    }
}

export default authReducer;
