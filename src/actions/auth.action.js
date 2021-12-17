import { login, register, logout } from "../services/auth";
import { loaderToggleAction } from "./common.action";
import { toast } from "react-toastify";

export const CONNECTION_SUCCESS = "CONNECTION_SUCCESS";
export const CONNECTION_FAIL = "CONNECTION_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function registerAction(name, phone, password) {
    // console.log("Register:Action:- ", name + " " + phone + " " + password);
    return (dispatch) => {
        return register(name, phone, password).then((response) => {
            // console.log("RegisterAPI-Response:-", response);
            dispatch(loaderToggleAction(false));
            dispatch({ type: REGISTER_SUCCESS });
            return Promise.resolve();
        }).catch((err) => {
            console.log("RegisterAction-err", err.response?.data.error);
            dispatch(loaderToggleAction(false));
            toast.error(err.response?.data.error);
            dispatch({ type: REGISTER_FAIL });
            return Promise.reject();
        })
    }
};

export function loginAction(phone, password) {
    // console.log("Login:Action:- ", + phone + " " + password);
    return (dispatch) => {
        return login(phone, password).then((response) => {
            // console.log("LoginAPI-Response.data:-", response.data);

            if (response.data.authToken) {
                localStorage.setItem("authToken", response.data.authToken);
            }

            dispatch(loaderToggleAction(false));
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });

            return Promise.resolve();
        }).catch((err) => {
            console.log("LoginAction-err", err.response?.data.error);

            toast.error(err.response?.data.error);

            dispatch(loaderToggleAction(false));
            dispatch({ type: LOGIN_FAIL });

            return Promise.reject();
        })
    }
};

export function logoutAction() {
    // console.log("Logout-Action");
    return (dispatch) => {
        logout().then((response) => {
            // console.log("LogoutAction-res:- ", response);
            localStorage.removeItem("authToken");
            dispatch({ type: LOGOUT_SUCCESS });
            dispatch(loaderToggleAction(false));
        }).catch((err) => {
            console.log("LoginAction-err", err.response?.data.error);
            dispatch(loaderToggleAction(false));
            toast.error(err.response?.data.error);
        })
    }
};

export function connectionSuccessAction() {
    return (dispatch) => {
        return dispatch({ type: CONNECTION_SUCCESS });
    }
}

export function connectionFailAction() {
    return (dispatch) => {
        return dispatch({ type: CONNECTION_FAIL });
    }
}
