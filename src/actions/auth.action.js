import { login, register } from "../services/auth";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function registerAction(name, phone, password) {
    console.log("Register:Action:- ", name + " " + phone + " " + password);
    return (dispatch) => {
        return register(name, phone, password).then((response) => {
            console.log("RegisterAPI-Response:-", response);
            dispatch({ type: REGISTER_SUCCESS });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: REGISTER_FAIL });
            return Promise.reject();
        })
    }
};

export function loginAction(phone, password) {
    console.log("Login:Action:- ", + phone + " " + password);
    return (dispatch) => {
        return login(phone, password).then((response) => {
            console.log("LoginAPI-Response.data:-", response.data);
            if (response.data.authToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: LOGIN_FAIL });
            return Promise.reject();
        })
    }
};


export function logoutAction() {
    console.log("Logout:Action");
    return (dispatch) => {
        localStorage.setItem("user", JSON.stringify({}))
        return dispatch({ type: LOGOUT_SUCCESS });
    }
};

