import axios from './axios';

export function home() {
    return axios.get("/");
}

export function register(name, phone, password) {
    return axios.post("/user/register", { Name: name, Phone: phone, Password: password })
}

export function login(phone, password) {
    return axios.post("/user/login", { Phone: phone, Password: password });
}

export function logout() {
    return axios.post("/user/logout");
}
