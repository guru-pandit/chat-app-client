import axios from "axios";


let baseUrl = process.env.SERVER || "http://localhost:4000";

const instance = axios.create({
    baseURL: baseUrl,
    // headers: { Authorization: `Bearer ${authToken}` }
});

instance.interceptors.request.use(function (config) {
    let authToken = localStorage.getItem("authToken");
    // console.log("Axios-authtoken:- ", authToken);
    config.headers.Authorization = `Bearer ${authToken}`;

    return config;
});

export default instance;