import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
let authToken = user ? user.authToken : "";

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: { "Authorization": `Bearer ${authToken}` }
});

export default instance;