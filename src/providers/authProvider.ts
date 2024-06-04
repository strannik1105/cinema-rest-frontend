import {AuthProvider, HttpError} from "@refinedev/core";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };
        return Promise.reject(customError);
    },
);

export const authProvider = (apiUrl: string): AuthProvider => ({
    check: async () => {
        const a = localStorage.getItem("booking_access_token")

        if (a) {
            return {authenticated: true}
        }

        return {
            authenticated: false,
            redirectTo: "/login",
            error: {
                message: "Check failed",
                name: "Not authenticated",
            },
        }
    },
    onError: async (error) => {
        if (error.response?.status === 401) {
            return {
                logout: true,
            };
        }
        return {error};
    },
    getIdentity: async () => {
        const response = await axiosInstance.get(`${apiUrl}/auth/check`);

        if (response.status < 200 || response.status > 299) {
            return null;
        }
    },
    logout: async () => {
        return {success: true};
    },
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({username, password}) => {
        const res = await axiosInstance.post(`${apiUrl}/auth/token?username=${username}&password=${password}`)
        console.log(res)

        if (res.data) {
            localStorage.setItem("booking_access_token", res.data.access_token)
            localStorage.setItem("user_role", res.data.user_role)
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
    },
    getPermissions: async () => {
        throw new Error("Not implemented");
    },
});
