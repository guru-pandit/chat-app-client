import { getOldMessages, getConversation, searchOthers } from "../services/chat";

export const GET_CONVERSATION_SUCCESS = "GET_CONVERSATION_SUCCESS";
export const GET_CONVERSATION_FAILED = "GET_CONVERSATION_FAILED";
export const GET_OLD_MESSAGES_SUCCESS = "GET_OLD_MESSAGES_SUCCESS";
export const GET_OLD_MESSAGES_FAILED = "GET_OLD_MESSAGES_FAILED";

export function getConverationsAction(id) {
    // console.log("GetOtherUsersAction-id:- ", id);
    return (dispatch) => {
        return getConversation(id).then((response) => {
            console.log("GetConversation-response:- ", response.data);
            let payload = response.data
            dispatch({ type: GET_CONVERSATION_SUCCESS, payload });
            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: GET_CONVERSATION_FAILED });
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
