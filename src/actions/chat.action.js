import { getUser, getOldMessages, getOtherUsers } from "../services/chat";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_OTHER_USERS_SUCCESS = "GET_OTHER_USERS_SUCCESS";
export const GET_OTHER_USERS_FAILED = "GET_OTHER_USERS_FAILED";
export const GET_OLD_MESSAGES_SUCCESS = "GET_OLD_MESSAGES_SUCCESS";
export const GET_OLD_MESSAGES_FAILED = "GET_OLD_MESSAGES_FAILED";
export const ADD_MESSAGE = "ADD_MESSAGE";

export function getUserAction(id) {
    // console.log("GetUserAction-id", id);
    return (dispatch) => {
        return getUser(id).then((response) => {
            console.log("GetUser-Response:-", response);
            let payload = {
                id: response.data.id,
                name: response.data.name,
                phone: response.data.phone,
                // socketID: response.data.socketID
            }

            dispatch({ type: GET_USER_SUCCESS, payload });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: GET_USER_FAILED });
            return Promise.reject();
        })
    }
};

export function getOtherUsersAction(id) {
    // console.log("GetOtherUsersAction-id:- ", id);
    return (dispatch) => {
        return getOtherUsers(id).then((response) => {
            console.log("GetOtherUsers-response:- ", response.data);
            let payload = response.data
            dispatch({ type: GET_OTHER_USERS_SUCCESS, payload });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: GET_OTHER_USERS_FAILED });
            return Promise.reject();
        })
    }
}

export function getOldMessagesAction(id1, id2) {
    // console.log("GetOldMessagesAction:- id1;" + id1 + " id2:" + id2);
    return (dispatch) => {
        return getOldMessages(id1, id2).then((response) => {
            let payload = response.data
            dispatch({ type: GET_OLD_MESSAGES_SUCCESS, payload });
        }).catch((err) => {
            dispatch({ type: GET_OLD_MESSAGES_FAILED });
        })
    }
}

export function addMessage(receivedMsg) {
    // console.log("SetMessages:- ", msg);
    return (dispatch) => {
        dispatch({ type: ADD_MESSAGE, payload: receivedMsg })
    }
}


