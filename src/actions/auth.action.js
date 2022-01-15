import { toast } from "react-toastify";

import { login, register, logout, getAllFriends } from "../services/auth";
import { loaderToggleAction } from "./common.action";

export const CONNECTION_SUCCESS = "CONNECTION_SUCCESS";
export const CONNECTION_FAIL = "CONNECTION_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_ALL_FRIENDS_SUCCESS = "GET_ALL_FRIENDS_SUCCESS";
export const UPDATE_FRIENDS_SUCCESS = "UPDATE_FRIENDS_SUCCESS";

export function homeAction(data) {
    return (dispatch) => {
        return dispatch({ type: LOGIN_SUCCESS, payload: data });
    }
}

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

            toast.error(err.response?.data.error);

            dispatch(loaderToggleAction(false));
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

            localStorage.clear();
            dispatch({ type: LOGOUT_SUCCESS });
            dispatch(loaderToggleAction(false));
        }).catch((err) => {
            console.log("LoginAction-err", err.response?.data.error);

            toast.error(err.response?.data.error);

            dispatch(loaderToggleAction(false));
        })
    }
};

export function getAllFriendsAction(uid) {
    // console.log("getAllFriendsAction");
    return (dispatch) => {
        getAllFriends(uid).then((response) => {
            console.log("getAllFriendsAction-res:- ", response.data);

            dispatch({ type: GET_ALL_FRIENDS_SUCCESS, payload: response.data });
        }).catch((err) => {
            console.log("getAllFriendsAction-err", err.response?.data.error);

            toast.error(err.response?.data.error);
        })
    }
}

export function updateFriendsAction(payload) {
    return (dispatch) => {
        return dispatch({ type: UPDATE_FRIENDS_SUCCESS, payload });
    }
}

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
