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

export function getAllFriends(id) {
    return axios.get(`/get-all-friends/${id}`);
}

export function update(id, name, phone, email, dob) {
    return axios.put("/user/update-profile", { id: id, Name: name, Phone: phone, Email: email, DOB: dob });
}

export function uploadProfile(id, formdata) {
    return axios.post(`/user/profile/${id}`, formdata, { headers: { "Content-Type": "multipart/form-data" } });
}

export function logout() {
    return axios.post("/user/logout");
}
