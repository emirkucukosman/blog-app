import axios from 'axios'

export const baseURL = "http://localhost:9090";

const blogAPI = axios.create({
    baseURL
})

blogAPI.interceptors.request.use((config) => {
    config.headers["Authorization"] = window.localStorage.getItem("accessToken");
    config.headers["Content-Type"] = "application/json";
    return config;
})

blogAPI.interceptors.response.use((response) => response, (error) => {
    if (error.response) return Promise.reject(error.response.data.message);
    if (error.request) return Promise.reject("Server could not respond");
    return Promise.reject("Unexpected error has occured");
})

export default blogAPI;