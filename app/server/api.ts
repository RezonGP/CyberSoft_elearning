import axios, { type InternalAxiosRequestConfig } from "axios";
import { TOKEN_CYBERSOFT, BASE_URL } from "../contants";

export const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("USER_ADMIN");
    const accessToken = user ? JSON.parse(user).accessToken : "";

    if (accessToken) {
        config.headers["Authorization"] = `Authorization ${accessToken}`;
    }
    config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;

    return config;
});