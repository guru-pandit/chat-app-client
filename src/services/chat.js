import axios from './axios';

export function getUser(id) {
    return axios.get(`/user/${id}`);
}

export function getOtherUsers(id) {
    return axios.get(`/user/get-other/${id}`);
}

export function getOldMessages(id1, id2) {
    return axios.post(`/chat/private-chat`, { id1, id2 });
}