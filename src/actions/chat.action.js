import { getUser } from "../services/chat";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const ADD_MESSAGE = "ADD_MESSAGE";

export function getUserAction(id) {
    console.log("GetUserAction-id", id);
    return (dispatch) => {
        return getUser(id).then((response) => {
            console.log("GetUser-Response:-", response);
            let payload = {
                id: response.data.id,
                name: response.data.name,
                phone: response.data.phone,
                socketID: response.data.socketID
            }

            dispatch({ type: GET_USER_SUCCESS, payload });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: GET_USER_FAILED });
            return Promise.reject();
        })
    }
};

export function addMessage(msg) {
    console.log("SetMessages:- ", msg);
    return (dispatch) => {
        dispatch({ type: ADD_MESSAGE, payload: msg })
    }
}


