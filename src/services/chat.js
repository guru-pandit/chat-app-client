import axios from './axios';

export function setConnection(uid, sid) {
    return axios.post("/set-connection", { UserID: uid, SocketID: sid });
}

export function getUser(id) {
    return axios.get(`/user/${id}`);
}

export function getConversation(id) {
    return axios.get(`/get-conversation-by-user/${id}`);
}

export function createConversation(data) {
    return axios.post(`/create-conversation`, data);
}

export function getOldMessages(id1, id2) {
    return axios.post(`/chat/private-chat`, { id1, id2 });
}

export function fetchMessages(cid) {
    return axios.get(`/chat/private-chat/${cid}`);
}

export function addMessage(msg) {
    return axios.post("/chat/add-message", msg);
}

export function updateMessage(mid, msg) {
    return axios.put(`chat/private-chat/${mid}`, msg);
}

export function searchOthers(uid, search) {
    return axios.post(`/user/get-other`, { userId: uid, search: search });
}