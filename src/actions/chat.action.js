import { toast } from "react-toastify";

import { getOldMessages, getConversation, searchOthers, fetchMessages } from "../services/chat";

export const GET_CONVERSATION_SUCCESS = "GET_CONVERSATION_SUCCESS";
export const GET_CONVERSATION_FAILED = "GET_CONVERSATION_FAILED";
// export const GET_OLD_MESSAGES_SUCCESS = "GET_OLD_MESSAGES_SUCCESS";
// export const GET_OLD_MESSAGES_FAILED = "GET_OLD_MESSAGES_FAILED";
export const SET_CURRENT_CHAT_USER = "SET_CURRENT_CHAT_USER";
export const SET_MESSAGES_FOR_CURRENT_CHAT_USER = "SET_MESSAGES_FOR_CURRENT_CHAT_USER";

export function getConverationsAction(id) {
    // console.log("GetOtherUsersAction-id:- ", id);
    return (dispatch) => {
        return getConversation(id).then((response) => {
            // console.log("GetConversation-response:- ", response.data);

            dispatch({ type: GET_CONVERSATION_SUCCESS, payload: response.data });

            return Promise.resolve();
        }).catch((err) => {
            dispatch({ type: GET_CONVERSATION_FAILED });

            toast.error(err.response?.data.error);

            return Promise.reject();
        })
    }
}

// export function getOldMessagesAction(id1, id2) {
//     // console.log("GetOldMessagesAction:- id1;" + id1 + " id2:" + id2);
//     return (dispatch) => {
//         return getOldMessages(id1, id2).then((response) => {
//             let payload = response.data
//             dispatch({ type: GET_OLD_MESSAGES_SUCCESS, payload });
//         }).catch((err) => {
//             dispatch({ type: GET_OLD_MESSAGES_FAILED });
//         })
//     }
// }

export function getAllOldMessagesAction(cid) {
    return (dispatch) => {
        return fetchMessages(cid).then((response) => {
            dispatch({ type: SET_MESSAGES_FOR_CURRENT_CHAT_USER, payload: response.data });

            return Promise.resolve();
        }).catch((err) => {
            console.log("GetAllOldMessagesAction-err", err.response?.data.error);

            toast.error(err.response?.data.error);
        });
    }
}

export function setCurrentChatAction(payload) {
    return { type: SET_CURRENT_CHAT_USER, payload }
}

export function setMessagesAction(payload) {
    return { type: SET_MESSAGES_FOR_CURRENT_CHAT_USER, payload }
}