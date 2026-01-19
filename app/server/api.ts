import axios, { type InternalAxiosRequestConfig } from "axios";
import { TOKEN_CYBERSOFT, BASE_URL } from "../contants";

export const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let accessToken = "";
    if (typeof window !== "undefined") {
        const raw = localStorage.getItem("USER_ADMIN");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                accessToken = parsed?.accessToken || "";
            } catch {
                accessToken = "";
            }
        }
    }
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (TOKEN_CYBERSOFT) {
        config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;
    }
    return config;
});
