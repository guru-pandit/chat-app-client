import axios from './axios';

export function getUser(id) {
    return axios.get(`/user/${id}`);
}