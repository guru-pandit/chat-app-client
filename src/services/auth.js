import axios from './axios';

export function register(name, phone, password) {
    return axios.post("/user/register", { Name: name, Phone: phone, Password: password })
}

export function login(phone, password) {
    return axios.post("/user/login", { Phone: phone, Password: password });
}