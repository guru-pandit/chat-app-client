import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
let authToken = user ? user.authToken : "";

let baseUrl = process.env.SERVER || "http://localhost:4000";

const instance = axios.create({
    baseURL: baseUrl,
    headers: { "Authorization": `Bearer ${authToken}` }
});

export default instance;